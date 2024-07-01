import { Chart, GoogleChartWrapperChartType } from "react-google-charts";
import Spinner from "../spinner/spinner";
import { Box, Paper, Typography } from "@mui/material";

interface IChartProps {
  chartType: GoogleChartWrapperChartType;
  data: any;
  charTitle: any;
  width: string;
  height: string;
  typeReq: TChartReqType;
  fetchingData: boolean;
  fullWidth?: boolean;
  dataRange?: string;
}

type TChartReqType =
  | "Boletos"
  | "Pix"
  | "Sales"
  | "SalesMonth"
  | "SalesStatus"
  | "SalesLiquidadas";
type TChartHeader = string[];
type TChartInfos = [a: string, b: number];
type TChartData = [TChartHeader, ...TChartInfos[]];
type TSalesMonthChartValues = {
  month: string;
  salesAmount: number;
  salesAmountLiqui: number;
};
type TSalesStatusChartValues = {
  status: string;
  total_vendas: number;
};
type TPixStatusChartValues = {
  status: string;
  total_pix: number;
};
type TBoletosStatusChartValues = {
  status: string;
  total_boletos: number;
};
type TListSalesLiquidadas = {
  name: string;
  salesAmountPix: number;
  salesAmountBoleto: number;
  sale_total: number;
};

function FormatFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatChartData(data: any[] | any, type: TChartReqType): TChartData {
  let header: TChartHeader = [];
  let infos: TChartInfos[] = [];
  let formatedData: TChartData;

  switch (type) {
    case "Boletos":
      header = ["Status", "Total"];
      infos = data.map((item: TBoletosStatusChartValues) => [
        FormatFirstLetter(item.status),
        item.total_boletos,
      ]);
      break;
    case "SalesLiquidadas":
      header = ["Nome", "Boletos", "Pix", "Total"];
      infos = data.listMonth.map((item: TListSalesLiquidadas) => [
        item.name,
        item.salesAmountBoleto,
        item.salesAmountPix,
        item.salesAmountBoleto + item.salesAmountPix,
      ]);
      break;
    case "Pix":
      header = ["Status", "Total"];
      infos = data.map((item: TPixStatusChartValues) => [
        FormatFirstLetter(item.status),
        item.total_pix,
      ]);
      break;
    case "Sales":
      header = ["Status", "Total"];
      infos = data.map((item: TBoletosStatusChartValues) => [
        FormatFirstLetter(item.status),
        item.total_boletos,
      ]);
      break;
    case "SalesMonth":
      header = ["Mês", "Cadastrados", "Liquidados"];
      infos = data.salesMonthData.listMonth.map((item: any, index: number) => [
        FormatFirstLetter(item.month),
        item.salesAmount,
        data.listSalesLiquiMonthData.listMonth[index].salesAmountLiqui || 0,
      ]);
      break;
    case "SalesStatus":
      header = ["Status", "Total"];
      infos = data.map((item: TSalesStatusChartValues) => [
        FormatFirstLetter(item.status.replace("_", " ")),
        item.total_vendas,
      ]);
      break;
  }
  return (formatedData = [header, ...infos]);
}

const DisplayCharts = (props: IChartProps) => {
  const {
    chartType,
    data,
    height,
    charTitle,
    width,
    typeReq,
    fetchingData,
    dataRange,
    fullWidth,
  } = props;

  const options = {
    title: charTitle,
  };

  const tableChartOptions = {
    title: "User Chart",
    width: "100%",
    displayExactValues: true,
    showRowNumber: false,
    allowHtml: true,
    is3D: true,
    cssClassNames: {
      headerRow: "tableChartHeaderRow",
      hoverTableRow: "tableChartHeaderRowHighlightedState",
    },
  };

  return fetchingData ? (
    <Box sx={{ height: height, width: width, display: "flex" }}>
      <Spinner state={fetchingData} css={{ margin: "auto" }} />
    </Box>
  ) : !data ? (
    <>n tem nada</>
  ) : (
    <Paper
      sx={{
        flex: 1,
        padding: "1%",
        width: fullWidth ? "100%" : "40svw",
        margin: "0.1%",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <>
        <Chart
          chartType={chartType}
          data={formatChartData(data, typeReq)}
          options={chartType === "Table" ? tableChartOptions : options}
          height={height}
          width={width}
        />
      </>
    </Paper>
  );
};

export default DisplayCharts;
