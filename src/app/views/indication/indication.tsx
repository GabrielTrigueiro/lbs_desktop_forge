import { Add } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import DefaultFilter, { ISelectItem } from "../../../app/components/filter/defaultFilter";
import DefaultMenu, { IMenuItemProps } from "../../../app/components/menu/DefaultMenu";
import Search from "../../../app/components/search/Search";
import { PageContentContainer } from "../../../app/components/styles";
import TableHeader from "../../../app/components/table/tableHeader/TableHeader";
import { ITableHeadCell, Order } from "../../../core/models/table";
import theme from "../../../core/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import DataTable from "../../../app/components/table/table/table";
import DataTablePagination from "../../../app/components/table/pagination/pagination";
import { ContentBody } from "../../../app/styles";
import { TIndicationFilterRequest } from "../../../core/models/indication";
import { fecthIndication } from "../../../core/querryes/indication/indicationQuerry";

const head: ITableHeadCell[] = [
  { name: "name", label: "Nome", align: "left" },
  { name: "description", label: "Descrição", align: "left" },
  { name: "active", label: "Ativo", align: "left" },
  { name: "actions2", label: "Opções", align: "left" },
];

const filterItems: ISelectItem[] = [
  { name: "Nome", value: "name", type: "texto" },
];

function Indication() {

  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterModal, setFilterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [idIndication, setIdIndication] = useState<string | undefined>();
  const [indicationFilters, setIndicationFilters] = useState<TIndicationFilterRequest>({
    name: "",
  });

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAccessRowById = (id: string) => {
    setIdIndication(id);
  }

  const menuItems: IMenuItemProps[] = [
    {
      function: () => {
        handleAccessRowById(idIndication || "");
        navigate("/editarIndicacao", { state: { indication: selectedIndication } });
        handleCloseMenu();
      },
      label: "Editar Indicação",
    },
  ];

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["indication", page, rowsPerPage, orderBy, order, indicationFilters],
    queryFn: () =>
      fecthIndication(
        page,
        rowsPerPage,
        orderBy,
        order,
        indicationFilters.name,
      ),
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setCount(data.totalElements);
    }
  }, [isSuccess, data]);

  const removeFilter = (attribute: string) => {
    setIndicationFilters((prevState) => ({
      ...prevState,
      [attribute]: undefined,
    }));
  };

  const selectedIndication = data?.content.find((indication: any) => indication.id === idIndication);

  return (
    <PageContentContainer>
      <TableHeader
        filterBtn
        filterBtnAction={() => setFilterModal(true)}
        filter={indicationFilters}
        remove={removeFilter}
        mainActionFunction={() => navigate("/registrarIndicacao")}
        mainActionLabel="Cadastrar indicação"
        mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
        extraComponents={
          <Search
            searchPlaceHolder="Nome da indicação..."
            querrySearching={isLoading}
            cpf={indicationFilters.name}
            onChange={(e: string | undefined) => setIndicationFilters((prevState) => ({
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
          onChangeFilter={setIndicationFilters}
          onClose={() => setFilterModal(false)}
          onOpen={() => setFilterModal(true)}
          title="Filtrar Indicação"
          changePage={setPage}
        />
      </ContentBody>
    </PageContentContainer>
  );
};

export default Indication