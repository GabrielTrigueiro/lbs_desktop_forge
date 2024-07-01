import { IPageable } from "../utils";

type VerificationToken = {
  id: number;
  cod: string;
  user: string;
  createdAt: string;
  verificated_at: string;
  type: string;
};

type Group = {
  id: number;
  name: string;
};

type Role = {
  id: number;
  name: string;
  description: string;
};

type TUser = {
  id: number;
  login: string;
  password: string;
  descriptionInactive: string;
  active: boolean;
  createdAt: string;
  updateAt: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  verifyAccount: boolean;
  collaborator: string;
  verificationTokens: VerificationToken[];
  groups: Group[];
  roles: Role[];
};

type TUserRegister = {
  password: string;
  confirmPassword?: string;
};

export type TAddress = {
  zipCode: string;
  uf: string;
  road: string;
  number: string;
  neighborhood: string;
  city: string;
}

export type TContacts = {
  telephone?: string;
  cell_phone1: string;
  cell_phone2?: string;
  email: string;
}

export type TSexo = {
  id: number;
  name: string;
};


export type TCollaboratorBody = {
  id: number;
  name: string;
  rg: string;
  birthDate: string;
  cpforcnpj: string;
  createdAt: string;
  updateAt: string;
  users: TUser;
  address: TAddress;
  sexo: TSexo;
  contacts: TContacts;
};


export type TCollaboratorFilterRequest = {
  name: string | undefined;
  cpforcnpj: string | undefined;
};
export type TCollaboratorUpdate = {
  name: string;
  cpforcnpj: string;
  cep: string;
  city: string;
  neighborhood: string;
  uf: string;
  telephone: string;
};

export type TCollaboratorRegister = {
  name: string;
  rg: string;
  birthday: string;
  cpforcnpj: string;
  user: TUserRegister;
  sexoID: number;
  address: TAddress;
  contact: TContacts;
};




export type TCollaboratorPageable = TCollaboratorFilterRequest & IPageable;