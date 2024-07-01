import { Dispatch, SetStateAction } from "react";

export interface IPropsTableHead {
  order: Order;
  orderBy: string;
  head: ITableHeadCell[];
  /* eslint-disable no-unused-vars */
  onRequestSort: (property: string) => void;
}

export interface ITableHeadCell {
  name: string;
  label: string;
  date?: boolean;
  align?: "left" | "center" | "right";
}

export interface IPropsDataTable {
  head: ITableHeadCell[];
  data?: any[];
  order: Order;
  orderBy: string;
  setOrder: Dispatch<SetStateAction<Order>>;
  setOrderBy: Dispatch<SetStateAction<string>>;
  menu?: JSX.Element;
  accessRowById?: (id: string) => void;
  rmvFunction?: (id: any) => void;
  isLoading?: boolean;
}

export type Order = "asc" | "desc";
