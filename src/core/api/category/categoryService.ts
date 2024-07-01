import { TCategoryBody, TCategoryPageable, TCategoryRegister, TCategoryUpdate } from "../../../core/models/category";
import { IPage, IResponseBody } from "../../../core/models/utils";
import { axiosInstance } from "../axios/axiosInstance";
import { CATEGORY_LIST, CATEGORY_SAVE, CATEGORY_UPDATE } from "../../../core/utils/constants";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { isAxiosError } from "axios";


const getFiltedCategory = async (
    categoryPageable: TCategoryPageable
): Promise<IPage<TCategoryBody | undefined>> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TCategoryBody>>>(
        CATEGORY_LIST,
        {
            params: {
                page: categoryPageable.page,
                size: categoryPageable.size,
                sort: "createdAt,desc",
                name: categoryPageable?.name,
            },
        }
    )
    return response.data.data
}

const updateCategory = async (updatedCategory: TCategoryUpdate, idCategory: string): Promise<any> => {
    return await axiosInstance
        .put(`${CATEGORY_UPDATE}${idCategory}`, updatedCategory)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const createCategory = async (
    newCategory: TCategoryRegister
): Promise<any> => {
    return await axiosInstance
        .post(`${CATEGORY_SAVE}`, newCategory)
        .then((response) => {
            if (response instanceof isAxiosError) {
                return response.data.errors;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

export const CategoryService = {
    getFiltedCategory,
    updateCategory,
    createCategory
}