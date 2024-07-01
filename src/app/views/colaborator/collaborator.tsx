import { Add } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import DefaultFilter, { ISelectItem } from "../../../app/components/filter/defaultFilter";
import Search from "../../../app/components/search/Search";
import { PageContentContainer } from "../../../app/components/styles";
import TableHeader from "../../../app/components/table/tableHeader/TableHeader";
import { TCollaboratorFilterRequest } from "../../../core/models/collaborator";
import { ITableHeadCell, Order } from "../../../core/models/table";
import { fecthCollaborator } from "../../../core/querryes/collaborator/collaboratorQuerry";
import theme from "../../../core/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import DataTable from "../../../app/components/table/table/table";
import DataTablePagination from "../../../app/components/table/pagination/pagination";
import DefaultMenu, { IMenuItemProps } from "../../../app/components/menu/DefaultMenu";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import CollaboratorDetailsModal from "../../../app/components/modals/detailsModal/CollaboratorDetailsModal";
import { CollaboratorService } from "../../../core/api/collaborator/collaboratorService";
import { ContentBody } from "../../../app/styles";


const head: ITableHeadCell[] = [
    { name: "name", label: "Nome", align: "left" },
    { name: "rg", label: "RG", align: "left" },
    { name: "cpforcnpj", label: "CPF", align: "left" },
    { name: "createdAt", label: "Criado em", align: "left" },
    { name: "actions2", label: "Opções", align: "left" },
];

const filterItems: ISelectItem[] = [
    { name: "Nome", value: "name", type: "texto" },
    { name: "CPF", value: "cpforcnpj", type: "texto" },
];

function Collaborator() {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [filterModal, setFilterModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [idCollaborator, setIdCollaborator] = useState<string | undefined>();
    const [details, setDetails] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [collaboratorFilters, setCollaboratorFilters] = useState<TCollaboratorFilterRequest>({
        name: undefined,
        cpforcnpj: "",
    });

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAccessRowById = (id: string) => {
        setIdCollaborator(id);
    }

    const handleConfirmDelete = async () => {
        setDeleteDialog(false);
        if (idCollaborator) {
            return await CollaboratorService.deleteCollaborator(idCollaborator).then((resp) => {
            });
        }

    };


    const menuItems: IMenuItemProps[] = [
        // {
        //     function: () => {
        //         setDeleteDialog(true)
        //         handleAccessRowById(idCollaborator || "");
        //         handleCloseMenu();
        //     },
        //     label: "Deletar colaborador",
        // },
        {
            function: () => {
                setDetails(true)
                handleAccessRowById(idCollaborator || "");
                handleCloseMenu();
            },
            label: "Detalhes do colaborador",
        },
        {
            function: () => {
                handleAccessRowById(idCollaborator || "");
                navigate("/editarColaborador", { state: { collaborator: selectedCollaborator } });
                handleCloseMenu();
            },
            label: "Editar colaborador",
        },
    ];



    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["collaborator", page, rowsPerPage, orderBy, order, collaboratorFilters],
        queryFn: () =>
            fecthCollaborator(
                page,
                rowsPerPage,
                orderBy,
                order,
                collaboratorFilters.name,
                collaboratorFilters.cpforcnpj,
            ),
        staleTime: Infinity,
    })


    useEffect(() => {
        if (isSuccess && data) {
            setCount(data.totalElements);
        }
    }, [isSuccess, data]);


    const removeFilter = (attribute: string) => {
        setCollaboratorFilters((prevState) => ({
            ...prevState,
            [attribute]: undefined,
        }));
    };

    const selectedCollaborator = data?.content.find((collaborator: any) => collaborator.id === idCollaborator);

    return (
        <PageContentContainer>
            <TableHeader
                filterBtn
                filterBtnAction={() => setFilterModal(true)}
                filter={collaboratorFilters}
                remove={removeFilter}
                mainActionFunction={() => navigate("/registrarColaborador")}
                mainActionLabel="Cadastrar colaborador"
                mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
                extraComponents={
                    <Search
                        searchPlaceHolder="Cpf ou cnpj do colaborador"
                        querrySearching={isLoading}
                        cpf={collaboratorFilters.cpforcnpj}
                        onChange={(e: string | undefined) => setCollaboratorFilters((prevState) => ({
                            ...prevState,
                            cpforcnpj: e,
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
                        accessRowById={handleAccessRowById}
                        menu={
                            <Tooltip title="Opções">
                                <IconButton onClick={handleClickMenu}>
                                    <MoreHorizRounded />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                <DefaultMenu
                    anchor={anchorEl}
                    menuItems={menuItems}
                    onClose={handleCloseMenu}
                    status={open}
                />
                {selectedCollaborator && details && (
                    <CollaboratorDetailsModal
                        collaborator={selectedCollaborator}
                        isOpen={details}
                        onClose={() => setDetails(false)}
                        onOpen={() => setDetails(true)}
                    />
                )}
                {/* <DefaultDialog
                    confirmAction={handleConfirmDelete}
                    isOpen={deleteDialog}
                    title='Deletar Colaborador'
                    onCloseAction={() => setDeleteDialog(false)}
                    body={
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography>Deseja realmente deletar o colaborador:</Typography>
                            <Typography sx={{ fontWeight: "bold" }}>{selectedCollaborator?.name}</Typography>
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
                    onChangeFilter={setCollaboratorFilters}
                    onClose={() => setFilterModal(false)}
                    onOpen={() => setFilterModal(true)}
                    title="Filtrar colaborador"
                    changePage={setPage}
                />
            </ContentBody>
        </PageContentContainer>
    );
};

export default Collaborator;