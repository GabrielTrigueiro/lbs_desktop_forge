import { useQuery } from "@tanstack/react-query";
import DefaultFilter, { ISelectItem } from "../../../app/components/filter/defaultFilter";
import Search from "../../../app/components/search/Search";
import { PageContentContainer } from "../../../app/components/styles";
import TableHeader from "../../../app/components/table/tableHeader/TableHeader";
import { TSupplierFilterRequest } from "../../../core/models/supplier";
import { ITableHeadCell, Order } from "../../../core/models/table";
import { fecthSupplier } from "../../../core/querryes/supplier/supplierQuerry";
import theme from "../../../core/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Spinner from "../../../app/components/spinner/spinner";
import { Add } from "@mui/icons-material";
import DataTable from "../../../app/components/table/table/table";
import DataTablePagination from "../../../app/components/table/pagination/pagination";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import DefaultMenu, { IMenuItemProps } from "../../../app/components/menu/DefaultMenu";
import { SupplierService } from "../../../core/api/supplier/supplierService";
import SupplierDetailsModal from "../../../app/components/modals/detailsModal/SupplierDetailsModal";
import DefaultDialog from "../../../app/components/defaultDialog/defaultDialog";
import { ContentBody } from "../../styles";


const head: ITableHeadCell[] = [
    { name: "cpforcnpj", label: "CNPJ", align: "left" },
    { name: "nameRepresentative", label: "Nome do representante", align: "left" },
    { name: "nameCompany", label: "Nome da compania", align: "left" },
    { name: "isactive", label: "Ativo", align: "left" },
    { name: "actions2", label: "Opções", align: "left" },
];

const items: ISelectItem[] = [
    { name: "Nome do representante", value: "nameRepresentative", type: "texto" },
];


function Supplier() {
    const navigate = useNavigate();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [filterModal, setFilterModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [idSupplier, setIdSupplier] = useState<string | undefined>();
    const [details, setDetails] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [supplierFilters, setSupplierFilters] = useState<TSupplierFilterRequest>({
        nameRepresentative: undefined,
        cpforCnpj: "",
    });

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleConfirmDelete = async () => {
        setDeleteDialog(false);
        if (idSupplier) {
            return await SupplierService.deleteSupplier(idSupplier).then((resp) => {
                console.log(resp);
            });
        }

    };

    const menuItems: IMenuItemProps[] = [
        // {
        //     function: () => {
        //         setDeleteDialog(true)
        //         handleAccessRowById(idSupplier || "");
        //         handleCloseMenu();
        //     },
        //     label: "Deletar fornecedor",
        // },
        {
            function: () => {
                setDetails(true)
                handleAccessRowById(idSupplier || "");
                handleCloseMenu();
            },
            label: "Detalhes do fornecedor",
        },
        {
            function: () => {
                handleAccessRowById(idSupplier || "");
                navigate("/editarFornecedor", { state: { supplier: selectedSupplier } });
                handleCloseMenu();
            },
            label: "Editar fornecedor",
        },
    ];

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["supplier", page, rowsPerPage, orderBy, order, supplierFilters],
        queryFn: () =>
            fecthSupplier(
                page,
                rowsPerPage,
                orderBy,
                order,
                supplierFilters.nameRepresentative,
                supplierFilters.cpforCnpj,
            ),
        staleTime: Infinity,
    })


    useEffect(() => {
        if (isSuccess && data) {
            setCount(data.totalElements);
        }
    }, [isSuccess, data]);


    const removeFilter = (attribute: string) => {
        setSupplierFilters((prevState) => ({
            ...prevState,
            [attribute]: undefined,
        }));
    };

    const handleAccessRowById = (id: string) => {
        setIdSupplier(id);
    };

    const selectedSupplier = data?.content.find((supplier: any) => supplier.id === idSupplier);

    return (
        <PageContentContainer>
            <TableHeader
                filterBtn
                filterBtnAction={() => setFilterModal(true)}
                filter={supplierFilters}
                remove={removeFilter}
                mainActionFunction={() => navigate("/registrarFornecedor")}
                mainActionLabel="Cadastrar fornecedor"
                mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
                extraComponents={
                    <Search
                        searchPlaceHolder="CNPJ do representante"
                        querrySearching={isLoading}
                        cpf={supplierFilters.cpforCnpj}
                        onChange={(e: string | undefined) => setSupplierFilters((prevState) => ({
                            ...prevState,
                            cpforCnpj: e,
                        }))}
                    />
                }
            />
            <ContentBody>
                    <DataTable
                        head={head}
                        data={data?.content}
                        order={order}
                        orderBy={orderBy}
                        setOrder={setOrder}
                        setOrderBy={setOrderBy}
                        isLoading={isLoading}
                        menu={
                            <Tooltip title="Opções">
                                <IconButton onClick={handleClickMenu}>
                                    <MoreHorizRounded />
                                </IconButton>
                            </Tooltip>
                        }
                        accessRowById={handleAccessRowById}
                    />
                <DefaultMenu
                    anchor={anchorEl}
                    menuItems={menuItems}
                    onClose={handleCloseMenu}
                    status={open}
                />
                {selectedSupplier && details && (
                    <SupplierDetailsModal
                        supplier={selectedSupplier}
                        isOpen={details}
                        onClose={() => setDetails(false)}
                        onOpen={() => setDetails(true)}
                    />
                )}
                {/* <DefaultDialog
                    confirmAction={handleConfirmDelete}
                    isOpen={deleteDialog}
                    title='Deletar Fornecedor'
                    onCloseAction={() => setDeleteDialog(false)}
                    body={
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography>Deseja realmente deletar o fornecedor:</Typography>
                            <Typography sx={{ fontWeight: "bold" }}>{selectedSupplier?.nameCompany}</Typography>
                        </Box>
                    }
                /> */}
                <DataTablePagination
                    setPage={setPage}
                    page={page}
                    setRowsPerPage={setRowsPerPage}
                    rowsPerPage={rowsPerPage}
                    count={count}
                />
                <DefaultFilter
                    isOpen={filterModal}
                    items={items}
                    onChangeFilter={setSupplierFilters}
                    onClose={() => setFilterModal(false)}
                    onOpen={() => setFilterModal(true)}
                    title="Filtrar Fornecedor"
                    changePage={setPage}
                />
            </ContentBody>
        </PageContentContainer>
    )
}

export default Supplier