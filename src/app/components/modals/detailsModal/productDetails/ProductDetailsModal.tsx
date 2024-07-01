import DefaultModal from "../../defaultModal/defaultModal";
import { InfoValue, PaymentList, PaymentListContainer, PaymentSection } from "../styles";
import { InfoCard, InfoCardContainer, InfoCardTitle, InfoKey, InfoRow, InfosSection } from "../../../../../app/components/styles";
import { formatCurrencyBR, formatDateBr } from "core/utils/globalFunctions";
import { Box, CircularProgress } from "@mui/material";
import { TProductBody } from "core/models/product";
import theme from "core/theme/theme";
import { useEffect, useState } from "react";
import { ProductService } from "core/api/product/productService";
import CaracteristicsInfo from "./caracteristicsInfo";

interface TProductDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    product: TProductBody;
}

const ProductDetailsModal = (props: TProductDetailsProps) => {
    const { isOpen, onClose, onOpen, product } = props;
    const [loadingImages, setLoadingImages] = useState(true);
    const [images, setImages] = useState<string[]>([]);

    // ? carrega as imagens 
    useEffect(() => {
        const fetchImages = async () => {
            if (isOpen) {
                setLoadingImages(true);
                try {
                    const imagePromises = product.images.map(image => ProductService.getImage(image.id));
                    const imageResponses = await Promise.all(imagePromises);
                    const imageData = imageResponses.map(response => `data:image/png;base64,${response}`);
                    setImages(imageData);
                } catch (error) {
                    console.error("Error fetching images", error);
                } finally {
                    setLoadingImages(false);
                }
            }
        };

        fetchImages();
    }, [isOpen, product.images]);

    return (
        <>
            <DefaultModal
                title="Detalhes do produto"
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                children={
                    <Box sx={{ margin: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{
                            display: "flex", flexDirection: "row", flex: 1, minHeight: "190px",
                            gap: 1,
                            justifyContent: "space-around", alignItems: "center",
                            marginBottom: product.productCharacteristics.length > 0 ? "0rem" : "1rem"
                        }}>
                            {loadingImages ? (
                                <CircularProgress />
                            ) : (
                                images.map((image, index) => (
                                    <Box sx={{
                                        border: "2px solid", borderColor: theme.COLORS.YELLOW2
                                        , width: "190px", height: "190px", borderRadius: "5px"
                                    }}>
                                        <img key={index} src={image} alt={`Product Image ${index + 1}`} width={"100%"} height={"100%"} style={{ borderRadius: "3px" }} />

                                    </Box>
                                ))
                            )}
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", flex: 3 }}>
                            <InfosSection>
                                <InfoCardContainer>
                                    <InfoCardTitle>Informações do produto</InfoCardTitle>
                                    <InfoCard>
                                        <InfoRow>
                                            <InfoKey>Preço de custo</InfoKey>
                                            <InfoValue>{formatCurrencyBR(product.priceCost)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Preço de etiqueta:</InfoKey>
                                            <InfoValue>{formatCurrencyBR(product.priceTag)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Preço de revenda:</InfoKey>
                                            <InfoValue>{formatCurrencyBR(product.resalePrice)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Última atualização:</InfoKey>
                                            <InfoValue>{formatDateBr(product.updatedAt)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Criado em:</InfoKey>
                                            <InfoValue>{formatDateBr(product.createdAt)}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Quantidade em estoque:</InfoKey>
                                            <InfoValue>{product.amountStock}</InfoValue>
                                        </InfoRow>
                                    </InfoCard>
                                </InfoCardContainer>
                            </InfosSection>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <InfosSection>
                                    <InfoCardContainer >
                                        <InfoCardTitle>Informações da coleção</InfoCardTitle>
                                        <InfoCard>
                                            <InfoRow>
                                                <InfoKey>Nome:</InfoKey>
                                                <InfoValue>{product.collection.name}</InfoValue>
                                            </InfoRow>
                                            <InfoRow>
                                                <InfoKey>Descrição:</InfoKey>
                                                <InfoValue>{product.collection.description}</InfoValue>
                                            </InfoRow>
                                        </InfoCard>
                                    </InfoCardContainer>
                                </InfosSection>
                                <InfosSection>
                                    <InfoCardContainer>
                                        <InfoCardTitle>Informações da categoria</InfoCardTitle>
                                        <InfoCard>
                                            <InfoRow>
                                                <InfoKey>Nome:</InfoKey>
                                                <InfoValue>{product.category.name}</InfoValue>
                                            </InfoRow>
                                            <InfoRow>
                                                <InfoKey>Descrição:</InfoKey>
                                                <InfoValue>{product.category.description}</InfoValue>
                                            </InfoRow>
                                        </InfoCard>

                                    </InfoCardContainer>
                                </InfosSection>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <InfosSection>
                                    <InfoCardContainer>
                                        <InfoCardTitle>Informações da marca</InfoCardTitle>
                                        <InfoCard>
                                            <InfoRow>
                                                <InfoKey>Nome:</InfoKey>
                                                <InfoValue>{product.brand.name}</InfoValue>
                                            </InfoRow>
                                            <InfoRow>
                                                <InfoKey>Descrição:</InfoKey>
                                                <InfoValue>{product.brand.description}</InfoValue>
                                            </InfoRow>
                                        </InfoCard>
                                    </InfoCardContainer>
                                </InfosSection>
                                <InfosSection>
                                    <InfoCardContainer>
                                        <InfoCardTitle>Informações do fornecedor</InfoCardTitle>
                                        <InfoCard>
                                            <InfoRow>
                                                <InfoKey>Nome:</InfoKey>
                                                <InfoValue>{product.brand.name}</InfoValue>
                                            </InfoRow>
                                            <InfoRow>
                                                <InfoKey>Descrição:</InfoKey>
                                                <InfoValue>{product.brand.description}</InfoValue>
                                            </InfoRow>
                                        </InfoCard>
                                    </InfoCardContainer>
                                </InfosSection>
                            </Box>
                        </Box>


                        {product.productCharacteristics.length > 0 && <PaymentSection sx={{ flex: 1 }}>
                            <InfoCardTitle sx={{ marginLeft: "1rem" }}>Caracteristicas</InfoCardTitle>
                            <PaymentListContainer>
                                <PaymentList>
                                    {product.productCharacteristics.map((caracteristics) => (
                                        <CaracteristicsInfo
                                            key={caracteristics.id}
                                            caracteritics={caracteristics}
                                        />
                                    ))}
                                </PaymentList>
                            </PaymentListContainer>
                        </PaymentSection>}
                    </Box >
                }
            />
        </>
    )
}

export default ProductDetailsModal