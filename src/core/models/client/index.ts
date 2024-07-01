export type TNewClientBodyRequest = {
  name: string;
  cpforcnpj: string;
  email: string;
  city: string;
  uf: string;
  cep: string;
  address: string;
  neighborhood: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  cameThrough: string;
};

export type TCpfTypes = "CPF_TIPO1" | "CPF_TIPO2" | "CPF_TIPO3";

export type TCnpjTypes = "Cnpj_TIPO1" | "Cnpj_TIPO2";
