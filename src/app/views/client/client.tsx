import Add from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import { PageContentContainer } from "../../../app/components/styles";
import DataTablePagination from "../../../app/components/table/pagination/pagination";
import DataTable from "../../../app/components/table/table/table";
import TableHeader from "../../../app/components/table/tableHeader/TableHeader";
import { TClientFilterRequest } from "../../../core/models/clientLBS";
import { ITableHeadCell, Order } from "../../../core/models/table";
import { fecthClients } from "../../../core/querryes/client/clientLbsQuerry";
import theme from "../../../core/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import Search from "../../../app/components/search/Search";
import DefaultFilter, { ISelectItem } from "../../../app/components/filter/defaultFilter";
import DefaultMenu, { IMenuItemProps } from "../../../app/components/menu/DefaultMenu";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import { ClientLbsService } from "../../../core/api/client/clientService";
import ClientDetailsModal from "../../../app/components/modals/detailsModal/ClientDetailsModal";
import { ContentBody } from "../../../app/styles";

const head: ITableHeadCell[] = [
    { name: "name", label: "Nome", align: "left" },
    { name: "rg", label: "RG", align: "left" },
    { name: "cpforcnpj", label: "CPF / CNPJ", align: "left" },
    { name: "createdAt", label: "Criado em", align: "left" },
    { name: "isactive", label: "Ativo", align: "left" },
    { name: "actions2", label: "Opções", align: "left" },
];

const filterItems: ISelectItem[] = [
    { name: "Nome", value: "name", type: "texto" },
    { name: "CPF / CNPJ", value: "cpforCnpj", type: "texto" },
];

function Client() {
    const navigate = useNavigate();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [idClient, setIdClient] = useState<string | undefined>();
    const [details, setDetails] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [filterModal, setFilterModal] = useState(false);

    const [clientFilters, setClientFilters] = useState<TClientFilterRequest>({
        cpforCnpj: "",
        name: undefined
    });

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleConfirmDelete = async () => {
        setDeleteDialog(false);
        if (idClient) {
            return await ClientLbsService.deleteClient(idClient).then((resp) => {
                console.log(resp);
            });
        }

    };

    const menuItems: IMenuItemProps[] = [
        // {
        //     function: () => {
        //         setDeleteDialog(true)
        //         handleAccessRowById(idClient || "");
        //         handleCloseMenu();
        //     },
        //     label: "Deletar cliente",
        // },
        {
            function: () => {
                setDetails(true)
                handleAccessRowById(idClient || "");
                handleCloseMenu();
            },
            label: "Detalhes do cliente",
        },
        {
            function: () => {
                handleAccessRowById(idClient || "");
                navigate("/editarCliente", { state: { client: selectedClient } });
                handleCloseMenu();
            },
            label: "Editar cliente",
        },
    ];

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["clients", page, rowsPerPage, orderBy, order, clientFilters],
        queryFn: () =>
            fecthClients(
                page,
                rowsPerPage,
                orderBy,
                order,
                clientFilters.name,
                clientFilters.cpforCnpj,
            ),
        staleTime: Infinity,
    });

    useEffect(() => {
        if (isSuccess && data) {
            setCount(data.totalElements);
        }
    }, [isSuccess, data]);

    const removeFilter = (attribute: string) => {
        setClientFilters((prevState) => ({
            ...prevState,
            [attribute]: undefined,
        }));
    };

    const handleAccessRowById = (id: string) => {
        setIdClient(id);
    };

    const selectedClient = data?.content.find((client: any) => client.id === idClient);

    return (
        <PageContentContainer>
            <TableHeader
                filterBtn
                filterBtnAction={() => setFilterModal(true)}
                filter={clientFilters}
                remove={removeFilter}
                mainActionFunction={() => navigate("/registrarCliente")}
                mainActionLabel="Cadastrar cliente"
                mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
                extraComponents={
                    <Search
                        searchPlaceHolder="Cpf ou cnpj do cliente..."
                        querrySearching={isLoading}
                        cpf={clientFilters.cpforCnpj}
                        onChange={(e: string | undefined) => setClientFilters((prevState) => ({
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
                {selectedClient && details && (
                    <ClientDetailsModal
                        client={selectedClient}
                        isOpen={details}
                        onClose={() => setDetails(false)}
                        onOpen={() => setDetails(true)}
                    />
                )}
                {/* <DefaultDialog
                    confirmAction={handleConfirmDelete}
                    isOpen={deleteDialog}
                    title='Deletar Cliente'
                    onCloseAction={() => setDeleteDialog(false)}
                    body={
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography>Deseja realmente deletar o cliente:</Typography>
                            <Typography sx={{ fontWeight: "bold" }}>{selectedClient?.name}</Typography>
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
                    items={filterItems}
                    onChangeFilter={setClientFilters}
                    onClose={() => setFilterModal(false)}
                    onOpen={() => setFilterModal(true)}
                    title="Filtrar Clientes"
                    changePage={setPage}
                />
            </ContentBody>
        </PageContentContainer>
    );
}

export default Client;
