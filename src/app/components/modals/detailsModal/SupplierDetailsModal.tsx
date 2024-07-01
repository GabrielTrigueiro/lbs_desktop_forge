import { TSupplierBody } from "../../../../core/models/supplier";
import DefaultModal from "../defaultModal/defaultModal";
import { Container, InfoValue } from "./styles";
import { InfoCard, InfoCardContainer, InfoCardTitle, InfoKey, InfoRow, InfosSection } from "../../../../app/components/styles";
import { formatDateBr, formatDocument, formatPhoneNumber, formatarCEP } from "../../../../core/utils/globalFunctions";
import { Box } from "@mui/material";


interface ISupplierDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    supplier: TSupplierBody;
}

const SupplierDetailsModal = (props: ISupplierDetailsProps) => {
    const { isOpen, onClose, onOpen, supplier } = props;

    return (
        <>
            <DefaultModal
                title="Detalhes do Fornecedor"
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                children={
                    <Container>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <InfosSection sx={{ flex: 1 }}>
                            <InfoCardContainer>
                                <InfoCardTitle>Informações gerais</InfoCardTitle>
                                <InfoCard>
                                    <InfoRow>
                                        <InfoKey>Nome da compania:</InfoKey>
                                        <InfoValue>{supplier.nameCompany}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Nome do representante:</InfoKey>
                                        <InfoValue>{supplier.nameRepresentative}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Inscrição estadual:</InfoKey>
                                        <InfoValue>{supplier.stateEnrollment}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>CNPJ</InfoKey>
                                        <InfoValue>{formatDocument(supplier.cpforcnpj)}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Criado em:</InfoKey>
                                        <InfoValue>{formatDateBr(supplier.createdAt)}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Última atualização:</InfoKey>
                                        <InfoValue>{formatDateBr(supplier.updateAt)}</InfoValue>
                                    </InfoRow>
                                </InfoCard>
                            </InfoCardContainer>
                        </InfosSection>

                        
                            <InfosSection sx={{ flex: 1 }}>
                                <InfoCardContainer >
                                    <InfoCardTitle>Informações de endereço</InfoCardTitle>
                                    <InfoCard>
                                        <InfoRow>
                                            <InfoKey>CEP:</InfoKey>
                                            <InfoValue>{formatarCEP(supplier.address.zipCode)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>UF:</InfoKey>
                                            <InfoValue>{supplier.address.uf}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Cidade:</InfoKey>
                                            <InfoValue>{supplier.address.city}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Bairro:</InfoKey>
                                            <InfoValue>{supplier.address.neighborhood}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Rua:</InfoKey>
                                            <InfoValue>{supplier.address.road}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Número:</InfoKey>
                                            <InfoValue>{supplier.address.number}</InfoValue>
                                        </InfoRow>
                                    </InfoCard>

                                </InfoCardContainer>
                            </InfosSection>
                            </Box>
                            <InfosSection sx={{ flex: 1 }}>
                                <InfoCardContainer>
                                    <InfoCardTitle>Informações de contatos</InfoCardTitle>
                                    <InfoCard>
                                        <InfoRow>
                                            <InfoKey>Celular 1:</InfoKey>
                                            <InfoValue>{formatPhoneNumber(supplier.contacts.cell_phone1)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Celular 2:</InfoKey>
                                            <InfoValue>{formatPhoneNumber(supplier.contacts.cell_phone2) ?? "--"}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Telefone</InfoKey>
                                            <InfoValue>{formatPhoneNumber(supplier.contacts.telephone) ?? "--"}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Email:</InfoKey>
                                            <InfoValue>{supplier.contacts.email}</InfoValue>
                                        </InfoRow>
                                    </InfoCard>

                                </InfoCardContainer>
                            </InfosSection>
                        
                    </Container>}
            />
        </>
    )
}

export default SupplierDetailsModal