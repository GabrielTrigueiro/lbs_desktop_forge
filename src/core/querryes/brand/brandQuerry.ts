import { BrandService } from "../../../core/api/brand/brandService";
import { Order } from "../../../core/models/table";

export const fecthBrand = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
) => {
    return await BrandService.getFiltedBrand({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name === "" ? undefined : name,
    });
};