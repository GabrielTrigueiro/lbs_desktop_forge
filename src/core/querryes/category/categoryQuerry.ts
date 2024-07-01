import { CategoryService } from "../../../core/api/category/categoryService";
import { Order } from "../../../core/models/table";

export const fecthCategory = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
) => {
    return await CategoryService.getFiltedCategory({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name === "" ? undefined : name,
    });
};