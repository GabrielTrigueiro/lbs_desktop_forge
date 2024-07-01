import { TNewClientBodyRequest } from "../../../../core/models/client";
import { TPixBodyResponse } from "../pix";

export type TBoletoActions = "DATE" | "DISCOUNT" | "BAIXAR";

export interface IBoletoActionProps {
  onCloseModal: () => void;
  nossoNumero?: string;
  refetch?: () => void;
}

export type TBoletoBodyResponse = {
  barCode: string;
  digitableline: string;
  dueDate: string;
  finedate: string;
  id: number;
  identifier: string;
  installment: number;
  interestdate: string;
  issuancedate: string;
  nossoNumero: number;
  pdf: string;
  seuNumero: string;
  status: string;
  type: string;
  Issuancedate: string;
  value: number;
  paymentDate: string;
  paymentValue: number;
  updatedAt: string;
  discount: number;
};

export type TGetSaleResponse = {
  client: TNewClientBodyRequest;
  pix: TBoletoBodyResponse | TPixBodyResponse;
};
