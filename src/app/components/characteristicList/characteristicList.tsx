import React, { useState } from "react";

import { TCharacteristicsDTO } from "../../../core/models/product";
import DataTable from "../table/table/table";
import { ITableHeadCell, Order } from "../../../core/models/table";

interface ICharacteristicListProps {
  list: TCharacteristicsDTO[];
  rmv: (id: string) => void;
}

const head: ITableHeadCell[] = [
  { name: "name", label: "Tipo", align: "left" },
  { name: "description", label: "Descrição", align: "left" },
  { name: "amount", label: "Quantidade", align: "left" },
  { name: "remove", label: "Remover", align: "right" },
];
function CharacteristicList({ list, rmv }: ICharacteristicListProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");

  return (
    <DataTable
      head={head}
      data={list}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      rmvFunction={(id: string) => rmv(id)}
    />
  );
}

export default CharacteristicList;
