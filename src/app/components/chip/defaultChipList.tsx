import { Box, Chip, Typography } from "@mui/material";
interface IChipListProps {
  filters: any;
  onRemoveFitler: (fiter: string) => void;
}

function DefaultChipList(props: IChipListProps) {
  const { filters, onRemoveFitler } = props;

  return (
    <Box>
      {Object.entries(filters).map(
        ([key, value]) =>
          value !== undefined && value !== '' && key !== "cpforcnpj" && key !== "clientCpforCnpj" && (
            <Chip
              key={key}
              label={<ChipContent label={key} value={value} />}
              onDelete={() => onRemoveFitler(key)}
              style={{ margin: "0.2rem", borderRadius: 5, cursor: "pointer" }}
              sx={{
                ":hover": {
                  background: "#fff",
                  border: "2px solid",
                  borderColor: (props) => props.palette.primary.main,
                },
              }}
            />
          )
      )}
    </Box>
  );
}

export default DefaultChipList;

interface IContentProps {
  label: string;
  type?: string;
  value: unknown;
}

const ChipContent = (props: IContentProps) => {
  function returnLabelByKey(key: string): string {
    switch (key) {
      case "type":
        return "Tipo";
      case "name":
        return "Nome";
      case "coupon":
        return "Cupom";
      case "cpforcnpj":
        return "CPF/CNPJ";
      case "status":
        return "Status";
      case "cameThrough":
        return "Veio por";
      case "typePayment":
        return "T. pagamento";
      case "sellerCpfOrCnpj":
        return "Doc. vendedor";
      case "clientCpforCnpj":
        return "Doc. cliente";
      case "indicationCpforCnpj":
        return "Doc. indicação";
      case "createDate":
        return "Criado em";
      case "sellerId":
        return "Id vendedor";
      default:
        return key;
    }
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Typography style={{ fontWeight: "bold" }}>
        {returnLabelByKey(props.label)}:
      </Typography>
      <Typography>{props.value as string}</Typography>
    </Box>
  );
};
