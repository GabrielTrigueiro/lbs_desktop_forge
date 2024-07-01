import { TCollaboratorBody, TCollaboratorFilterRequest, TCollaboratorPageable, TCollaboratorRegister, TCollaboratorUpdate } from "../../../core/models/collaborator";
import { IPage, IResponseBody } from "../../../core/models/utils";
import { axiosInstance } from "../axios/axiosInstance";
import { COLLABORATOR_DELETE, COLLABORATOR_DETAILS, COLLABORATOR_LIST, COLLABORATOR_SAVE, COLLABORATOR_UPDATE } from "../../../core/utils/constants";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";
import exp from "constants";




const getFiltedCollaborator = async (
    collaboratorPageable: TCollaboratorPageable
): Promise<IPage<TCollaboratorBody> | undefined> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TCollaboratorBody>>>(
        COLLABORATOR_LIST,
        {
            params: {
                page: collaboratorPageable.page,
                size: collaboratorPageable.size,
                sort: "createdAt,desc",
                name: collaboratorPageable?.name,
                cpforcnpj: collaboratorPageable?.cpforcnpj,
            }
        }
    );
    return response.data.data;
};


const updateCollaborator = async (updatedCollaborator: TCollaboratorUpdate, idCollaborator: string): Promise<any> => {
    return await axiosInstance
        .put(`${COLLABORATOR_UPDATE}${idCollaborator}`, updatedCollaborator)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const deleteCollaborator = async (idCollaborator: string): Promise<any> => {
    return await axiosInstance.delete(`${COLLABORATOR_DELETE}${idCollaborator}`).then((resp) => {
        Notification(resp.data.data, 'success')
        return resp
    }).catch((error) => {
        return error
    })
}

const createCollaborator = async (
    newCollaborator: TCollaboratorRegister
): Promise<any> => {
    return await axiosInstance
        .post(`${COLLABORATOR_SAVE}`, newCollaborator)
        .then((response) => {
            if (response instanceof AxiosError) {
                return response.data.errors;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

const collaboratorDetails = async (idCollaborator: string): Promise<IResponseBody<TCollaboratorBody>> => {
    return await axiosInstance.get<IResponseBody<TCollaboratorBody>>(`${COLLABORATOR_DETAILS}${idCollaborator}`).then((resp) => {
        return resp.data.data
    }).catch((error) => {
        return error
    })
}

export const CollaboratorService = {
    getFiltedCollaborator,
    updateCollaborator,
    deleteCollaborator,
    createCollaborator,
    collaboratorDetails
}



