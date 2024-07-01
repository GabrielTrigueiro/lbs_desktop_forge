import { TIndicationBody, TIndicationPageable, TIndicationRegister, TIndicationUpdate } from "../../../core/models/indication"
import { IPage, IResponseBody } from "../../../core/models/utils"
import { axiosInstance } from "../axios/axiosInstance"
import { INDICATION_LIST, INDICATION_SAVE, INDICATION_UPDATE } from "../../../core/utils/constants"
import { Notification } from "../../../app/components/toastNotification/toastNotification"
import { isAxiosError } from "axios"

const getFiltedIndication = async (
    indicationPageable: TIndicationPageable
): Promise<IPage<TIndicationBody | undefined>> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TIndicationBody>>>(
        INDICATION_LIST,
        {
            params: {
                page: indicationPageable.page,
                size: indicationPageable.size,
                sort: "name,desc",
                name: indicationPageable?.name,
            },
        }
    )
    return response.data.data
}

const updateIndication = async (updatedIndication: TIndicationUpdate, idIndication: string): Promise<any> => {
    return await axiosInstance
        .put(`${INDICATION_UPDATE}${idIndication}`, updatedIndication)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const createIndication = async (
    newIndication: TIndicationRegister
): Promise<any> => {
    return await axiosInstance
        .post(`${INDICATION_SAVE}`, newIndication)
        .then((response) => {
            if (response instanceof isAxiosError) {
                return response.data.errors;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

export const IndicationService = {
    getFiltedIndication,
    updateIndication,
    createIndication
}
