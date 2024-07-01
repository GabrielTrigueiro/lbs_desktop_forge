import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../../core/theme/theme";

interface Props {
  title: string;
  children: React.ReactNode;
}

const FormCard = ({ children, title }: Readonly<Props>) => {
  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: theme.COLORS.BLUE2,
        borderRadius: 2,
        padding: "0pc 1pc 1pc 1pc",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        margin={"1pc 0pc 1pc 0pc"}
        color={theme.COLORS.BLUE3}
        fontSize={theme.FONTS_SIZE.LG}
        fontWeight={"bold"}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default FormCard;
