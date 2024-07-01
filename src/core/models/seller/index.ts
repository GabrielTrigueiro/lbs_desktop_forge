import { IPageable } from "../utils";

export type TNewSellerBodyRequest = {
  name: string;
  cpforcnpj: string;
  email: string;
  password: string;
  group_name: "SELLER";
};

export type TSellerBodyRequest = {
  id: string;
  login: string;
} & TNewSellerBodyRequest;

export type TSellerFilterRequest = {
  name: string | undefined;
  cpforcnpj: string | undefined;
  groupname: string | undefined;
};

export type TSellerPageable = TSellerFilterRequest & IPageable;
