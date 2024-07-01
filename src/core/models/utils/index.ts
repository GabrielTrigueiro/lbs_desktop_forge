import { TSaleStatusType } from "../sale";

export interface IDialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export interface IResponseBody<T> {
  data: T;
  errors: string[];
  links?: string[];
}

export interface IPage<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface IPageable {
  page: number;
  size: number;
  sort: string;
}

export interface IUserPageable extends IPageable {
  name?: string;
  email?: string;
  cpf?: string;
}

export interface IIndicationUser extends IPageable {
  email?: string;
  coupon?: string;
}

export type TIndicationFilter = {
  // email: string | undefined;
  coupon: string | undefined;
  cpforcnpj: string | undefined;
};

export type TIndicationFilterRequest = TIndicationFilter & IPageable;

export type TSelectOption = {
  value: string | undefined;
  displayValue: string | undefined;
  type?: string | Date | number | TSaleStatusType;
};

export type ISelectOptions = TSelectOption[];
