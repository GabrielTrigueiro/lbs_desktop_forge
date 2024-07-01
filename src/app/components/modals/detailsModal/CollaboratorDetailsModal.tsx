import { TCollaboratorBody } from "../../../../core/models/collaborator";
import DefaultModal from "../defaultModal/defaultModal";
import { Container, InfoValue } from "./styles";
import { InfoCard, InfoCardContainer, InfoCardTitle, InfoKey, InfoRow, InfosSection } from "../../../../app/components/styles";
import { Box } from "@mui/material";
import { formatDateBr, formatDocument, formatPhoneNumber, formatRG, formatarCEP } from "../../../../core/utils/globalFunctions";

interface ICollaboratorDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    collaborator: TCollaboratorBody;
}

const CollaboratorDetailsModal = (props: ICollaboratorDetailsProps) => {
    const { isOpen, onClose, onOpen, collaborator } = props;

    return (
        <>
            <DefaultModal
                title="Detalhes do Colaborador"
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
                                            <InfoKey>Nome:</InfoKey>
                                            <InfoValue>{collaborator.name}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>RG: </InfoKey>
                                            <InfoValue>{formatRG(collaborator.rg)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>CPF / CNPJ </InfoKey>
                                            <InfoValue>{formatDocument(collaborator.cpforcnpj)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Data de nascimento:</InfoKey>
                                            <InfoValue>{formatDateBr(collaborator.birthDate)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Criado em:</InfoKey>
                                            <InfoValue>{formatDateBr(collaborator.createdAt)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Última atualização:</InfoKey>
                                            <InfoValue>{formatDateBr(collaborator.updateAt)}</InfoValue>
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
                                            <InfoValue>{formatarCEP(collaborator.address.zipCode)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>UF:</InfoKey>
                                            <InfoValue>{collaborator.address.uf}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Cidade:</InfoKey>
                                            <InfoValue>{collaborator.address.city}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Bairro:</InfoKey>
                                            <InfoValue>{collaborator.address.neighborhood}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Rua:</InfoKey>
                                            <InfoValue>{collaborator.address.road}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Número:</InfoKey>
                                            <InfoValue>{collaborator.address.number}</InfoValue>
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
                                        <InfoValue>{formatPhoneNumber(collaborator.contacts.cell_phone1)}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Celular 2:</InfoKey>
                                        <InfoValue>{formatPhoneNumber(collaborator.contacts.cell_phone2) ?? "--"}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Telefone</InfoKey>
                                        <InfoValue>{formatPhoneNumber(collaborator.contacts.telephone) ?? "--"}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Email:</InfoKey>
                                        <InfoValue>{collaborator.contacts.email}</InfoValue>
                                    </InfoRow>
                                </InfoCard>

                            </InfoCardContainer>
                        </InfosSection>

                    </Container>}
            />
        </>
    )
}

export default CollaboratorDetailsModal