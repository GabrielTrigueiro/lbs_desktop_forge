import { TBrandBody } from "../brand";
import { TCategoryBody } from "../category";
import { TCollectionBody } from "../collection";
import { TSupplierBody } from "../supplier";
import { IPageable } from "../utils";

export type TCharacteristicsDTO = {
    id?: any;
    characteristcId?: number;
    name: string;
    amount: number;
    description: string;
};

export type TProductImage = {
    imageOne?: string;
    imageTwo?: string;
    imageThree?: string;
}

export type TProductRegister = {
    name: string;
    sku: string;
    amount: number;
    priceCost: number;
    priceTag: number;
    resalePrice: number;
    brandId?: number;
    categoryId?: number;
    collectionId?: number;
    supplierId?: number;
    characteristicsDTOList: TCharacteristicsDTO[];

    // testes
    productImages?: TProductImage;
};

export type TProductEditer = {
    name: string;
    sku: string;
    amount: number;
    priceCost: number;
    priceTag: number;
    resalePrice: number;
    brandId?: number;
    categoryId?: number;
    collectionId?: number;
    supplierId?: number;
    characteristicsDTOList: TCharacteristicsDTO[];
    // testes
    productImages?: TProductImage;
};

export type TProductUpdate = {
    name: string;
    sku: string;
    amount: number;
    active: boolean;
    qrCode: string;
    codManual: string;
};

export type TImages = {
    id: number;
    type: string;
    url: string;
    status: string;
    product: string;
}
export type TCharacteristics = {
    id: number;
    name: string;
    description: string;
};

export type TProductCharacteristics = {
    id: number;
    characteristics: TCharacteristics;
    description: string;
    amount: number;
};

export type TProductBody = {
    id: number;
    name: string;
    sku: string;
    priceCost: number;
    priceTag: number;
    resalePrice: number;
    amount: number;
    active: boolean;
    amountStock: number;
    barcode: string;
    qrCode: string;
    codManual: string;
    createdAt: string;
    updatedAt: string;
    suppilier: TSupplierBody;
    collection: TCollectionBody;
    category: TCategoryBody;
    brand: TBrandBody;
    images: TImages[];
    productCharacteristics: TProductCharacteristics[];
};

export type TProductFilterRequest = {
    name: string | undefined;
    sku: string | undefined;
    amount: number | undefined;
    active: boolean | undefined;
};

export type TProductPageable = TProductFilterRequest & IPageable;