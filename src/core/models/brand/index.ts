import { IPageable } from "../utils";

export type TBrandBody = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TBrandUpdate = {
    name: string;
    description: string;
}

export type TBrandRegister = {
    name: string;
    description: string;
}

export type TBrandFilterRequest = {
    name: string | undefined,
}

export type TBrandPageable = TBrandFilterRequest & IPageable;