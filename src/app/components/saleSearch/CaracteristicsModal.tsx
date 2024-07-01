import {
  TCharacteristisRequest,
  TListItem,
  TProductCharacteristics,
} from "../../../app/views/sale/sale";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import DefaultDialog from "../defaultDialog/defaultDialog";
import { TCharacteristicsDTO, TProductRegister } from "../../../core/models/product";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

interface ICaracteristicsModalProps {
  isOpen: boolean;
  fullProduct: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTempProduct: Dispatch<SetStateAction<TListItem>>;
  setSelectedProduct: Dispatch<SetStateAction<TProductRegister | null>>;
}

export const CaracteristicsDialog = ({
  isOpen,
  fullProduct,
  setOpen,
  setTempProduct,
  setSelectedProduct,
}: ICaracteristicsModalProps) => {
  // ? caracteristicas de quest para o row
  const [caracteristicsInfos, setCaracteristicsInfos] = useState<
    TCharacteristisRequest[]
  >(
    fullProduct
      ? fullProduct.productCharacteristics.map((item: TCharacteristicsDTO) => ({
          id: item.id!,
          amountProductCharacteristics: 0,
        }))
      : []
  );

  // ? calcula a soma de todas as caracteristicas
  const qtd = useMemo(
    () =>
      caracteristicsInfos.reduce(
        (acc, qtd) => acc + qtd.amountProductCharacteristics,
        0
      ),
    [caracteristicsInfos, fullProduct]
  );

  function handleCancel() {
    setOpen(false);
    setSelectedProduct(null);
  }

  // ? manda o produto editado para o select pronto para adicionar
  function handleConfirm() {
    setTempProduct({
      id: fullProduct.id,
      priceTag: fullProduct.priceTag,
      resalePrice: fullProduct.resalePrice,
      productName: fullProduct.name,
      quantity: qtd,
      image: fullProduct.images,
      caracteristicsInfos: fullProduct.productCharacteristics,
      caracteristicsRequest: caracteristicsInfos,
    });
    setOpen(false);
  }

  // ! mudar a quantidade de cada caracteristica individualmente
  const handleQuantityChange = (id: number, quantity: number) => {
    setCaracteristicsInfos((prev) => {
      return prev.map((c) => {
        if (c.id === id) {
          return { ...c, amountProductCharacteristics: quantity };
        }
        return c;
      });
    });
  };

  // ! adicionar ou remover caracteristicas do request
  const handleSelectCharacteristic = (
    characteristic: TProductCharacteristics,
    isSelected: boolean
  ) => {
    setCaracteristicsInfos((prev) => {
      if (isSelected) {
        return [
          ...prev,
          { id: characteristic.id, amountProductCharacteristics: 1 },
        ];
      } else {
        return prev.filter((c) => c.id !== characteristic.id);
      }
    });
  };

  // Reset the state when the modal opens
  useEffect(() => {
    if (isOpen && fullProduct) {
      setCaracteristicsInfos(
        fullProduct.productCharacteristics.map((item: TCharacteristicsDTO) => ({
          id: item.id!,
          amountProductCharacteristics: 1,
        }))
      );
    }
  }, [isOpen, fullProduct]);

  return (
    <DefaultDialog
      title="Adicionar Características"
      disabled={qtd === 0}
      isOpen={isOpen}
      onCloseAction={() => handleCancel()}
      confirmAction={() => handleConfirm()}
      body={
        <>
          <Typography textAlign={"center"}>Total selecionado: {qtd}</Typography>
          <Typography textAlign={"center"}>
            Escolha as características e as quantidades:
          </Typography>
          {fullProduct?.productCharacteristics?.map(
            (characteristic: TProductCharacteristics) => (
              <Box
                key={characteristic.id}
                sx={{ display: "flex", alignItems: "center", p: 1 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        !!caracteristicsInfos.find(
                          (c) => c.id === characteristic.id
                        )
                      }
                      onChange={(event) =>
                        handleSelectCharacteristic(
                          characteristic,
                          event.target.checked
                        )
                      }
                    />
                  }
                  label={`Em estoque: ${characteristic.amount} ${characteristic.characteristics.description}: ${characteristic.description}`}
                />
                {caracteristicsInfos.find(
                  (c) => c.id === characteristic.id
                ) && (
                  <TextField
                    label="Qtd"
                    type="number"
                    value={
                      caracteristicsInfos.find(
                        (c) => c.id === characteristic.id
                      )?.amountProductCharacteristics ?? 0
                    }
                    onChange={(event) =>
                      handleQuantityChange(
                        characteristic.id,
                        Number(event.target.value)
                      )
                    }
                    variant="outlined"
                    size="small"
                    sx={{ ml: 2, width: 70 }}
                  />
                )}
              </Box>
            )
          )}
        </>
      }
    />
  );
};
