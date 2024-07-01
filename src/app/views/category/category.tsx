import { Add } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import DefaultFilter, { ISelectItem } from "../../../app/components/filter/defaultFilter";
import DefaultMenu, { IMenuItemProps } from "../../../app/components/menu/DefaultMenu";
import Search from "../../../app/components/search/Search";
import { PageContentContainer } from "../../../app/components/styles";
import TableHeader from "../../../app/components/table/tableHeader/TableHeader";
import { TCategoryFilterRequest } from "../../../core/models/category";
import { ITableHeadCell, Order } from "../../../core/models/table";
import { fecthCategory } from "../../../core/querryes/category/categoryQuerry";
import theme from "../../../core/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import DataTable from "../../../app/components/table/table/table";
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

function Category() {
    const navigate = useNavigate();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [filterModal, setFilterModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [idCategory, setIdCategory] = useState<string | undefined>();
    const [categoryFilters, setCategoryFilters] = useState<TCategoryFilterRequest>({
        name: "",
    });

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAccessRowById = (id: string) => {
        setIdCategory(id);
    }



    const menuItems: IMenuItemProps[] = [
        {
            function: () => {
                handleAccessRowById(idCategory || "");
                navigate("/editarCategoria", { state: { category: selectedCategory } });
                handleCloseMenu();
            },
            label: "Editar categoria",
        },
    ];



    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["category", page, rowsPerPage, orderBy, order, categoryFilters],
        queryFn: () =>
            fecthCategory(
                page,
                rowsPerPage,
                orderBy,
                order,
                categoryFilters.name,
            ),
        staleTime: Infinity,
    })


    useEffect(() => {
        if (isSuccess && data) {
            setCount(data.totalElements);
        }
    }, [isSuccess, data]);


    const removeFilter = (attribute: string) => {
        setCategoryFilters((prevState) => ({
            ...prevState,
            [attribute]: undefined,
        }));
    };

    const selectedCategory = data?.content.find((category: any) => category.id === idCategory);
    return (
        <PageContentContainer>
            <TableHeader
                filterBtn
                filterBtnAction={() => setFilterModal(true)}
                filter={categoryFilters}
                remove={removeFilter}
                mainActionFunction={() => navigate("/registrarCategoria")}
                mainActionLabel="Cadastrar categoria"
                mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
                extraComponents={
                    <Search
                        searchPlaceHolder="Nome da categoria..."
                        querrySearching={isLoading}
                        cpf={categoryFilters.name}
                        onChange={(e: string | undefined) => setCategoryFilters((prevState) => ({
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
                    onChangeFilter={setCategoryFilters}
                    onClose={() => setFilterModal(false)}
                    onOpen={() => setFilterModal(true)}
                    title="Filtrar categoria"
                    changePage={setPage}
                />
            </ContentBody>
        </PageContentContainer>
    );
};

export default Category