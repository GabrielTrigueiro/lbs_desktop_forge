import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCallback, useMemo, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as uuid from "uuid";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT } from "../../../core/redux/slices/saleSlice/saleSlice";

import theme from "../../../core/theme/theme";
import AsyncAutoComplete from "../assyncronusAutoComplete/AssyncAutoComplete";
import { TListItem } from "../../../app/views/sale/sale";
import { removeNonNumeric } from "../../../core/utils/globalFunctions";
import { PRODUCT_LIST } from "../../../core/utils/constants";
import { useNavigate } from "react-router-dom";
import { TProductRegister } from "../../../core/models/product";
import { CaracteristicsDialog } from "./CaracteristicsModal";

const initialProduct: TListItem = {
  id: "",
  priceTag: 0,
  resalePrice: 0,
  productName: "",
  quantity: 0,
  caracteristicsInfos: [],
  caracteristicsRequest: [],
};

const styles = {
  height: 40,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: theme.COLORS.BLACK,
  },
};

function SaleSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Estado para controlar o valor selecionado no AsyncAutoComplete
  const [selectedProduct, setSelectedProduct] = useState<TProductRegister | null>(null);
  const [autoCompleteKey, setAutoCompleteKey] = useState<string>(uuid.v4());

  // Item da lista temporário
  const [tempProduct, setTempProduct] = useState<TListItem>(initialProduct);

  // Dialog para adicionar características
  const [openCaracteristicsDialog, setOpenCaracteristicsDialog] = useState(false);

  // Selecionar produto da lista de search
  const handleSelect = (selected: any) => {
    console.log(selected);
    
    setSelectedProduct(null);
    setSelectedProduct(selected);
    if (selected.productCharacteristics.length > 0) {
      setOpenCaracteristicsDialog(true);
    } else {
      setTempProduct({
        id: selected.id,
        image: selected.images,
        priceTag: selected.priceTag,
        resalePrice: selected.resalePrice,
        productName: selected.name,
        quantity: 1,
        caracteristicsInfos: selected.productCharacteristics ?? [],
        caracteristicsRequest: [],
      });
    }
  };

  // Adicionar produto na lista
  const handlePushItem = useCallback(() => {
    if (tempProduct) {
      dispatch({ type: ADD_PRODUCT, payload: tempProduct });
      setSelectedProduct(null);
      setTempProduct(initialProduct);
      setAutoCompleteKey(uuid.v4());
    }
  }, [dispatch, tempProduct]);

  // Mudar a quantidade do produto antes de enviar
  const handleChangeQtd = useCallback((newValue: string) => {
    let parsedToNumber = newValue === "" ? 0 : Number(removeNonNumeric(newValue));
    setTempProduct((prev) => prev && { ...prev, quantity: parsedToNumber });
  }, []);

  // Mudar a quantidade do produto em 1
  const handleChangeByOneQtd = useCallback((type: "add" | "minus") => {
    setTempProduct((prev) => prev && {
      ...prev,
      quantity: prev.quantity + (type === "add" ? 1 : prev.quantity === 0 ? 0 : -1),
    });
  }, []);

  // Zerar quantidade
  const handleResetQtd = useCallback(() => {
    setTempProduct((prev) => prev && { ...prev, quantity: 0 });
  }, []);

  const showdNotAdd = useMemo(() => tempProduct.quantity === 0 || !tempProduct.id, [tempProduct]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: "0.5rem",
      }}
    >
      {/* Dialog para adicionar características */}
      <CaracteristicsDialog
        fullProduct={selectedProduct}
        isOpen={openCaracteristicsDialog}
        setOpen={setOpenCaracteristicsDialog}
        setSelectedProduct={setSelectedProduct}
        setTempProduct={setTempProduct}
      />

      {/* Alterar quantidade */}
      <Button sx={styles} onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </Button>

      {/* Manipular a quantidade */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <TextField disabled={tempProduct.caracteristicsRequest.length > 0}
          label="Qtd"
          type="number"
          value={tempProduct?.quantity === 0 ? "" : tempProduct?.quantity}
          onChange={(event) => handleChangeQtd(event.target.value)}
          variant="outlined"
          size={"small"}
          sx={{ width: 70 }}
        />
        <ButtonGroup disableElevation variant="outlined">
          <Button  disabled={tempProduct.caracteristicsRequest.length > 0}sx={styles} onClick={() => handleChangeByOneQtd("add")}>
            <AddIcon />
          </Button>
          <Button disabled={tempProduct.caracteristicsRequest.length > 0} sx={styles} onClick={() => handleChangeByOneQtd("minus")}>
            <RemoveIcon />
          </Button>
          <Button disabled={tempProduct.caracteristicsRequest.length > 0} sx={styles} onClick={() => handleResetQtd()}>
            Zerar
          </Button>
        </ButtonGroup>
      </Box>

      {/* search */}
      <AsyncAutoComplete<any>
        key={autoCompleteKey} // Adicionar esta linha
        label="Procurar produto"
        handleOnSelect={handleSelect}
        urlToSearch={PRODUCT_LIST}
        sortField="createdAt"
        selectedValue={selectedProduct}
      />

      {/* botao de adicionar */}
      <Button
        disabled={showdNotAdd}
        onClick={() => handlePushItem()}
        size={"small"}
      >
        Adicionar
      </Button>
    </Box>
  );
}

export default SaleSearch;
