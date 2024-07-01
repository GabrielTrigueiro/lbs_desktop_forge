import { TSexo } from "../collaborator";
import { TAddress, TContacts } from "../supplier";
import { IPageable } from "../utils";
 
  type TypeIndication = {
    id: number;
    indication: string;
  };
  
  type TIndication = {
    id: number;
    name: string;
    description: string;
    typeIndication: TypeIndication;
  };


  
  export type TClientBody = {
    id: number;
    name: string;
    rg: string;
    cpforcnpj: string;
    birthdate: string;
    isactive: boolean;
    createdAt: string;
    updateAt: string;
    address: TAddress;
    contacts: TContacts;
    indication: TIndication;
    sexo: TSexo;
  };

  export type TAddressRegister = {
    zipCode: string;
    uf: string;
    road: string;
    number: string;
    neighborhood: string;
    city: string;
  }
  
  export type TContactsRegister = {
    telephone?: string;
    cell_phone1: string;
    cell_phone2?: string;
    email: string;
  }
  
  export type TClientRegister = {
    name: string;
    rg: string;
    cpforcnpj: string;
    birthDate: string;
    address: TAddressRegister;
    contact: TContactsRegister;
    indicationId?: number;
    maritalStatus: "SOLTEIRO" | "CASADO" | "DIVORCIADO" | "UNIÃO_ESTAVEL" | "VIUVO" | "";
    sexoID?: number;
  };

export type TClientFilterRequest = {
    name: string | undefined;
    cpforCnpj: string | undefined;
  };

  export type TClientUpdate = {
    name: string;
    cep: string;
    city: string;
    neighborhood: string;
    uf: string;
    telephone: string;
  };

  export type TClientPageable = TClientFilterRequest & IPageable;