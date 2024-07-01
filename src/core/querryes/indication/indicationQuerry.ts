import { IndicationService } from "../../../core/api/indication/indicationService";
import { Order } from "../../../core/models/table";

export const fecthIndication = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
) => {
    return await IndicationService.getFiltedIndication({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name
    });
};