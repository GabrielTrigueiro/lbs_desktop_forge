import { SupplierService } from "../../../core/api/supplier/supplierService";
import { Order } from "../../../core/models/table";
import { removeNonNumeric } from "../../../core/utils/globalFunctions";


export const fecthSupplier = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    nameRepresentative?: string,
    cpforCnpj?: string
) => {
    return await SupplierService.getFiltedSupplier({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        nameRepresentative: nameRepresentative,
        cpforCnpj: cpforCnpj === "" ? undefined : removeNonNumeric(cpforCnpj)
    });
};