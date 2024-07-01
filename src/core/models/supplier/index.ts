import { IPageable } from "../utils";

export type TAddress = {
  id?: number;
  zipCode: string;
  uf: string;
  road: string;
  number: string;
  neighborhood: string;
  city: string;
}

export type TContacts = {
  id?: number;
  telephone?: string;
  cell_phone1: string;
  cell_phone2?: string;
  email: string;
}

export type TSupplierBody = {
  id: number;
  cpforcnpj: string;
  nameRepresentative: string;
  nameCompany: string;
  createdAt: string;
  updateAt: string;
  address: TAddress;
  contacts: TContacts;
  stateEnrollment: string;
}

export type TSupplierFilterRequest = {
  nameRepresentative?:string;
  cpforCnpj?: string;
};


export type TUpdateSupplier = {
  cpforcnpj: string;
  nameRepresentative: string;
  nameCompany: string;
};

export type TSupplierRegister = {
  cpforcnpj: string;
  nameReprensatative: string;
  stateEnrollment: string;
  nameCompany: string;
  addressDTO: TAddress;
  contactDTO: TContacts;
};



export type TSupplierPageable = TSupplierFilterRequest & IPageable;