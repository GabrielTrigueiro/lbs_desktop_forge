import {Box, IconButton, Skeleton, Tooltip, Typography, useMediaQuery} from "@mui/material";
import {TProductBody} from "../../../../core/models/product";
import theme from "../../../../core/theme/theme";
import {MoreHorizOutlined, ArrowBackIosRounded, ArrowForwardIosRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {ProductService} from "../../../../core/api/product/productService";
import {formatCurrencyBR} from "../../../../core/utils/globalFunctions";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import DefaultMenu, {IMenuItemProps} from "../../../../app/components/menu/DefaultMenu";
import RegisterProductModal from "../../../../app/components/modals/productModal/registerProductModal";
import EditProductModal from "../../../../app/components/modals/productModal/editProductModal";
import ProductDetailsModal from "../../../../app/components/modals/detailsModal/productDetails/ProductDetailsModal";

interface ICardProductsProps {
    data?: any[];
}

const CardProduct = (props: ICardProductsProps) => {
    const cards = props.data;
    return (
        <Box sx={{padding: "1rem", width: "100%", display: "flex", flexWrap: "wrap", gap: 2}}>
            {
                cards?.map((card) => (
                    <Box
                        sx={{
                            width: "18.3%",
                            minWidth: "200px",
                            marginBottom: "1rem"
                        }}
                        key={card.id}
                    >
                        <Card info={card}/>
                    </Box>
                ))
            }
        </Box>
    );
}

export default CardProduct;

interface ICardProps {
    info: TProductBody;
}

const Card = (props: ICardProps) => {
    const {info} = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isSmallerThan1480 = useMediaQuery("(max-width:1480px)");
    const [details, setDetails] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const open = Boolean(anchorEl);
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const menuItems: IMenuItemProps[] = [
        {
            function: () => {
                setIsOpenModal(true)
            },
            label: "Editar produto",
        },
        {
            function: () => {
                setDetails(true)
                handleCloseMenu();
            },
            label: "Detalhes do produto",
        },
    ];

    // ? carrega as imagens
    useEffect(() => {
        const loadImage = async () => {
            setIsLoading(true);
            try {
                if (info.images?.length > 0) {
                    const resp = await ProductService.getImage(info.images[currentImageIndex].id);
                    setImage(`data:image/png;base64,${resp}`);
                }
            } catch (error) {
                console.error("Error fetching image:", error);
                setImage(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadImage();
    }, [currentImageIndex, info.images]);

    // ? passa para próxima imagem
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : info.images.length - 1));
    };

    // ? retorna pra imagem anterior
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < info.images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <Box sx={{
            height: "400px", display: "flex", flexDirection: "column",
            borderRadius: "5px", border: "2px solid", borderColor: theme.COLORS.YELLOW
        }}>
            <Box
                sx={{
                    position: "relative",
                    flex: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: image ? `url(${image})` : 'none',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {isLoading && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{position: "absolute", top: 0, left: 0, zIndex: 0}}
                    />
                )}
                <IconButton
                    onClick={handleClickMenu}
                    sx={{
                        position: "absolute",
                        borderRadius: 0,
                        top: 0,
                        right: 0,
                        borderBottomLeftRadius: 5,
                        zIndex: 1,
                        borderLeft: "2px solid",
                        borderBottom: "2px solid",
                        borderColor: theme.COLORS.YELLOW,
                        backgroundColor: theme.COLORS.WHITE,
                        width: 30,
                        height: 30,
                        ":hover": {
                            backgroundColor: theme.COLORS.YELLOW
                        },
                    }}
                >
                    <MoreHorizOutlined
                        sx={{
                            fontSize: "30px",
                            color: theme.COLORS.YELLOW,
                            ":hover": {
                                color: theme.COLORS.WHITE,
                            },
                        }}
                    />
                </IconButton>


                {info.images?.length > 1 && (
                    <>
                        <IconButton
                            onClick={handlePrevImage}
                            disabled={info.images?.length <= 1}
                            sx={{
                                width: 30,
                                height: 30,
                                position: "absolute",
                                left: 8,
                                zIndex: 1,
                                border: "1px solid",
                                borderColor: theme.COLORS.YELLOW2,
                                backgroundColor: theme.COLORS.YELLOW
                            }}
                        >
                            <ArrowBackIosRounded
                                sx={{color: info.images?.length <= 1 ? "disabled" : theme.COLORS.WHITE}}/>
                        </IconButton>

                        <IconButton
                            onClick={handleNextImage}
                            disabled={info.images?.length <= 1}
                            sx={{
                                width: 30,
                                height: 30,
                                position: "absolute",
                                right: 8,
                                zIndex: 1,
                                border: "1px solid",
                                borderColor: theme.COLORS.YELLOW2,
                                backgroundColor: theme.COLORS.YELLOW
                            }}
                        >
                            <ArrowForwardIosRounded
                                sx={{color: info.images?.length <= 1 ? "disabled" : theme.COLORS.WHITE}}/>
                        </IconButton>
                    </>)}
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    position: "absolute",
                    bottom: 8,
                    xIndex: 1
                }}>
                    {info.images?.map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: currentImageIndex === index ? theme.COLORS.YELLOW : theme.COLORS.GRAY2
                            }}
                        />
                    ))}
                </Box>
            </Box>


            <Box sx={{
                flex: 1,
                padding: "0.5rem",
                background: theme.COLORS.GRAY6,
                borderRadius: "5px",
                textAlign: "center",
            }}>
                <Typography sx={{marginBottom: "0.5rem", fontWeight: "bold", fontSize: "1.1pc",}}>
                    {info.name}
                </Typography>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography sx={{fontSize: "0.8pc", fontWeight: "bold"}}>
                        Preço de Custo:
                    </Typography>
                    <Typography sx={{fontSize: "0.8pc", fontWeight: "bold"}}>
                        {formatCurrencyBR(info.priceCost)}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography sx={{fontSize: "0.8pc", fontWeight: "bold"}}>
                        Quantidade Aguardando:
                    </Typography>
                    <Typography sx={{fontSize: "0.8pc", fontWeight: "bold"}}>
                        {info.amount}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography sx={{fontSize: "0.8pc", fontWeight: "bold"}}>
                        SKU:
                    </Typography>
                    <Typography sx={{fontSize: "0.8pc", fontWeight: "bold"}}>
                        {info.sku}
                    </Typography>
                </Box>
                <DefaultMenu
                    anchor={anchorEl}
                    menuItems={menuItems}
                    onClose={handleCloseMenu}
                    status={open}
                />
                <ProductDetailsModal
                    product={info}
                    isOpen={details}
                    onClose={() => setDetails(false)}
                    onOpen={() => setDetails(true)}
                />
                <EditProductModal
                    product={info}
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    onOpen={() => setIsOpenModal(true)}
                />

            </Box>
        </Box>
    );
}
