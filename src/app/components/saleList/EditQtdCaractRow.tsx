import {
  TCharacteristisRequest,
  TListItem,
  TProductCharacteristics,
} from "../../../app/views/sale/sale";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import DefaultDialog from "../defaultDialog/defaultDialog";
import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { SET_LIST } from "../../../core/redux/slices/saleSlice/saleSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/redux/store";

interface ICaracteristicsModalProps {
  isOpen: boolean;
  tempProduct: TListItem;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTempProduct: Dispatch<SetStateAction<TListItem>>;
  setList: Dispatch<SetStateAction<TListItem[]>>;
}

export const EditCaracteristicQtd = ({
  isOpen,
  tempProduct,
  setOpen,
  setList,
  setTempProduct,
}: ICaracteristicsModalProps) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.sale);
  const [caracteristicsInfos, setCaracteristicsInfos] = useState<TCharacteristisRequest[]>([]);

  const qtd = useMemo(
    () => caracteristicsInfos.reduce((acc, qtd) => acc + qtd.amountProductCharacteristics, 0),
    [caracteristicsInfos]
  );

  function handleCancel() {
    setOpen(false);
  }

  function handleConfirm() {
    let newList = list.map((item) => item.id === tempProduct.id ? { ...item, quantity: qtd, caracteristicsRequest: caracteristicsInfos } : item);
    dispatch({ type: SET_LIST, payload: newList });
    setCaracteristicsInfos([]);
    setOpen(false);
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    setCaracteristicsInfos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, amountProductCharacteristics: quantity } : c))
    );
  };

  const handleSelectCharacteristic = (characteristic: TProductCharacteristics, isSelected: boolean) => {
    setCaracteristicsInfos((prev) =>
      isSelected
        ? [...prev, { id: characteristic.id, amountProductCharacteristics: 1 }]
        : prev.filter((c) => c.id !== characteristic.id)
    );
  };

  useEffect(() => {
    if (tempProduct) {
      setCaracteristicsInfos([...tempProduct.caracteristicsRequest]); // fazer uma cópia profunda
    }
  }, [tempProduct]);

  return (
    <DefaultDialog
      title="Adicionar Características"
      disabled={qtd === 0}
      isOpen={isOpen}
      onCloseAction={handleCancel}
      confirmAction={handleConfirm}
      body={
        <>
          <Typography textAlign={"center"}>Total selecionado: {qtd}</Typography>
          <Typography textAlign={"center"}>Escolha as características e as quantidades:</Typography>
          {tempProduct?.caracteristicsInfos?.map((characteristic: TProductCharacteristics) => (
            <Box key={characteristic.id} sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!caracteristicsInfos.find((c) => c.id === characteristic.id)}
                    onChange={(event) => handleSelectCharacteristic(characteristic, event.target.checked)}
                  />
                }
                label={`Em estoque: ${characteristic.amount} ${characteristic.characteristics.description}: ${characteristic.description}`}
              />
              {!!caracteristicsInfos.find((c) => c.id === characteristic.id) && (
                <TextField
                  label="Qtd"
                  type="number"
                  value={caracteristicsInfos.find((c) => c.id === characteristic.id)?.amountProductCharacteristics ?? 0}
                  onChange={(event) => handleQuantityChange(characteristic.id, Number(event.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{ ml: 2, width: 70 }}
                />
              )}
            </Box>
          ))}
        </>
      }
    />
  );
};
