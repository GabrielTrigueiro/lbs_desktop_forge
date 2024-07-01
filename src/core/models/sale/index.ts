import { TNewClientBodyRequest } from "../client";
import { TGetSaleResponse } from "../payment/boleto";
import { IPageable } from "../utils";

export type TSubmitSaleResponse = {
  data: TGetSaleResponse;
  errors: string[];
  links: string[];
};
export type TPayment = "" | "BOLETO" | "PIX";

export type Compra = "CONSULTORIA" | "LIMPA_NOME";

export type TSaleBodyRequest = {
  couponId: null | number;
  id?: number;
  cameThrough: string;
  tokenSales: string;
  client: TNewClientBodyRequest;
  typePayment: TPayment;
  installments?: number | null;
  tokenContract?: null;
  contract: true;
  isFees: boolean;
  choosenDate?: string;
  typeSales: Compra;
};

export type TSalePayment = {
  typePayment: TPayment;
  installments?: number | null;
  tokenContract?: null;
  isFees: boolean;
};

export type TSaleStatusType = " PENDENTE" | "EM_PAGAMENTO" | "PAGO";

export type TSaleFilterRequest = {
  status: TSaleStatusType | undefined;
  cameThrough: string | undefined;
  typePayment: string | undefined;
  sellerCpfOrCnpj: string | undefined;
  clientCpforCnpj: string | undefined;
  indicationCpforCnpj: string | undefined;
  createDate: string | undefined;
  sellerId: number | undefined;
};

export type TSalePageable = TSaleFilterRequest & IPageable;

// ! vem mais coisa nesse objeto mas escolhi pegar apenas isso
export type TPaymentOption = {
  id: number;
  name: string;
  description: string;
  active: boolean;
}


