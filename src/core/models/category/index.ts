import { IPageable } from "../utils"

export type TCategoryBody = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TCategoryUpdate = {
    name: string;
    description: string;
}

export type TCategoryRegister = {
    name: string;
    description: string;
}

export type TCategoryFilterRequest = {
    name: string | undefined,
}

export type TCategoryPageable = TCategoryFilterRequest & IPageable