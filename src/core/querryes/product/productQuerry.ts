import { ProductService } from "../../../core/api/product/productService";
import { Order } from "../../../core/models/table";


export const fecthProduct = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
    amount?: number,
    sku?: string,
    active?: boolean,

) => {
    return await ProductService.getFiltedProduct({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name === "" ? undefined : name,
        amount: amount,
        sku: sku,
        active: active,
    });
};