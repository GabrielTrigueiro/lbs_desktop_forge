import { visuallyHidden } from "@mui/utils";
import {
  Box,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { IPropsTableHead } from "../../../../core/models/table";
import { StyledDivDataTable } from "./styles";
import theme from "../../../../core/theme/theme";

export default function StyledTableHead(props: IPropsTableHead) {
  const createSortHandler = (property: string) => () => {
    props.onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.head.map((cell) => (
          <StyledDivDataTable key={cell.name} align={cell.align}>
            <TableSortLabel
              active={props.orderBy === cell.name}
              direction={props.orderBy === cell.name ? props.order : "asc"}
              onClick={createSortHandler(cell.name)}
            >
              {props.orderBy === cell.name ? (
                <Box component="span" sx={visuallyHidden}>
                  {props.order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
              <Typography color={theme.COLORS.WHITE}>{cell.label}</Typography>
            </TableSortLabel>
          </StyledDivDataTable>
        ))}
      </TableRow>
    </TableHead>
  );
}
