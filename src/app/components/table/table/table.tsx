// @ts-nocheck
// @ts-ignore

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
  IconButton,
} from "@mui/material";
import { IPropsDataTable, ITableHeadCell } from "../../../../core/models/table";
import StyledTableHead from "../tableHead/tableHead";
import {
  formatCurrencyBR,
  formatDateBr,
  formatDocument,
  formatRG,
  formatarCEP,
} from "../../../../core/utils/globalFunctions";
import { FiberManualRecord } from "@mui/icons-material";
import Spinner from "../../../../app/components/spinner/spinner";
import DeleteIcon from "@mui/icons-material/Delete";

interface ITableRowProps {
  row: Record<string, any>;
  head: ITableHeadCell[];
  menu?: JSX.Element;
  accessRowById?: (id: string) => void;
  rmvFunction?: (id: any) => void;
}

export const StyledCircle = styled(FiberManualRecord, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive }) => ({
  color: isActive ? "#83e509" : "#ff000080",
  fontSize: 30,
}));

function returnCellContent(
  item: any,
  row: Record<string, any>,
  menu?: JSX.Element,
  accessRowById?: (id: string) => void,
  rmvFunction?: (id: any) => void
) {
  switch (item.name) {
    case "cpforcnpj":
      return formatDocument(row[item.name]);
    case "createdAt":
    case "updatedAt":
    case "created_at":
    case "birthDate":
      return formatDateBr(row[item.name]);
    case "rg":
      return formatRG(row[item.name]);
    case "value":
      return `R$ ${formatCurrencyBR(row[item.name])}`;
    case "isactive":
    case "active":
      return <StyledCircle isActive={row[item.name]} />;
    case "neighborhood":
      return row.address?.neighborhood;
    case "uf":
      return row.address?.uf;
    case "city":
      return row.address?.city;
    case "cep":
      return formatarCEP(row.address?.zipCode);
    case "action":
      return menu && <>{menu}</>;
    case "qtd":
      return (
        accessRowById && (
          <IconButton
            sx={{ width: 30, height: 30 }}
            onClick={() => accessRowById(row.id)}
          >
            <Typography>{row.qtd}</Typography>
          </IconButton>
        )
      );
    case "actions2":
      return (
        menu &&
        accessRowById && (
          <div
            sx={{ width: 30, height: 30 }}
            onClick={() => accessRowById(row.id)}
          >
            {menu}
          </div>
        )
      );
    case "remove":
      return (
        rmvFunction && (
          <IconButton onClick={() => rmvFunction(row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        )
      );
    default:
      return row[item.name];
  }
}

const DynamicTableRow: React.FC<ITableRowProps> = ({
  row,
  head,
  menu,
  accessRowById,
  rmvFunction,
}) => (
  <TableRow key={row.id}>
    {head.map((item) => (
      <TableCell key={item.name} align={item.align || "left"}>
        {returnCellContent(item, row, menu, accessRowById, rmvFunction)}
      </TableCell>
    ))}
  </TableRow>
);

export default function DataTable(props: IPropsDataTable) {
  const rows = props.data;

  function handleSort(value: string) {
    if (value !== undefined) {
      if (props.orderBy === value) {
        props.order === "asc" ? props.setOrder("desc") : props.setOrder("asc");
      } else {
        props.setOrder("asc");
        props.setOrderBy(value);
      }
    }
  }

  if (props.isLoading) {
    return (
      <Spinner
        state={props.isLoading}
        size={10}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }

  return (
    <Table stickyHeader>
      <StyledTableHead
        head={props.head}
        orderBy={props.orderBy}
        order={props.order}
        onRequestSort={handleSort}
      />
      <TableBody>
        {rows ? (
          rows.map((row) => (
            <DynamicTableRow
              key={row.id}
              row={row}
              head={props.head}
              menu={props.menu}
              accessRowById={props.accessRowById}
              rmvFunction={props.rmvFunction}
            />
          ))
        ) : (
          <Typography m="auto">Nenhum resultado encontrado</Typography>
        )}
      </TableBody>
    </Table>
  );
}
