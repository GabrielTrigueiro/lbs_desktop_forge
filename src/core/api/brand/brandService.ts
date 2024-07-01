import { TBrandBody, TBrandPageable, TBrandUpdate } from "../../../core/models/brand"
import { TCategoryBody } from "../../../core/models/category"
import { IPage, IResponseBody } from "../../../core/models/utils"
import { axiosInstance } from "../axios/axiosInstance"
import { BRAND_LIST, BRAND_SAVE, BRAND_UPDATE } from "../../../core/utils/constants"
import { Notification } from "../../../app/components/toastNotification/toastNotification"
import { isAxiosError } from "axios"

const getFiltedBrand = async (
    brandPageable: TBrandPageable
): Promise<IPage<TCategoryBody | undefined>> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TBrandBody>>>(
        BRAND_LIST,
        {
            params: {
                page: brandPageable.page,
                size: brandPageable.size,
                sort: "createdAt,desc",
                name: brandPageable?.name,
            },
        }
    )
    return response.data.data
}

const updateBrand = async (updatedBrand: TBrandUpdate, idBrand: string): Promise<any> => {
    return await axiosInstance
        .put(`${BRAND_UPDATE}${idBrand}`, updatedBrand)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const createBrand = async (
    newBrand: TBrandUpdate
): Promise<any> => {
    return await axiosInstance
        .post(`${BRAND_SAVE}`, newBrand)
        .then((response) => {
            if (response instanceof isAxiosError) {
                return response.data.errors;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

export const BrandService = {
    getFiltedBrand,
    updateBrand,
    createBrand
}