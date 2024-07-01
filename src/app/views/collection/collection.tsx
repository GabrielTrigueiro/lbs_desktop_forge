import { Add } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import DefaultFilter, { ISelectItem } from "../../../app/components/filter/defaultFilter";
import DefaultMenu, { IMenuItemProps } from "../../../app/components/menu/DefaultMenu";
import Search from "../../../app/components/search/Search";
import { PageContentContainer } from "../../../app/components/styles";
import DataTable from "../../../app/components/table/table/table";
import TableHeader from "../../../app/components/table/tableHeader/TableHeader";
import { ContentBody } from "../../../app/styles";
import { ITableHeadCell, Order } from "../../../core/models/table";
import theme from "../../../core/theme/theme";
import { useEffect, useState } from "react";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import { useNavigate } from "react-router-dom";
import DataTablePagination from "../../../app/components/table/pagination/pagination";
import { fecthCollection } from "../../../core/querryes/collection/collectionQuerry";
import { useQuery } from "@tanstack/react-query";
import { TCollectionFilterRequest } from "../../../core/models/collection";

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


function Collection() {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterModal, setFilterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [idCollection, setIdCollection] = useState<string | undefined>();
  const [collectionFilters, setCollectionFilters] = useState<TCollectionFilterRequest>({
      name: "",
  });

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
      setAnchorEl(null);
  };

  const handleAccessRowById = (id: string) => {
      setIdCollection(id);
  }



  const menuItems: IMenuItemProps[] = [
      {
          function: () => {
              handleAccessRowById(idCollection || "");
              navigate("/editarColecao", { state: { collection: selectedCollection } });
              handleCloseMenu();
          },
          label: "Editar coleção",
      },
  ];



  const { data, isLoading, isSuccess } = useQuery({
      queryKey: ["collection", page, rowsPerPage, orderBy, order, collectionFilters],
      queryFn: () =>
          fecthCollection(
              page,
              rowsPerPage,
              orderBy,
              order,
              collectionFilters.name,
          ),
      staleTime: Infinity,
  })


  useEffect(() => {
      if (isSuccess && data) {
          setCount(data.totalElements);
      }
  }, [isSuccess, data]);


  const removeFilter = (attribute: string) => {
      setCollectionFilters((prevState) => ({
          ...prevState,
          [attribute]: undefined,
      }));
  };

  const selectedCollection = data?.content.find((collection: any) => collection.id === idCollection);
  return (
      <PageContentContainer>
          <TableHeader
              filterBtn
              filterBtnAction={() => setFilterModal(true)}
              filter={collectionFilters}
              remove={removeFilter}
              mainActionFunction={() => navigate("/registrarColecao")}
              mainActionLabel="Cadastrar coleção"
              mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
              extraComponents={
                  <Search
                      searchPlaceHolder="Nome da coleção..."
                      querrySearching={isLoading}
                      cpf={collectionFilters.name}
                      onChange={(e: string | undefined) => setCollectionFilters((prevState) => ({
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
                  onChangeFilter={setCollectionFilters}
                  onClose={() => setFilterModal(false)}
                  onOpen={() => setFilterModal(true)}
                  title="Filtrar coleção"
                  changePage={setPage}
              />
          </ContentBody>
      </PageContentContainer>
  );
};

export default Collection