import { TClientBody, TClientPageable, TClientRegister, TClientUpdate } from "../../../core/models/clientLBS";
import { IPage, IResponseBody } from "../../../core/models/utils";
import { axiosInstance } from "../axios/axiosInstance";
import { CLIENT_DELETE, CLIENT_DETAILS, CLIENT_LIST, CLIENT_SAVE, CLIENT_UPDATE } from "../../../core/utils/constants";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";

const getFiltedClient = async (
    clientPageable: TClientPageable
): Promise<IPage<TClientBody> | undefined> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TClientBody>>>(
        CLIENT_LIST,
        {
            params: {
                page: clientPageable.page,
                size: clientPageable.size,
                sort: "createdAt,desc",
                name: clientPageable?.name,
                cpforCnpj: clientPageable?.cpforCnpj,
            },
        }
    );
    return response.data.data;
};


const updateClient = async (updatedClient: TClientUpdate, idClient: string): Promise<any> => {
    return await axiosInstance
        .put(`${CLIENT_UPDATE}${idClient}`, updatedClient)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const deleteClient = async (idClient: string): Promise<any> => {
    return await axiosInstance.delete(`${CLIENT_DELETE}${idClient}`).then((resp) => {
        Notification(resp.data.data, 'success')
        return resp
    }).catch((error) => {
        return error
    })
}

const createClient = async (
    newClient: TClientRegister
): Promise<any> => {
    return await axiosInstance
        .post(`${CLIENT_SAVE}`, newClient)
        .then((response) => {
            if (response instanceof AxiosError) {
                return response.data.errors;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

const clientDetails = async (idClient: string): Promise<IResponseBody<TClientBody>> => {
    return await axiosInstance.get<IResponseBody<TClientBody>>(`${CLIENT_DETAILS}${idClient}`).then((resp) => {
        return resp.data.data
    }).catch((error) => {
        return error
    })
}


export const ClientLbsService = {
    getFiltedClient,
    updateClient,
    deleteClient,
    createClient,
    clientDetails
}