import { CollaboratorService } from "../../../core/api/collaborator/collaboratorService";
import { Order } from "../../../core/models/table";

export const fecthCollaborator = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
    cpforcnpj?: string,
) => {
    return await CollaboratorService.getFiltedCollaborator({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name === "" ? undefined : name,
        cpforcnpj: cpforcnpj,
    });
};