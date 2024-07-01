import { IPageable } from "../utils";

export interface IFinancialPageable extends IPageable {
  type?: string;
}
export type TFinancialFilterRequest = {
  type?: string;
};
