import { TCollectionBody, TCollectionPageable, TCollectionRegister, TCollectionUpdate } from "../../../core/models/collection"
import { IPage, IResponseBody } from "../../../core/models/utils"
import { axiosInstance } from "../axios/axiosInstance"
import { COLLECTION_LIST, COLLECTION_SAVE, COLLECTION_UPDATE } from "../../../core/utils/constants"
import { Notification } from "../../../app/components/toastNotification/toastNotification"
import { isAxiosError } from "axios"

const getFiltedCollection = async (
    collectionPageable: TCollectionPageable
): Promise<IPage<TCollectionBody | undefined>> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TCollectionBody>>>(
        COLLECTION_LIST,
        {
            params: {
                page: collectionPageable.page,
                size: collectionPageable.size,
                sort: "createdAt,desc",
                name: collectionPageable?.name,
            },
        }
    )
    return response.data.data
}

const updateCollection = async (updatedCollection: TCollectionUpdate, idCollection: string): Promise<any> => {
    return await axiosInstance
        .put(`${COLLECTION_UPDATE}${idCollection}`, updatedCollection)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const createCollection = async (
    newCollection: TCollectionRegister
): Promise<any> => {
    return await axiosInstance
        .post(`${COLLECTION_SAVE}`, newCollection)
        .then((response) => {
            if (response instanceof isAxiosError) {
                return response.data.errors;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

export const CollectionService = {
    getFiltedCollection,
    updateCollection,
    createCollection
}