import theme from "../../../core/theme/theme";
import AsyncAutoComplete from "../assyncronusAutoComplete/AssyncAutoComplete";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    CLIENT_LIST,
    COLLABORATOR_LIST,
    LIST_PAYMENT_TYPES,
    PRODUCT_IMAGE,
} from "../../../core/utils/constants";
import { axiosInstance } from "../../../core/api/axios/axiosInstance";
import { formatCurrencyBR, removeNonNumeric } from "../../../core/utils/globalFunctions";
import { RootState } from "../../../core/redux/store";
import {
    SET_FIXED_DISCOUNT,
    SET_NAME, SET_PERCENTAGE_DISCOUNT,
    SET_SALE_REQUEST, setPaymentMethodNames, setPaymentToSale,
} from "../../../core/redux/slices/saleSlice/saleSlice";
import { TPaymentOption } from "../../../core/models/sale";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Button,
    Checkbox, Divider,
    FormControl, IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Skeleton,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { IPage, IResponseBody } from "../../../core/models/utils";
import * as React from "react";
import { TPaymentMethodSale } from "../../../app/views/sale/sale";
import html2pdf from "html2pdf.js";
import { CupomFiscal } from "../cupomFiscal/CupomFiscal";
import DefaultDialog from "../defaultDialog/defaultDialog";
import PriceTextField from "../InputPrice/PriceTextField";
import { set } from "date-fns";

export const SaleInfos = () => {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const {
        saleRequest,
        list,
        autoCompleteNames,
        paymentMethodNames,
        paymentToSale,
        percentageDiscount,
        fixedDiscount,
        salePriceType
    } = useSelector(
        (state: RootState) => state.sale
    );

    // ? valor total da compra
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

    // ? Verifica se a compra pode ser finalizada
    const canFinishSale = useMemo(
        () => {
            const discountAmount = totalValue * (percentageDiscount / 100);
            const finalValue = totalValue - discountAmount - fixedDiscount;

            const totalPayments = paymentToSale.reduce((acc, item) => acc + (item.value ?? 0), 0);

            return (
                totalValue > 0 &&
                totalPayments === finalValue &&
                paymentToSale.every((item) => item.value > 0)
            );
        },
        [totalValue, percentageDiscount, fixedDiscount, paymentToSale]
    );

    const [productImage, setproductImage] = useState("");

    // ! teste
    const [showCupom, setShowCupom] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // ! guarda os metodos de pagamento vindos da api
    const [paymentMethods, setPaymentMethods] = useState<TPaymentOption[]>([]);

    // ! guarda os nomes dos metodos de pagamento como opcao e selecionados
    const [options, setOptions] = useState<string[]>([]);

    // ! guarda o desconto fixo
    const [fixedDiscountState, setFixedDiscountState] = useState<number | undefined>();

    // ! guarda o valor do boleto
    const [boletoState, setBoletoState] = useState<number | undefined>();

    // ! guarda o valor do pix
    const [pixState, setPixState] = useState<number | undefined>();

    // ! mudar o nome do select para "Método de pagamento"
    const handleChange = (event: SelectChangeEvent<typeof paymentMethodNames>) => {
        const {
            target: { value },
        } = event;
        const selectedNames = typeof value === "string" ? value.split(",") : value;
        dispatch(setPaymentMethodNames(selectedNames));

        // ? encontrar os métodos com os nomes dos métodos de pagamento
        let methods = paymentMethods.filter((item) => selectedNames.includes(item.name));

        // ? iniciar o array de métodos de pagamento para a venda
        let updateMethods: TPaymentMethodSale[] = [];

        // ? para cada método de pagamento, verificar se ele está selecionado
        methods.forEach((method) => {
            if (selectedNames.includes(method.name)) {
                updateMethods.push({
                    id: method.id,
                    name: method.name,
                    // ! se não encontrar o método de pagamento, colocar 0 como valor
                    value: paymentToSale.find((item) => item.id === method.id)?.value || 0,
                });
            }
        });

        // ? atualizar o estado da venda
        dispatch(setPaymentToSale(updateMethods));
    };

    const handleSelectClient = (selected: any) => {
        const updatedSaleRequest = { ...saleRequest, clientId: selected.id };
        const updatedNameClient = {
            ...autoCompleteNames,
            clientName: selected.name,
        };
        dispatch({ type: SET_NAME, payload: updatedNameClient });
        dispatch({ type: SET_SALE_REQUEST, payload: updatedSaleRequest });
    };

    const handleSelectCollaborator = (selected: any) => {
        const updatedSaleRequest = { ...saleRequest, collaboratorId: selected.id };
        const updatedNameCollaborator = {
            ...autoCompleteNames,
            collaboratorName: selected.name,
        };
        dispatch({ type: SET_NAME, payload: updatedNameCollaborator });
        dispatch({ type: SET_SALE_REQUEST, payload: updatedSaleRequest });
    };

    const onClearClient = () => {
        dispatch({
            type: SET_NAME,
            payload: { ...autoCompleteNames, clientName: "" },
        });
        dispatch({
            type: SET_SALE_REQUEST,
            payload: { ...saleRequest, clientId: 0 },
        });
    };

    const onClearCollaborator = () => {
        dispatch({
            type: SET_NAME,
            payload: { ...autoCompleteNames, collaboratorName: "" },
        });
        dispatch({
            type: SET_SALE_REQUEST,
            payload: { ...saleRequest, collaboratorId: 0 },
        });
    };

    // ? carregar a imagem do ultimo produto adicionado
    useEffect(() => {
        const lastProduct = list[list.length - 1];
        const fetchImage = async () => {
            if (lastProduct?.image) {
                const response = await axiosInstance.get(
                    `${PRODUCT_IMAGE}${lastProduct.image[0].id}`
                );
                setproductImage(response.data.data);
            } else {
                setproductImage("");
            }
        };
        fetchImage();
    }, [list]);

    // ? enviar a compra
    const submitSale = async () => {
        const newSale = {
            ...saleRequest,
            amount: percentageDiscount > 0 ? totalValue * (1 - percentageDiscount / 100) : totalValue - fixedDiscount,
            paymentMethods: paymentToSale,
            productDTOs: list.map((item) => ({
                productId: item.productId!,
                amount: item.quantity,
                productCharacteristcsDTOs: item.caracteristicsRequest,
            })),
        };

        console.log("enviando compra: ", newSale);

        // Mostrar o Cupom Fiscal
        setShowCupom(true);
    };

    // Função para gerar o PDF
    const generatePDF = async () => {
        if (invoiceRef.current) {
            const opt = {
                margin: 1,
                filename: 'cupom-fiscal.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            };

            await html2pdf().from(invoiceRef.current).set(opt).save();
        }
    };

    const lastProduct = list[list.length - 1];

    // ! teste
    const loading = open && paymentMethods.length === 0;

    // ! carregar os metodos de pagamento quando abrir o select
    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            try {
                const response = await axiosInstance.get<
                    IResponseBody<IPage<TPaymentOption>>
                >(LIST_PAYMENT_TYPES, {
                    params: {
                        sort: `name,desc`,
                    },
                });
                if (active) {
                    setPaymentMethods(response.data.data.content);
                    setOptions(response.data.data.content.map((item) => item.name));
                }
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        })();
        return () => {
            active = false;
        };
    }, [loading, page, rowsPerPage]);

    // ! atualizar o valor do desconto fixo no input
    useEffect(() => {
        const fixedDiscountAtual = fixedDiscount;
        if (fixedDiscountAtual) {
            setFixedDiscountState(fixedDiscountAtual);
        }
    }, [fixedDiscount]);

    // ! atualizar o valor do boleto e pix no input
    useEffect(() => {
        const boletoPayment = paymentToSale.find(payment => payment.name === "BOLETO");
        const pixPayment = paymentToSale.find(payment => payment.name === "PIX");

        if (boletoPayment) setBoletoState(boletoPayment.value);
        if (pixPayment) setPixState(pixPayment.value);
    }, [paymentToSale]);

    // ! alterar valor de cada método de pagamento
    const handleLocalPaymentChange = (id: number, newValue: number) => {
        dispatch(setPaymentToSale(
            paymentToSale.map((p) => p.id === id ? {
                ...p,
                value: newValue,
            } : p)
        ));
    };


    // ! alterar desconto fixo
    const handleChangeFixedDiscount = (value: number) => {
        console.log("valor do desconto fixo: ", value);

        dispatch({ type: SET_FIXED_DISCOUNT, payload: value });
    };

    // ! alterar desconto percentual
    const handleChangePercentageDiscount = (value: string) => {
        let parsedToNumber = value === "" ? 0 : Number(removeNonNumeric(value));
        dispatch({ type: SET_PERCENTAGE_DISCOUNT, payload: parsedToNumber });
    }

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                minWidth: 300,
                gap: "0.5rem",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    background: theme.COLORS.WHITE,
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                    border: `2px solid ${theme.COLORS.GRAY5}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                {lastProduct ? (
                    <>
                        {productImage === "" ? (
                            <Skeleton variant="rounded" width={"100%"} height={200} />
                        ) : (
                            <Box
                                bgcolor={theme.COLORS.GRAY6}
                                display={"flex"}
                                width={"100%"}
                                justifyContent={"center"}
                            >
                                <img
                                    height={200}
                                    style={{ objectFit: "contain" }}
                                    src={`data:image/jpeg;base64,${productImage}`}
                                    alt="product"
                                />
                            </Box>
                        )}
                        <Typography textAlign={"center"} fontWeight={"bold"}>
                            {lastProduct?.productName}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    alignItems: "start",
                                }}
                            >
                                <Typography><span
                                    style={{ fontWeight: "bold" }}>No carrinho: </span> {lastProduct?.quantity}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: "bold" }}>Preço revenda: </span>
                                    {formatCurrencyBR(lastProduct?.priceTag)}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: "bold" }}>Preço varejo: </span>
                                    {formatCurrencyBR(lastProduct?.resalePrice)}
                                </Typography>
                            </Box>
                            {lastProduct.caracteristicsInfos.length > 0 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        alignItems: "start",
                                        height: 100,
                                        overflowY: "scroll",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: "bold" }}>Caracteristicas:</Typography>
                                    {lastProduct?.caracteristicsRequest.map((caracteristic) => (
                                        <Typography key={caracteristic.id}>
                                            {
                                                lastProduct.caracteristicsInfos.find(
                                                    (item) => item.id === caracteristic.id
                                                )?.description
                                            }{" "}
                                            -{" "}
                                            {
                                                lastProduct.caracteristicsRequest.find(
                                                    (item) => item.id === caracteristic.id
                                                )?.amountProductCharacteristics
                                            }
                                            x
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </>
                ) : (
                    <Typography sx={{ margin: "auto" }}>Carrinho vazio</Typography>
                )}
            </Box>
            <Box
                sx={{
                    background: theme.COLORS.WHITE,
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                    border: `2px solid ${theme.COLORS.GRAY5}`,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                <AsyncAutoComplete
                    selectedValue={{ name: `${autoCompleteNames.clientName}` }}
                    label="Procurar cliente"
                    handleOnSelect={handleSelectClient}
                    urlToSearch={CLIENT_LIST}
                    sortField="name"
                    onClear={onClearClient}
                />
                <AsyncAutoComplete
                    selectedValue={{ name: `${autoCompleteNames.collaboratorName}` }}
                    label="Procurar vendedor"
                    handleOnSelect={handleSelectCollaborator}
                    urlToSearch={COLLABORATOR_LIST}
                    sortField="name"
                    onClear={onClearCollaborator}
                />
            </Box>
            <Box
                sx={{
                    flex: 3,
                    background: theme.COLORS.WHITE,
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                    border: `2px solid ${theme.COLORS.GRAY5}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <Typography textAlign={"center"} fontWeight={"bold"}>Desconto</Typography>
                        <TextField
                            disabled={fixedDiscount > 0}
                            variant="outlined"
                            label={'R$ %'}
                            value={percentageDiscount === 0 ? "" : percentageDiscount}
                            type="number"
                            onChange={(e) => handleChangePercentageDiscount(e.target.value)}
                            size="small"
                        />
                        <PriceTextField
                            disabled={percentageDiscount > 0}
                            name="fixedDiscount"
                            label="R$ fixo"
                            value={fixedDiscount === 0 ? "" : fixedDiscount.toString()}
                            handleFormattedChange={(e) => {
                                const newValue = Number(e.replace(/\D/g, "")) / 100;
                                handleChangeFixedDiscount(newValue);
                            }}
                            priceNumber={fixedDiscountState}
                            setPriceNumber={setFixedDiscountState}
                        />

                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography fontWeight={"bold"}>Valor da compra</Typography>
                        <Typography fontWeight={"bold"} fontSize={28}>
                            {formatCurrencyBR(percentageDiscount > 0 ? totalValue * (1 - percentageDiscount / 100) : totalValue - fixedDiscount)}
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <FormControl size={"small"}>
                    <InputLabel>Método de pagamento</InputLabel>
                    <Select
                        onOpen={() => setOpen(true)}
                        multiple
                        value={paymentMethodNames}
                        onChange={handleChange}
                        input={<OutlinedInput label="Método de pagamento" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                    >
                        {options.map((name, index) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={paymentMethodNames.includes(name)} disabled={loading} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* seção dos pagamentos */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        maxHeight: 100,
                        overflowY: "scroll",
                        padding: "0.5rem",
                    }}>
                    {/* formas de pagamento */}
                    {/* alterar o valor de cada método de pagamento */}
                    {
                        paymentToSale.map((payment) => (
                            <Box key={payment.id}
                                sx={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
                                <Typography sx={{
                                    flex: 1,
                                    fontWeight: "bold"
                                }}>{payment.name}</Typography>
                                <PriceTextField
                                    name="paymentValue"
                                    label={'R$'}
                                    value={payment.value === 0 ? "" : payment.value.toString()}
                                    handleFormattedChange={(e) => {
                                        const newValue = Number(e.replace(/\D/g, "")) / 100;
                                        handleLocalPaymentChange(payment.id, newValue);
                                    }}
                                    setPriceNumber={payment.name === "BOLETO" ? setBoletoState : setPixState}
                                    priceNumber={payment.name === "BOLETO" ? boletoState : pixState}
                                />
                                <IconButton
                                    sx={{ width: 30, height: 30 }}
                                    onClick={() => {
                                        // ! filtar as duas listas
                                        const remainingPaymentToSale = paymentToSale.filter((item) => item.id !== payment.id && item.name !== payment.name);
                                        const remainingPaymentMethodNames = paymentMethodNames.filter((name) => name !== payment.name);
                                        dispatch(setPaymentToSale(remainingPaymentToSale));
                                        dispatch(setPaymentMethodNames(remainingPaymentMethodNames));
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Button disabled={!canFinishSale} onClick={submitSale}>Finalizar Compra</Button>
            <DefaultDialog
                title="Cupom Fiscal"
                isOpen={showCupom}
                confirmAction={generatePDF}
                onCloseAction={() => setShowCupom(false)}
                body={
                    <Box
                        ref={invoiceRef}
                        sx={{
                            display: "flex",
                            width: 400,
                            maxHeight: 200,
                            overflowY: "scroll",
                            padding: "0.5rem",
                        }}
                    >
                        <CupomFiscal />
                    </Box>
                }
            />
        </Box>
    );
};

// variaveis do select multiplo
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};