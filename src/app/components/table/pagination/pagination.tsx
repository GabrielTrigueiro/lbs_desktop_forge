import React from "react";
import { Box, Divider, TablePagination } from "@mui/material";
import { IPropsPagination } from "../../../../core/models/paginationTable";
import theme from "../../../../core/theme/theme";

export default function DataTablePagination(props: IPropsPagination) {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };
  return (
    <Box sx={{ background: theme.COLORS.WHITE }}>
      <Divider />
      <TablePagination
        sx={{ overflow: "hidden" }}
        component="div"
        count={props.count}
        page={props.page}
        onPageChange={handleChangePage}
        rowsPerPage={props.rowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
        labelRowsPerPage={"Linhas por pagina"}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showLastButton={true}
        showFirstButton={true}

      />
    </Box>
  );
}
