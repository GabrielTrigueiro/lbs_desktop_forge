import { useState, useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../../core/theme/theme";
import Button from "../Button/button";
import DefaultDialog from "../defaultDialog/defaultDialog";
import { TListItem, TSalePrices } from "../../../app/views/sale/sale";
import { formatCurrencyBR } from "../../../core/utils/globalFunctions";
import { EditCaracteristicQtd } from "./EditQtdCaractRow";
import { SET_LIST, REMOVE_PRODUCT, RESET_LIST, SET_SALE_PRICE_TYPE } from "../../../core/redux/slices/saleSlice/saleSlice";
import { RootState } from "../../../core/redux/store";

const initialProduct: TListItem = {
  id: "",
  priceTag: 0,
  resalePrice: 0,
  productName: "",
  quantity: 0,
  caracteristicsInfos: [],
  caracteristicsRequest: [],
};

export const SaleList = () => {
  const dispatch = useDispatch();
  const { list, salePriceType } = useSelector((state: RootState) => state.sale);

  const [tempRow, setTempRow] = useState<TListItem>(initialProduct);
  const [confirmClear, setConfirmClear] = useState(false);
  const [openCaracteristicsDialog, setOpenCaracteristicsDialog] = useState(false);
  const [openQtdDialog, setOpenQtdDialog] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({ type: SET_SALE_PRICE_TYPE, payload: event.target.value as TSalePrices });
  };

  const handleChangeQtd = () => {
    const newList = list.map((item) => item.id === tempRow.id ? { ...item, quantity: tempRow.quantity } : item);
    dispatch({ type: SET_LIST, payload: newList });
    setOpenQtdDialog(false);
  };

  const handleCallChangeQtd = (row: TListItem) => {
    setTempRow(row);
    if (row.caracteristicsRequest.length === 0) {
      setOpenQtdDialog(true);
    } else {
      setOpenCaracteristicsDialog(true);
    }
  };

  const totalValue = useMemo(
    () =>
      list.reduce(
        (acc, item) =>
          salePriceType === "REVENDA"
            ? acc + (item.priceTag ?? 0) * item.quantity
            : acc + (item.resalePrice ?? 0) * item.quantity,
        0
      ),
    [list, salePriceType]
  );

  return (
    <Box
      sx={{
        flex: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: theme.COLORS.WHITE,
        border: `2px solid ${theme.COLORS.GRAY5}`,
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      <TableContainer component={Paper} sx={{ flex: 10, overflowY: "scroll" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço unidade</TableCell>
              <TableCell>Preço total</TableCell>
              <TableCell>Carácteristicas</TableCell>
              <TableCell>Remover</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ width: 30, height: 30 }} onClick={() => handleCallChangeQtd(row)}>
                    <Typography>
                      {row.caracteristicsRequest.length > 0
                        ? row.caracteristicsRequest.reduce((acc, qtd) => acc + qtd.amountProductCharacteristics, 0)
                        : row.quantity}
                    </Typography>
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatCurrencyBR(salePriceType === "REVENDA" ? row.priceTag ?? 0 : row.resalePrice ?? 0)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatCurrencyBR(
                    (row.caracteristicsRequest.length > 0
                      ? row.caracteristicsRequest.reduce((acc, qtd) => acc + qtd.amountProductCharacteristics, 0)
                      : row.quantity) * (salePriceType === "REVENDA" ? row.priceTag ?? 0 : row.resalePrice ?? 0)
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.caracteristicsRequest.length === 0
                    ? "Não possui"
                    : row.caracteristicsInfos.map((item) => {
                        return row.caracteristicsRequest.map((item2) => {
                          if (item.id === item2.id) {
                            return (
                              <Typography key={item.id}>
                                {item.characteristics.name}: {item.description}
                              </Typography>
                            );
                          }
                          return null;
                        });
                      })}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ cursor: "pointer" }} onClick={() => dispatch({ type: REMOVE_PRODUCT, payload: row.id })}>
                    <DeleteIcon sx={{ color: theme.COLORS.RED }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <FormControl>
          <InputLabel>Tipo Venda</InputLabel>
          <Select value={salePriceType} label="Tipo Venda" onChange={handleChange} defaultValue="REVENDA">
            <MenuItem value={"REVENDA"}>Revenda</MenuItem>
            <MenuItem value={"VAREJO"}>Varejo</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ width: 120, height: 50 }}
          title={"Limpar"}
          isLoading={false}
          disabled={false}
          onClick={() => setConfirmClear(true)}
          sizeSpinner={20}
        />
        <Typography>Total: {formatCurrencyBR(totalValue)}</Typography>
      </Box>
      <EditCaracteristicQtd
        isOpen={openCaracteristicsDialog}
        setOpen={setOpenCaracteristicsDialog}
        setTempProduct={setTempRow}
        tempProduct={tempRow}
        setList={(newList) => dispatch({ type: SET_LIST, payload: newList })}
      />
      <DefaultDialog
        title="Alterar quantidade"
        confirmAction={handleChangeQtd}
        isOpen={openQtdDialog}
        onCloseAction={() => setOpenQtdDialog(false)}
        disabled={tempRow.quantity === 0}
        body={
          <Box>
            <Typography>Quantidade</Typography>
            <TextField
              type="number"
              value={tempRow.quantity}
              onChange={(e) => setTempRow((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))}
            />
          </Box>
        }
      />
      <DefaultDialog
        title="Limpar a lista?"
        confirmAction={() => {
          dispatch({ type: RESET_LIST });
          setConfirmClear(false);
        }}
        isOpen={confirmClear}
        onCloseAction={() => setConfirmClear(false)}
      />
    </Box>
  );
};
