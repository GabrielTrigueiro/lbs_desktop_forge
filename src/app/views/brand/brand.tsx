import { Add } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import DefaultFilter, { ISelectItem } from "../../../app/components/filter/defaultFilter";
import DefaultMenu, { IMenuItemProps } from "../../../app/components/menu/DefaultMenu";
import Search from "../../../app/components/search/Search";
import { PageContentContainer } from "../../../app/components/styles";
import TableHeader from "../../../app/components/table/tableHeader/TableHeader";
import { TBrandFilterRequest } from "../../../core/models/brand";
import { ITableHeadCell, Order } from "../../../core/models/table";
import { fecthBrand } from "../../../core/querryes/brand/brandQuerry";
import theme from "../../../core/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import DataTable from "../../../app/components/table/table/table";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import DataTablePagination from "../../../app/components/table/pagination/pagination";
import { ContentBody } from "../../../app/styles";



const head: ITableHeadCell[] = [
    { name: "name", label: "Nome", align: "left" },
    { name: "description", label: "Descrição", align: "left" },
    { name: "createdAt", label: "Criado em", align: "left" },
    { name: "active", label: "Ativo", align: "left" },
    { name: "actions2", label: "Opções", align: "left" },
];

const filterItems: ISelectItem[] = [
    { name: "Nome", value: "name", type: "texto" },
];

const Brand = () => { 
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [filterModal, setFilterModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [idBrand, setIdBrand] = useState<string | undefined>();
    const [brandFilters, setBrandFilters] = useState<TBrandFilterRequest>({
        name: "",
    });

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAccessRowById = (id: string) => {
        setIdBrand(id);
    }



    const menuItems: IMenuItemProps[] = [
        {
            function: () => {
                handleAccessRowById(idBrand || "");
                navigate("/editarMarca", { state: { brand: selectedBrand } });
                handleCloseMenu();
            },
            label: "Editar Marca",
        },
    ];



    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["brand", page, rowsPerPage, orderBy, order, brandFilters],
        queryFn: () =>
            fecthBrand(
                page,
                rowsPerPage,
                orderBy,
                order,
                brandFilters.name,
            ),
        staleTime: Infinity,
    })


    useEffect(() => {
        if (isSuccess && data) {
            setCount(data.totalElements);
        }
    }, [isSuccess, data]);


    const removeFilter = (attribute: string) => {
        setBrandFilters((prevState) => ({
            ...prevState,
            [attribute]: undefined,
        }));
    };

    const selectedBrand = data?.content.find((brand: any) => brand.id === idBrand);
    return (
        <PageContentContainer>
            <TableHeader
                filterBtn
                filterBtnAction={() => setFilterModal(true)}
                filter={brandFilters}
                remove={removeFilter}
                mainActionFunction={() => navigate("/registrarMarca")}
                mainActionLabel="Cadastrar marca"
                mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
                extraComponents={
                    <Search
                        searchPlaceHolder="Nome da marca..."
                        querrySearching={isLoading}
                        cpf={brandFilters.name}
                        onChange={(e: string | undefined) => setBrandFilters((prevState) => ({
                            ...prevState,
                            name: e,
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
                    onChangeFilter={setBrandFilters}
                    onClose={() => setFilterModal(false)}
                    onOpen={() => setFilterModal(true)}
                    title="Filtrar marca"
                    changePage={setPage}
                />
            </ContentBody>
        </PageContentContainer>
    );
}

export default Brand