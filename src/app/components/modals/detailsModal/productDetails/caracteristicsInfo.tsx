import { Box } from "@mui/material";
import { InfoColumn, InfoValue } from "../styles";

import { TProductCharacteristics } from "../../../../../core/models/product"
import theme from "../../../../../core/theme/theme";
import { InfoKey } from "../../../../../app/components/styles";

interface ICaracteristicsProps {
    caracteritics: TProductCharacteristics;
}

const CaracteristicsInfo = (props: ICaracteristicsProps) => {
    const { caracteritics } = props;

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "start",
                    background: theme.COLORS.GRAY6,
                    borderRadius: 1,
                    padding: "0.3rem 0.5rem",
                }}
            >
                <InfoColumn>
                    <InfoKey>Nome</InfoKey>
                    <InfoValue>{caracteritics.characteristics.name}</InfoValue>
                </InfoColumn>
                <InfoColumn sx={{ alignSelf: "center" }}>
                    <InfoKey>Quantidade</InfoKey>
                    <InfoValue sx={{ textAlign: "center" }}>{caracteritics.amount}</InfoValue>
                </InfoColumn>
                <InfoColumn>
                    <InfoKey>Descrição</InfoKey>
                    <InfoValue>{caracteritics.characteristics.description}</InfoValue>
                </InfoColumn>
                <InfoColumn>
                    <InfoKey>Variante</InfoKey>
                    <InfoValue>{caracteritics.description}</InfoValue>
                </InfoColumn>
            </Box>
        </>
    )
}

export default CaracteristicsInfo