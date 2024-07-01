
import * as yup from "yup";
import { validarCpfCnpj, validateRG } from "./globalFunctions";
import { TCouponRequest } from "../../core/models/coupons";
import { TCharacteristicsDTO, TProductRegister } from "../../core/models/product";
import { isValid, parse } from "date-fns";

const loginSchema = yup.object({
  login: yup
    .string()
    .required("Digite o usuário")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  password: yup
    .string()
    .min(5, "Senha deve ter ao menos 5 digitos")
    .required("Digite a senha"),
});

const forgotPasswordSchema = yup.object({
  login: yup
    .string()
    .required("Digite o usuário")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
});

const redefinePassword = yup.object({
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

const registerCouponSchema = yup.object<TCouponRequest>().shape({
  coupon: yup.string().required("Cupom é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
  quatityInstallments: yup
    .string()
    .required("Quantidade de parcelas é obrigatória")
    .test(
      "is-minimum-value",
      "A quantidade mínima de parcelas é 2",
      (value) => parseInt(value || "0") >= 2
    ),
  valuePixCpf: yup.string().required("Descrição é obrigatório"),
  valuePixCnpj: yup.string().required("Descrição é obrigatório"),
  valueInstallmentCpf: yup.string().required("Descrição é obrigatório"),
  valueInstallmentCnpj: yup.string().required("Descrição é obrigatório"),
});



const updateSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});




const clientRegisterSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  maritalStatus: yup.string().required('Estado civil é obrigatório'),
  rg: yup.string().required('RG é obrigatório').test("rg-validation", "RG inválido", validateRG),
  cpforcnpj: yup.string().required('CPF ou CNPJ é obrigatório').test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  birthDate: yup
    .string()
    .required('Data de Nascimento é obrigatória')
    .test('is-valid-date', 'Data de Nascimento inválida', (value) => {
      if (!value) return false;
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return isValid(parsedDate);
    })
    .test('is-not-future-date', 'Data de Nascimento não pode ser no futuro', (value) => {
      if (!value) return false;
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return parsedDate <= new Date();
    }),
  address: yup.object().shape({
    zipCode: yup.string().required('CEP é obrigatório'),
    uf: yup.string().required('UF é obrigatório'),
    road: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
  }),
  contact: yup.object().shape({
    telephone: yup.string().optional(),
    cell_phone1: yup.string().required('Celular 1 é obrigatório'),
    cell_phone2: yup.string().optional(),
    email: yup.string().required('Email é obrigatório').email('Email inválido'),
  }),
  indicationId: yup.number().optional(),
  sexoID: yup.number().required('Sexo é obrigatório').positive('Escolha uma opção'),
});

const collaboratorRegisterSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  rg: yup.string().required('RG é obrigatório').test("rg-validation", "RG inválido", validateRG),
  cpforcnpj: yup.string().required('CPF ou CNPJ é obrigatório').test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  birthday: yup
    .string()
    .required('Data de Nascimento é obrigatória')
    .test('is-valid-date', 'Data de Nascimento inválida', (value) => {
      if (!value) return false;
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return isValid(parsedDate);
    })
    .test('is-not-future-date', 'Data de Nascimento não pode ser no futuro', (value) => {
      if (!value) return false;
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return parsedDate <= new Date();
    }),
  user: yup.object().shape({
    password: yup.string().required('Senha é obrigatória'),
    confirmPassword: yup.string().required('Confirmar senha é obrigatório'),
  }),
  address: yup.object().shape({
    zipCode: yup.string().required('CEP é obrigatório'),
    uf: yup.string().required('UF é obrigatório'),
    road: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
  }),
  contact: yup.object().shape({
    telephone: yup.string().optional(),
    cell_phone1: yup.string().required('Celular 1 é obrigatório'),
    cell_phone2: yup.string().optional(),
    email: yup.string().required('Email é obrigatório').email('Email inválido'),
  }),
  sexoID: yup.number().required('Sexo é obrigatório').positive('Escolha uma opção'),
});


const supplierRegisterSchema = yup.object().shape({
  stateEnrollment: yup.string().required('Inscrição estadual é obrigatório'),
  nameReprensatative: yup.string().required('Nome do representante é obrigatório'),
  cpforcnpj: yup.string().required('CPF ou CNPJ é obrigatório').test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  nameCompany: yup.string().required('Nome da compania é obrigatória'),
  addressDTO: yup.object().shape({
    zipCode: yup.string().required('CEP é obrigatório'),
    uf: yup.string().required('UF é obrigatório'),
    road: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
  }),
  contactDTO: yup.object().shape({
    telephone: yup.string().optional(),
    cell_phone1: yup.string().required('Celular 1 é obrigatório'),
    cell_phone2: yup.string().optional(),
    email: yup.string().required('Email é obrigatório').email('Email inválido'),
  }),
});

const BrandRegisterShema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),

})

const CategoryRegisterShema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
})

const CollectionRegisterShema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
})

const IndicationRegisterShema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  typeIndicationId: yup.number().required('Tipo de indicação é obrigatório').positive('Escolha uma opção'),
})

const EditIndicationShema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
})

const EditCollaboratorShema = yup.object().shape({
  name: yup.string().required('Nome completo é obrigatório'),
  cpforcnpj: yup.string().required('CPF / CNPJ é obrigatório').test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  cep: yup.string().required('CEP é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  uf: yup.string().required('UF é obrigatório'),
});

const EditClientShema = yup.object().shape({
  name: yup.string().required('Nome completo é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  uf: yup.string().required('UF é obrigatório'),
});


const EditSupplierShema = yup.object().shape({
  cpforcnpj: yup.string().required('CNPJ é obrigatório').test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  nameCompany: yup.string().required('Nome da compania é obrigatório'),
  nameRepresentative: yup.string().required('Nome do representante é obrigatório')
})

const editProductSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  sku: yup.string().required('SKU é obrigatório'),
  amount: yup.number().required('Quantidade é obrigatória'),
  active: yup.boolean().required('Status ativo é obrigatório'),
  qrCode: yup.string().required('QR Code é obrigatório'),
  codManual: yup.string().required('Código manual é obrigatório')
});

const ProductRegisterSchema = yup.object<TProductRegister>().shape({
  name: yup.string().required('Nome é obrigatório'),
  sku: yup.string().required('Código é obrigatório'),
  amount: yup.number()
    .required('Quantidade é obrigatória')
    .min(0, 'Quantidade deve ser maior ou igual a 0')
    .test('is-greater-than-characteristics', 'Pouco produto', function (value) {
      const { characteristicsDTOList } = this.parent;
      const totalCharacteristicsAmount = characteristicsDTOList
        .map((item: TCharacteristicsDTO) => item.amount)
        .reduce((acc: number, curr: number) => acc + curr, 0);
      return value >= totalCharacteristicsAmount;
    }),
  priceCost: yup.number().required('Preço de custo é obrigatório'),
  priceTag: yup.number().required('Preço de etiqueta é obrigatório'),
  resalePrice: yup.number().required('Preço de revenda é obrigatório'),
  supplierId: yup.number().required('Fornecedor é obrigatório'),
  categoryId: yup.number().required('Categoria é obrigatória'),
  collectionId: yup.number().required('Coleção é obrigatória'),
  brandId: yup.number().required('Marca é obrigatória'),
});

export const Validations = {
  loginSchema,
  updateSchema,
  registerCouponSchema,

  forgotPasswordSchema,
  redefinePassword,

  clientRegisterSchema,
  collaboratorRegisterSchema,
  supplierRegisterSchema,
  CategoryRegisterShema,
  BrandRegisterShema,
  IndicationRegisterShema,
  CollectionRegisterShema,

  EditCollaboratorShema,
  EditClientShema,
  EditSupplierShema,
  editProductSchema,
  EditIndicationShema,

  ProductRegisterSchema
};
