import {TListItem, TPaymentMethodSale, TSalePrices, TSaleRequest} from "../../../../app/views/sale/sale";
import {TPaymentOption} from "../../../models/sale";

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const RESET_LIST = 'RESET_LIST';
export const SET_SALE_REQUEST = 'SET_SALE_REQUEST';
export const SET_SALE_PRICE_TYPE = 'SET_SALE_PRICE_TYPE';
export const SET_LIST = 'SET_LIST';
export const SET_NAME = 'SET_NAME';
export const SET_SWITCH_STATE = 'SET_SWITCH_STATE';
export const SET_PAYMENT_METHOD_NAMES = 'SET_PAYMENT_METHOD_NAMES';
export const SET_PAYMENT_TO_SALE = 'SET_PAYMENT_TO_SALE';
export const SET_PERCENTAGE_DISCOUNT = 'SET_PERCENTAGE_DISCOUNT';
export const SET_FIXED_DISCOUNT = 'SET_FIXED_DISCOUNT';

const initialSale: TSaleRequest = {
    clientId: 0,
    collaboratorId: 0,
    caixaId: 0,
    amount: 0,
    status: "PENDENTE",
    typeItemSales: "REVENDA",
    paymentMethods: [],
    productDTOs: [],
};

type TAutoCompleteNames = {
    collaboratorName: string;
    clientName: string;
    selectedPayments: TPaymentOption[];
}

const initialNames: TAutoCompleteNames = {
    collaboratorName: "",
    clientName: "",
    selectedPayments: [],
};

export type Action =
    | { type: typeof ADD_PRODUCT, payload: TListItem }
    | { type: typeof REMOVE_PRODUCT, payload: string }
    | { type: typeof RESET_LIST }
    | { type: typeof SET_SALE_REQUEST, payload: TSaleRequest }
    | { type: typeof SET_SALE_PRICE_TYPE, payload: TSalePrices }
    | { type: typeof SET_LIST, payload: TListItem[] }
    | { type: typeof SET_NAME, payload: TAutoCompleteNames }
    | { type: typeof SET_SWITCH_STATE, payload: boolean }
    | { type: typeof SET_PAYMENT_METHOD_NAMES, payload: string[] }
    | { type: typeof SET_PAYMENT_TO_SALE, payload: TPaymentMethodSale[] }
    | { type: typeof SET_PERCENTAGE_DISCOUNT, payload: number }
    | { type: typeof SET_FIXED_DISCOUNT, payload: number };

type TInitialState = {
    saleRequest: TSaleRequest;
    list: TListItem[]
    salePriceType: TSalePrices;
    autoCompleteNames: TAutoCompleteNames;
    switchState: boolean;
    paymentMethodNames: string[];
    paymentToSale: TPaymentMethodSale[];
    percentageDiscount: number;
    fixedDiscount: number;
}

export const initialState: TInitialState = {
    saleRequest: initialSale,
    list: [] as TListItem[],
    salePriceType: "REVENDA" as TSalePrices,
    autoCompleteNames: initialNames,
    switchState: false,
    paymentMethodNames: [],
    paymentToSale: [],
    percentageDiscount: 0,
    fixedDiscount: 0,
};

export const saleReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            const newProduct = action.payload;
            if (newProduct.caracteristicsRequest.length === 0) {
                const productExist = state.list.find((item) => item.id === newProduct.id);
                if (productExist) {
                    return {
                        ...state,
                        list: state.list.map((item) =>
                            item.id === newProduct.id
                                ? {...item, quantity: item.quantity + newProduct.quantity}
                                : item
                        ),
                    };
                }
                return {...state, list: [...state.list, newProduct]};
            } else {
                const productExist = state.list.find((item) => item.id === newProduct.id);
                if (productExist) {
                    return {
                        ...state,
                        list: state.list.map((item) =>
                            item.id === newProduct.id
                                ? {
                                    ...item,
                                    quantity: newProduct.caracteristicsRequest.reduce(
                                        (acc, qtd) => acc + qtd.amountProductCharacteristics,
                                        0
                                    ),
                                    caracteristicsRequest: newProduct.caracteristicsRequest,
                                }
                                : item
                        ),
                    };
                }
                return {...state, list: [...state.list, newProduct]};
            }
        case REMOVE_PRODUCT:
            return {...state, list: state.list.filter((item) => item.id !== action.payload)};
        case RESET_LIST:
            return {...state, list: []};
        case SET_SALE_REQUEST:
            return {...state, saleRequest: action.payload};
        case SET_SALE_PRICE_TYPE:
            return {...state, salePriceType: action.payload};
        case SET_LIST:
            return {...state, list: action.payload};
        case SET_NAME:
            return {...state, autoCompleteNames: action.payload};
        case SET_SWITCH_STATE:
            return {...state, switchState: action.payload};
        case SET_PAYMENT_METHOD_NAMES:
            return {...state, paymentMethodNames: action.payload};
        case SET_PAYMENT_TO_SALE:
            return {...state, paymentToSale: action.payload};
        case SET_PERCENTAGE_DISCOUNT:
            return {...state, percentageDiscount: action.payload};
        case SET_FIXED_DISCOUNT:
            return {...state, fixedDiscount: action.payload};
        default:
            return state;
    }
};

// ! Action Creators
export const setPaymentMethodNames = (names: string[]) => ({
    type: SET_PAYMENT_METHOD_NAMES,
    payload: names,
});

export const setPaymentToSale = (payments: TPaymentMethodSale[]) => ({
    type: SET_PAYMENT_TO_SALE,
    payload: payments,
});