import { IPage, IPageable, IResponseBody } from "../utils";

export type TCouponRequest = {
  coupon: string;
  description: string;
  quatityInstallments?: string;
  valuePixCpf?: string;
  valuePixCnpj?: string;
  valueInstallmentCpf?: string;
  valueInstallmentCnpj?: string;
};

export type TCouponResponse = {
  id: string;
  isProtected: boolean;
  active: boolean;
  createdAt: string;
  params: TParams[];
  coupon: string;
  description: string;
  quantityInstallments?: string;
  valuePixCpf?: string;
  valuePixCnpj?: string;
  valueInstallmentCpf?: string;
  valueInstallmentCnpj?: string;
};

export type TParamsRequest = {
  param: string[];
};

export type TParams = {
  id: number;
  coupon: string;
  param: string;
  active: boolean;
};

export type TCouponPostResponse = IResponseBody<TCouponResponse>;

export type TCouponGetResponse = IPage<TCouponResponse> | undefined;

export type TCouponPageable = IPageable;
