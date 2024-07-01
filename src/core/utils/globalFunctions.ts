// noinspection UnnecessaryLocalVariableJS
import { isDate, isValid, parse } from "date-fns";
import { BACKEND_BASE_URL } from "./constants";

export function formatDocument(doc: string) {
  doc = doc.replace(/\D/g, "");
  if (doc.length === 11) {
    doc = doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (doc.length === 14) {
    doc = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return doc;
}

export function upperCaseFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
      return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export const removePointsExceptLast = (input: string): number => {
  // Remove todos os pontos, exceto o último
  const withoutPoints = input.replace(/\.(?=.*\.)/g, '');

  // Converte para número
  const numberValue = parseFloat(withoutPoints.replace(',', '.'));

  return numberValue;
};
export function convertToBack(data: string): string {
  const dataSemHora = data.split(" ")[0];
  const [dia, mes, ano] = dataSemHora.split("/");
  const novaData = `${ano}-${mes}-${dia}`;
  return novaData;
}

export function formatPhoneNumber(phoneNumber: string | undefined) {
  if (!phoneNumber) {
    return undefined;
  }
  let numericPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
  if (numericPhoneNumber.length === 11) {
    numericPhoneNumber = numericPhoneNumber.replace(
      /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
      (_, ddd, nine, firstPart, secondPart) =>
        `(${ddd}) ${nine}${firstPart}-${secondPart}`
    );
  } else if (numericPhoneNumber.length === 13) {
    numericPhoneNumber = numericPhoneNumber.replace(
      /^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/,
      (_, country, ddd, nine, firstPart, secondPart) =>
        `+${country} (${ddd}) ${nine} ${firstPart}-${secondPart}`
    );
  }
  return numericPhoneNumber;
}

export function formatarCEP(input: string): string {
  const cleaned = input.replace(/\D/g, "");
  if (cleaned.length !== 8) {
    return input;
  }
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");
}

export function formatCEP(cep: string) {
  return cep.replace(/^(\d{2})(\d{3})(\d{2})$/, "$1.$2-$3");
}



export function formatDate(date: Date) {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function formatDateBr(dataISO: string): string {
  if (!dataISO) {
    return "--";
  }

  const [ano, mes, dia] = dataISO.split("T")[0].split("-");

  return `${dia}/${mes}/${ano}`;
}

function convertTypeToString(type: string): string {
  switch (type) {
    case "SELLER": {
      return "seller";
    }
    case "CLIENT": {
      return "client";
    }
    case "ADMIN": {
      return "seller";
    }
    case "INDICATION": {
      return "indication";
    }
    default: {
      return "";
    }
  }
}

export function urlByUserType(type: string, id: number, put?: boolean): string {
  let userUrl = `${BACKEND_BASE_URL}v1/${convertTypeToString(type)}/${put ? "update/" : ""
    }${id}`;
  return userUrl;
}

export function validarCpfCnpj(input: string): boolean {
  const cleanedInput = input.replace(/\D/g, "");
  if (cleanedInput.length === 11) {
    return validarCpf(cleanedInput);
  } else if (cleanedInput.length === 14) {
    return validarCnpj(cleanedInput);
  }
  return false;
}

function validarCpf(cpf: string): boolean {
  const numeros = cpf.substring(0, 9).split("").map(Number);
  const digitos = cpf.substring(9).split("").map(Number);

  const calcularDigito = (numeros: number[]): number => {
    let soma = 0;
    let multiplicador = numeros.length + 1;

    for (const numero of numeros) {
      soma += numero * multiplicador;
      multiplicador--;
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(numeros);
  const segundoDigito = calcularDigito([...numeros, primeiroDigito]);

  return digitos[0] === primeiroDigito && digitos[1] === segundoDigito;
}

function validarCnpj(cnpj: string): boolean {
  const numeros = cnpj.substring(0, 12).split("").map(Number);
  const digitos = cnpj.substring(12).split("").map(Number);

  const calcularDigito = (numeros: number[], multiplicador: number): number => {
    let soma = 0;

    for (const numero of numeros) {
      soma += numero * multiplicador;
      multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(numeros, 5);
  const segundoDigito = calcularDigito([...numeros, primeiroDigito], 6);

  return digitos[0] === primeiroDigito && digitos[1] === segundoDigito;
}

export const handleDownloadPDF = (pdf: string, installment: number) => {
  // Convert base64 to ArrayBuffer
  const byteCharacters = atob(pdf);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const arrayBuffer = byteArray.buffer;

  // Create a Blob
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  // Create a download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `boleto_parcela_${installment}.pdf`; // Set the file name
  document.body.appendChild(a);

  // Trigger a click on the link to start the download
  a.click();

  // Remove the link from the DOM
  document.body.removeChild(a);
};

export function formatCurrencyBR(input: number | undefined): string {
  if (input === undefined) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(input);
}

export function downloadCSVFromBase64(
  base64String: string,
  fileName: string
): void {
  // Convertendo a string base64 para um array de bytes
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Criando um Blob a partir do array de bytes
  const blob = new Blob([byteArray], { type: "text/csv" });

  // Criando um link temporário para download
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;

  // Simulando o clique no link para iniciar o download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function removeExtraSpaces(input: string): string {
  return input.trim();
}

export function removeNonNumeric(
  input: string | undefined
): string | undefined {
  if (input) return input.replace(/\D/g, "");
  else return undefined;
}

export function formatCurrency(numero?: number): string {
  if (numero === undefined || numero === null) {
    return "0,00";
  }

  // Formatando o número com duas casas decimais
  const numeroFormatado = numero.toFixed(2);

  // Substituindo o ponto por vírgula
  return numeroFormatado.replace(".", ",");
}

export function periodoAtual(tipo: "mes" | "ano"): string {
  const dataAtual = new Date();
  const mesAtual = dataAtual.toLocaleString("pt-BR", { month: "long" });
  const anoAtual = dataAtual.getFullYear();

  if (tipo === "mes") {
    return `Período: ${mesAtual} ${anoAtual}`;
  } else if (tipo === "ano") {
    return `Período: ${anoAtual}`;
  } else {
    throw new Error(
      'Tipo de período inválido. Por favor, passe "mes" ou "ano" como parâmetro.'
    );
  }
}

export function formatRG(rg: string | undefined) {
  if (!rg) {
    return rg;
  }
  else {
    const digitsOnly = rg.replace(/\D/g, '');

    // Formata a string no padrão XX.XXX.XXX-X
    const formattedRG = digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');

    return formattedRG
  };
}

export function formatInt(value: string): string {
  let numericValue = value.replace(/\D/g, '');
  return numericValue;
}

export function validateRG(rg: string): boolean {
  const cleanedRG = rg.replace(/\D/g, '');
  if (cleanedRG.length !== 9) {
    return false;
  }
  if (/^(\d)\1*$/.test(cleanedRG)) {
    return false;
  }

  return true;
}

export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
};

export function calcularLucroRevenda(precoCusto?: number, precoRevenda?: number): string {
  precoCusto = precoCusto || 0;
  precoRevenda = precoRevenda || 0;

  if (precoCusto === 0 || precoRevenda === 0 || isNaN(precoCusto) || isNaN(precoRevenda)) {
    return '0%';
  }

  const lucro = ((precoRevenda - precoCusto) / precoCusto) * 100;
  return `${lucro.toFixed(2)}%`;
}

export function calcularCustoEtiqueta(precoCusto?: number, precoEtiqueta?: number): string {
  precoCusto = precoCusto || 0;
  precoEtiqueta = precoEtiqueta || 0;

  if (precoCusto === 0 || precoEtiqueta === 0 || isNaN(precoCusto) || isNaN(precoEtiqueta)) {
    return '0%';
  }

  const custo = ((precoEtiqueta - precoCusto) / precoEtiqueta) * 100;
  return `${custo.toFixed(2)}%`;
}

export const statesOpitions = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
];

export const sexoOptions = [
  { value: 2, label: 'Feminino' },
  { value: 1, label: 'Masculino' },
];

export const maritialStatusOptions = [
  { value: "SOLTEIRO", label: 'Solteiro' },
  { value: "CASADO", label: 'Casado' },
  { value: "DIVORCIADO", label: 'Divorciado' },
  { value: "UNIÃO_ESTAVEL", label: 'União estável' },
  { value: "VIUVO", label: 'Viúvo' },
];

export const indicationsOptions = [
  { value: 1, label: 'tipo1' },
  { value: 2, label: 'tipo2' },
];

export const activeOptins = [
  { value: 1, label: 'Ativar' },
  { value: 2, label: 'Desativar' },
];
