import { ClientLbsService } from "../../../core/api/client/clientService";
import { Order } from "../../../core/models/table";
import { removeNonNumeric } from "../../../core/utils/globalFunctions";


export const fecthClients = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
    cpforCnpj?: string,
) => {
    return await ClientLbsService.getFiltedClient({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name,
        cpforCnpj: removeNonNumeric(cpforCnpj),
    });
};