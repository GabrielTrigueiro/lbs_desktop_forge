import {Dispatch, SetStateAction} from "react";

export interface IPropsPagination {
  setPage : Dispatch<SetStateAction<number>>;
  page: number;
  setRowsPerPage : Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  count: number;
  
}