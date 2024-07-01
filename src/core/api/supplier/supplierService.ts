import { TSupplierBody, TSupplierPageable, TSupplierRegister, TUpdateSupplier } from "../../../core/models/supplier";
import { IPage, IResponseBody } from "../../../core/models/utils";
import { axiosInstance } from "../axios/axiosInstance";
import { SUPPLIER_DELETE, SUPPLIER_DETAILS, SUPPLIER_LIST, SUPPLIER_SAVE, SUPPLIER_UPDATE } from "../../../core/utils/constants";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";

const getFiltedSuppiler = async (
    supplierPageable: TSupplierPageable
): Promise<IPage<TSupplierBody> | undefined> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TSupplierBody>>>(
        SUPPLIER_LIST,
        {
            params: {
                page: supplierPageable.page,
                size: supplierPageable.size,
                sort: "createdAt,desc",
                nameRepresentative: supplierPageable?.nameRepresentative,
                cpforCnpj: supplierPageable?.cpforCnpj
            },
        }
    );
    return response.data.data;
};


const updateSupplier = async (updatedSupplier: TUpdateSupplier, idSupplier: string): Promise<any> => {
    return await axiosInstance
        .put(`${SUPPLIER_UPDATE}${idSupplier}`, updatedSupplier)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const deleteSupplier = async (idSupplier: string): Promise<any> => {
    return await axiosInstance.delete(`${SUPPLIER_DELETE}${idSupplier}`).then((resp) => {
        Notification(resp.data.data, 'success')
        return resp
    }).catch((error) => {
        return error
    })
}

const createSupplier = async (
    NewSupplier: TSupplierRegister
): Promise<any> => {
    return await axiosInstance
        .post(`${SUPPLIER_SAVE}`, NewSupplier)
        .then((response) => {
            if (response instanceof AxiosError) {
                return response.data.errors;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

const supplierDetails = async (idSupplier: string): Promise<IResponseBody<TSupplierBody>> => {
    return await axiosInstance.get<IResponseBody<TSupplierBody>>(`${SUPPLIER_DETAILS}${idSupplier}`).then((resp) => {
        return resp.data.data
    }).catch((error) => {
        return error
    })
}



export const SupplierService = {
    getFiltedSupplier: getFiltedSuppiler,
    updateSupplier,
    deleteSupplier,
    createSupplier,
    supplierDetails
}
