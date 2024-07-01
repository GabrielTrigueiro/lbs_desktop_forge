import { IPageable } from "../utils";


export type TCollectionBody = {
    id: number;
    name: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TCollectionFilterRequest = {
    name: string | undefined;
}

export type TCollectionRegister = {
    name: string;
    description: string;
}

export type TCollectionUpdate = {
    name: string;
    description: string;
}

export type TCollectionPageable = TCollectionFilterRequest & IPageable