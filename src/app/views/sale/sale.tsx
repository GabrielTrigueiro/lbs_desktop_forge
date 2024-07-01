import { Box } from "@mui/material";

import theme from "../../../core/theme/theme";
import SaleSearch from "../../../app/components/saleSearch/SaleSearch";
import { SaleList } from "../../components/saleList/SaleList";
import { SaleInfos } from "../../components/saleInfos/SaleInfos";

export const initialSale: TSaleRequest = {
  clientId: 0,
  collaboratorId: 0,
  caixaId: 0,
  amount: 0,
  status: "PENDENTE",
  typeItemSales: "REVENDA",
  paymentMethods: [],
  productDTOs: [],
};

export type TSalePrices = "VAREJO" | "REVENDA";

export type TPaymentMethodSale = {
  id: number;
  value: number;
  name: string;
};

export type TCharacteristisRequest = {
  id: number;
  amountProductCharacteristics: number;
};

type TProductSale = {
  productId: number;
  amount: number;
  productCharacteristcsDTOs: TCharacteristisRequest[];
};

export type TSaleRequest = {
  clientId: number;
  collaboratorId: number;
  caixaId: number;
  amount: number;
  status: string;
  typeItemSales: TSalePrices;
  paymentMethods: TPaymentMethodSale[];
  productDTOs: TProductSale[];
};

// tipos para controlar a lista de compras
export type TProductCharacteristics = {
  id: number;
  amount: number;
  description: string;
  characteristics: {
    id: number;
    name: string;
    description: string;
  };
};
//teste
export type TListItem = {
  id: string;
  image?: any;
  productId?: number;
  priceTag?: number;
  resalePrice?: number;
  productName?: string;
  quantity: number;
  caracteristicsInfos: TProductCharacteristics[];
  caracteristicsRequest: TCharacteristisRequest[];
};

export const Sale = () => {
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: theme.COLORS.GRAY6,
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          minWidth: 800,
        }}
      >
        <SaleSearch/>

        <SaleList/>
      </Box>
      <SaleInfos/>
    </Box>
  );
};