import { LogoBitBee, FooterContainer, InfoFooter } from "./styles";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <FooterContainer>
      <InfoFooter>
        <Typography sx={{ fontSize: "0.9pc" }}>
          V2.0 Desenvolvido por{" "}
        </Typography>
        <LogoBitBee />
      </InfoFooter>
    </FooterContainer>
  );
};

export default Footer;
