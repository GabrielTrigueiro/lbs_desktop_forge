import { CollectionService } from "../../../core/api/collection/collectionService";
import { Order } from "../../../core/models/table";

export const fecthCollection = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
) => {
    return await CollectionService.getFiltedCollection({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name === "" ? undefined : name
    });
};