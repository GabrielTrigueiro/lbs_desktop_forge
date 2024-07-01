import { useFormik } from "formik";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import DefaultModal from "../defaultModal/defaultModal";
import { TCharacteristicsDTO, TProductRegister } from "../../../../core/models/product";
import { TCategoryBody } from "../../../../core/models/category";
import { TBrandBody } from "../../../../core/models/brand";
import { TCollectionBody } from "../../../../core/models/collection";
import PriceTextField from "../../../../app/components/InputPrice/PriceTextField";
import GenericTextField from "../../../../app/components/genericTextField/GenericTextField";
import AsyncAutoComplete from "../../../../app/components/assyncronusAutoComplete/AssyncAutoComplete";
import {
  BRAND_LIST,
  CATEGORY_LIST,
  CHARACTERISTIC_LIST,
  COLLECTION_LIST,
  SUPPLIER_LIST,
} from "../../../../core/utils/constants";
import { TSupplierBody } from "../../../../core/models/supplier";
import {
  calcularCustoEtiqueta,
  calcularLucroRevenda,
} from "../../../../core/utils/globalFunctions";
import {
  AddInfoContainer,
  InfosContainer,
  InputsPrice,
  LeftContent,
  MainContainer,
  PriceContainer,
  ProfitInPercentage,
  RightContent,
  RowAlign,
} from "./styles";
import CharacteristicList from "../../../../app/components/characteristicList/characteristicList";
import DefaultDialog from "../../defaultDialog/defaultDialog";
import { Validations } from "../../../../core/utils/validations";
import { ProductService } from "../../../../core/api/product/productService";
import { Notification } from "../../../../app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";
import ProductImages from "../../../../app/components/uploadImage/productImages";

const initialValues: TProductRegister = {
  name: "",
  sku: "",
  amount: 0,
  priceCost: 0,
  priceTag: 0,
  resalePrice: 0,
  characteristicsDTOList: [],

};

const initialCharacteristics: TCharacteristicsDTO = {
  name: "",
  amount: 0,
  description: "",
};

interface IProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}


const RegisterProductModal = (props: IProductModalProps) => {
  const { isOpen, onClose, onOpen } = props;


  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const callCreateProduct = async (newProduct: TProductRegister) => {
    setIsLoading(true)
    let cleanedProduct: TProductRegister = {
      name: newProduct.name,
      sku: newProduct.sku,
      amount: Number(newProduct.amount),
      priceCost: priceCost ?? 0,
      resalePrice: resalePrice ?? 0,
      priceTag: priceTag ?? 0,
      brandId: newProduct.brandId,
      categoryId: newProduct.categoryId,
      supplierId: newProduct.supplierId,
      collectionId: newProduct.collectionId,
      characteristicsDTOList: newProduct.characteristicsDTOList,
    };
    ProductService.createProduct({
      ...cleanedProduct, dataSaveImage: [{ imageBase64: formik.values.productImages?.imageOne, typeImage: "PNG" },
      { imageBase64: formik.values.productImages?.imageTwo, typeImage: "PNG" },
      { imageBase64: formik.values.productImages?.imageThree, typeImage: "PNG" }]
    })
      .then((resp) => {
        handleResetStates();
        setIsLoading(false)
        onClose()
      })
      .catch((err: AxiosError) => {
        Notification(String(err.message), "error")
        setIsLoading(false);
      });
  };


  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validationSchema: Validations.ProductRegisterSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      callCreateProduct(values)
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const [priceCost, setPriceCost] = useState<number | undefined>();
  const [priceTag, setPriceTag] = useState<number | undefined>();
  const [resalePrice, setResalePrice] = useState<number | undefined>();

  // ? adicionar uma caracteristica
  const [charDialog, setCharDialog] = useState(false);
  const [tempCharacteristic, setTempCharacteristic] =
    useState<TCharacteristicsDTO>(initialCharacteristics);
  const [errorDialog, setErrorDialog] = useState("");

  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [priceTagPercent, setPriceTagPercent] = useState<string>();
  const [priceRelasePercent, setPriceRelasePercent] = useState<string>();

  // ? importar imagem
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCharacteristic = (rmvItemId: string) => {
    console.log("Removendo: ", rmvItemId);
    formik.setFieldValue(
      "characteristicsDTOList",
      formik.values.characteristicsDTOList.filter((item) => item.id !== rmvItemId)
    );
  };

  const handleSelectSupplier = (selected: TSupplierBody) => {
    console.log("Selecionado: ", selected);
    formik.setFieldValue("supplierId", selected.id);
  };

  const handleSelectCategory = (selected: TCategoryBody) => {
    console.log("categoria Selecionado: ", selected.id);
    formik.setFieldValue("categoryId", selected.id);
  };

  const handleSelectBrand = (selected: TBrandBody) => {
    console.log("marca Selecionado: ", selected);
    formik.setFieldValue("brandId", selected.id);
  };

  const handleSelectCollection = (selected: TCollectionBody) => {
    console.log("colecao Selecionado: ", selected);
    formik.setFieldValue("collectionId", selected.id);
  };

  const handleResetForm = () => {
    onClose();
    formik.resetForm();
  };

  // ? funções do dialog
  const handleConfirmCharacteristic = () => {
    handleAddCharacteristics(tempCharacteristic);
  };

  const handleCancelCharacteristic = () => {
    setCharDialog(false);
    setErrorDialog("");
    setTempCharacteristic(initialCharacteristics);
  };

  const handleAddCharacteristics = useCallback(
    (newCharacteristic: TCharacteristicsDTO) => {
      let newChar: TCharacteristicsDTO = {
        characteristcId: newCharacteristic.id,
        name: newCharacteristic.name,
        amount: newCharacteristic.amount,
        description: newCharacteristic.description,
      };

      let newList = [...formik.values.characteristicsDTOList, newChar];

      // Validação de quantidade de características
      const totalAmount = newList
        .map((item) => item.amount)
        .reduce((acc, curr) => acc + curr, 0);
      const productAmount = formik.values.amount;

      console.log("Product Amount:", productAmount);
      console.log("Total Characteristics Amount:", totalAmount);

      if (productAmount < totalAmount) {
        console.error(
          "Erro: A quantidade da característica não pode ser maior que a quantidade do produto"
        );
        setErrorDialog(
          "A quantidade da característica não pode ser maior que a quantidade do produto"
        );
        return;
      } else {
        // Caso não tenha dado erro
        console.log("Não houve erro, atualizando o formik");
        formik.setFieldValue("characteristicsDTOList", newList);
        setCharDialog(false);
        setErrorDialog("");
        setTempCharacteristic(initialCharacteristics);
      }
    },
    [formik]
  );

  // ? verifica os preços e atualiza os valores do lucro
  useEffect(() => {
    setPriceRelasePercent(calcularLucroRevenda(priceCost, resalePrice));
    setPriceTagPercent(calcularCustoEtiqueta(priceCost, priceTag));
  }, [priceCost, priceTag, resalePrice]);

  return (
    <>
      <DefaultDialog
        isOpen={charDialog}
        title={"Nova característica"}
        onCloseAction={() => handleCancelCharacteristic()}
        confirmAction={() => handleConfirmCharacteristic()}
        disabled={
          tempCharacteristic.name === "" ||
          tempCharacteristic.amount === 0 ||
          tempCharacteristic.description === "" ||
          tempCharacteristic.characteristcId === 0
        }
        body={
          <AddCharacteristicContent
            qtd={
              formik.values.amount -
              formik.values.characteristicsDTOList
                .map((item) => item.amount)
                .reduce((acc, curr) => acc + curr, 0)
            }
            error={errorDialog}
            tempCharacteristic={tempCharacteristic}
            setTempCharacteristic={setTempCharacteristic}
          />
        }
      />

      <DefaultModal
        title="Cadastrar Produto"
        isOpen={isOpen}
        onClose={handleResetForm}
        onOpen={onOpen}
        children={
          <MainContainer>
            <LeftContent>
              <ProductImages formik={formik} />
              <PriceContainer>
                <InputsPrice>
                  <PriceTextField
                    name="priceCost"
                    label="Preço de Custo"
                    value={formik.values.priceCost.toString()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      formik.handleChange(event);
                    }}
                    error={!!formik.errors.priceCost}
                    helperText={formik.errors.priceCost}
                    priceNumber={priceCost}
                    setPriceNumber={setPriceCost}
                    style={{ display: "flex", flex: 2 }}
                  />

                  <ProfitInPercentage>
                    <Typography sx={{ fontSize: "1.1pc" }}>Lucro</Typography>
                    <Typography sx={{ fontSize: "1.1pc" }}>
                      {priceRelasePercent}
                    </Typography>
                  </ProfitInPercentage>
                  <PriceTextField
                    name="resalePrice"
                    label="Preço de Revenda"
                    value={formik.values.resalePrice.toString()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      formik.handleChange(event);
                    }}
                    error={!!formik.errors.resalePrice}
                    helperText={formik.errors.resalePrice}
                    priceNumber={resalePrice}
                    setPriceNumber={setResalePrice}
                    style={{ display: "flex", flex: 2 }}
                  />

                  <ProfitInPercentage>
                    <Typography sx={{ fontSize: "1.1pc" }}>Lucro</Typography>
                    <Typography sx={{ fontSize: "1.1pc" }}>
                      {priceTagPercent}
                    </Typography>
                  </ProfitInPercentage>

                  <PriceTextField
                    name="priceTag"
                    label="Preço de Etiqueta"
                    value={formik.values.priceTag.toString()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      formik.handleChange(event);
                    }}
                    error={!!formik.errors.priceCost}
                    helperText={formik.errors.priceCost}
                    priceNumber={priceTag}
                    setPriceNumber={setPriceTag}
                    style={{ display: "flex", flex: 2 }}
                  />
                </InputsPrice>
                <Button
                  onClick={() => formik.handleSubmit()}
                  sx={{ display: "flex", flex: 1, marginTop: "0.3rem" }}
                >
                  CADASTRAR
                </Button>
              </PriceContainer>
            </LeftContent>
            <RightContent>
              <InfosContainer>
                <GenericTextField<string>
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                  small
                  name={"name"}
                  label={"Nome"}
                  value={formik.values.name}
                  props={{
                    onChange: formik.handleChange,
                  }}
                  style={{ width: "100%" }}
                />
                <GenericTextField<string>
                  error={!!formik.errors.sku}
                  helperText={formik.errors.sku}
                  small
                  name={"sku"}
                  label={"Código da Barras"}
                  value={formik.values.sku}
                  props={{
                    onChange: formik.handleChange,
                  }}
                  style={{ width: "100%" }}
                />
                <RowAlign>
                  <GenericTextField<number>
                    error={!!formik.errors.amount}
                    helperText={formik.errors.amount}
                    small
                    name={"amount"}
                    label={"Quantidade"}
                    value={formik.values.amount}
                    props={{
                      onChange: formik.handleChange,
                    }}
                    style={{ display: "flex", flex: 1 }}
                  />
                  <AsyncAutoComplete
                    label="Procurar Fornecedor"
                    handleOnSelect={handleSelectSupplier}
                    urlToSearch={SUPPLIER_LIST}
                    sortField="nameRepresentative"
                    style={{ display: "flex", flex: 2 }}
                    error={formik.errors.supplierId}
                    haveError={!!formik.errors.supplierId}
                  />
                </RowAlign>
                <AsyncAutoComplete
                  label="Procurar Categorira"
                  handleOnSelect={handleSelectCategory}
                  urlToSearch={CATEGORY_LIST}
                  sortField="name"
                  error={formik.errors.categoryId}
                  haveError={!!formik.errors.categoryId}
                />
                <AsyncAutoComplete
                  label="Procurar Coleção"
                  handleOnSelect={handleSelectCollection}
                  urlToSearch={COLLECTION_LIST}
                  sortField="name"
                  error={formik.errors.collectionId}
                  haveError={!!formik.errors.collectionId}
                />
                <AsyncAutoComplete
                  label="Procurar Marca"
                  handleOnSelect={handleSelectBrand}
                  urlToSearch={BRAND_LIST}
                  sortField="name"
                  error={formik.errors.brandId}
                  haveError={!!formik.errors.brandId}
                />
              </InfosContainer>
              {/* tabela de caracteristicas */}
              <AddInfoContainer>
                <Button
                  variant="outlined"
                  onClick={() => setCharDialog(true)}
                  sx={{ display: "flex", width: "100%" }}
                >
                  + ADICIONAR INFORMAÇÃO
                </Button>
                <Box sx={{ overflowY: "scroll", height: 200 }}>
                  <CharacteristicList
                    rmv={removeCharacteristic}
                    list={formik.values.characteristicsDTOList}
                  />
                </Box>
              </AddInfoContainer>
            </RightContent>
          </MainContainer>
        }
      />
    </>
  );
};

export default RegisterProductModal;

// ? conteúdo do dialog de adicionar caractesristica
interface IAddCharacteristicContentProps {
  error: string;
  qtd: number;
  tempCharacteristic: TCharacteristicsDTO;
  setTempCharacteristic: Dispatch<SetStateAction<TCharacteristicsDTO>>;
}

const AddCharacteristicContent = ({
  setTempCharacteristic,
  tempCharacteristic,
  error,
  qtd,
}: IAddCharacteristicContentProps) => {
  // ? função para alterar o estado da caracteristica por nome de atributo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempCharacteristic((prevState) => ({
      ...prevState,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  // ? função para selecionar o tipo da caracteristica
  const handleSelectCategory = (selected: TCharacteristicsDTO) => {
    console.log("Selecionado: ", selected);
    setTempCharacteristic({ ...selected, description: "", amount: tempCharacteristic.amount })
  };

  return (
    <Box>
      <Typography fontWeight={"bold"} textAlign={"center"}>
        Quantidade do produto disponível: {qtd}
      </Typography>
      <AsyncAutoComplete
        label="Atribuir caracteristica"
        handleOnSelect={handleSelectCategory}
        urlToSearch={CHARACTERISTIC_LIST}
        sortField="name"
        variant="standard"
        onClear={() => setTempCharacteristic(initialCharacteristics)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          label="Descrição"
          variant="standard"
          name="description"
          value={tempCharacteristic.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantidade"
          variant="standard"
          name="amount"
          type="number"
          defaultValue={tempCharacteristic.amount}
          value={tempCharacteristic.amount ?? 0}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Box>
      {error && (
        <FormHelperText
          sx={{ margin: -0.5, padding: 0, textAlign: "center" }}
          error={true}
        >
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};
