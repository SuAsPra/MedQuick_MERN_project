import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearSelectedProduct, fetchProductByIdAsync, resetProductFetchStatus, selectProductFetchStatus, selectSelectedProduct } from '../ProductSlice'
import { Alert, Box, Checkbox, Chip, Divider, Rating, Stack, Typography, useMediaQuery, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { addToCartAsync, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { fetchReviewsByProductIdAsync, selectReviewFetchStatus, selectReviews } from '../../review/ReviewSlice'
import { Reviews } from '../../review/components/Reviews'
import { toast } from 'react-toastify'
import { MotionConfig, motion } from 'framer-motion'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import Favorite from '@mui/icons-material/Favorite'
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, selectWishlistItems } from '../../wishlist/WishlistSlice'
import { useTheme } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import Lottie from 'lottie-react'
import { loadingAnimation } from '../../../assets'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const ProductDetails = () => {
    const { id } = useParams()
    const product = useSelector(selectSelectedProduct)
    const loggedInUser = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const cartItemAddStatus = useSelector(selectCartItemAddStatus)
    const [quantity, setQuantity] = useState(1)
    const reviews = useSelector(selectReviews)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const theme = useTheme()
    const is1420 = useMediaQuery(theme.breakpoints.down(1420))
    const is990 = useMediaQuery(theme.breakpoints.down(990))
    const is840 = useMediaQuery(theme.breakpoints.down(840))
    const is500 = useMediaQuery(theme.breakpoints.down(500))
    const is480 = useMediaQuery(theme.breakpoints.down(480))
    const is387 = useMediaQuery(theme.breakpoints.down(387))
    const is340 = useMediaQuery(theme.breakpoints.down(340))

    const wishlistItems = useSelector(selectWishlistItems)

    const isProductAlreadyInCart = cartItems ? cartItems.some((item) => item.product?._id === id || item.product === id) : false
    const isProductAlreadyinWishlist = wishlistItems ? wishlistItems.some((item) => item.product?._id === id || item.product === id) : false

    const productFetchStatus = useSelector(selectProductFetchStatus)
    const reviewFetchStatus = useSelector(selectReviewFetchStatus)

    const totalReviewRating = reviews.reduce((acc, review) => acc + review.rating, 0)
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0 ? parseInt(Math.ceil(totalReviewRating / totalReviews)) : 0

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id))
            dispatch(fetchReviewsByProductIdAsync(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (cartItemAddStatus === 'fulfilled') {
            toast.success("Product added to cart")
        } else if (cartItemAddStatus === 'rejected') {
            toast.error('Error adding product to cart, please try again later')
        }
    }, [cartItemAddStatus])

    useEffect(() => {
        if (productFetchStatus === 'rejected') {
            toast.error("Error fetching product details, please try again later")
        }
    }, [productFetchStatus])

    useEffect(() => {
        return () => {
            dispatch(clearSelectedProduct())
            dispatch(resetProductFetchStatus())
        }
    }, [dispatch])

    const handleAddToCart = () => {
        const item = { user: loggedInUser._id, product: id, quantity }
        dispatch(addToCartAsync(item))
        setQuantity(1)
    }

    const handleDecreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncreaseQty = () => {
        if (quantity < 20 && quantity < (product?.stockQuantity || 100)) {
            setQuantity(quantity + 1)
        }
    }

    const handleAddRemoveFromWishlist = (e) => {
        if (e.target.checked) {
            const data = { user: loggedInUser?._id, product: id }
            dispatch(createWishlistItemAsync(data))
        } else {
            const itemToDelete = wishlistItems.find((item) => item.product?._id === id || item.product === id)
            if (itemToDelete) {
                dispatch(deleteWishlistItemByIdAsync(itemToDelete._id))
            }
        }
    }

    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = product?.images?.length || 0

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleStepChange = (step) => {
        setActiveStep(step)
    }

    const brandName = typeof product?.brand === 'object' && product?.brand !== null ? product?.brand.name : product?.brand
    const categoryName = typeof product?.category === 'object' && product?.category !== null ? product?.category.name : product?.category

    return (
        <>
            {!(productFetchStatus === 'rejected' && reviewFetchStatus === 'rejected') && (
                <Stack sx={{ justifyContent: 'center', alignItems: 'center', mb: '3rem', rowGap: "2rem" }}>
                    {(productFetchStatus || reviewFetchStatus) === 'pending' || !product ? (
                        <Stack width={is500 ? "35vh" : '25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'}>
                            <Lottie animationData={loadingAnimation} />
                        </Stack>
                    ) : (
                        <Stack>
                            {/* Product main section */}
                            <Stack
                                width={is480 ? "95vw" : is1420 ? "90vw" : '80rem'}
                                p={is480 ? 1 : 3}
                                rowGap={4}
                                mt={is840 ? 1 : 4}
                                justifyContent={'center'}
                                mb={4}
                                flexDirection={is840 ? "column" : "row"}
                                columnGap={is990 ? "2rem" : "4rem"}
                            >
                                {/* Left stack (Images) */}
                                <Stack sx={{ flexDirection: "row", columnGap: "1.5rem", alignSelf: "flex-start", width: is840 ? "100%" : "45%" }}>
                                    {!is1420 && product.images?.length > 1 && (
                                        <Stack sx={{ display: "flex", rowGap: '1rem', maxHeight: "450px", overflowY: "auto" }}>
                                            {product.images.map((image, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    style={{
                                                        width: "80px",
                                                        height: "80px",
                                                        cursor: "pointer",
                                                        border: selectedImageIndex === index ? `2px solid ${theme.palette.primary.main}` : "1px solid #e2e8f0",
                                                        borderRadius: "8px",
                                                        overflow: "hidden",
                                                        padding: "4px"
                                                    }}
                                                    onClick={() => setSelectedImageIndex(index)}
                                                >
                                                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={image} alt={`${product.title} thumb`} />
                                                </motion.div>
                                            ))}
                                        </Stack>
                                    )}

                                    {/* Main image */}
                                    <Stack flex={1} alignItems="center" justifyContent="center" sx={{ bgcolor: "#f8fafc", p: 3, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                                        {is1420 ? (
                                            <Stack width={is480 ? "100%" : is990 ? '380px' : "450px"}>
                                                <AutoPlaySwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
                                                    {product.images?.map((image, index) => (
                                                        <div key={index} style={{ width: "100%", height: "340px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Box component="img" sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: "contain" }} src={image} alt={product.title} />
                                                        </div>
                                                    ))}
                                                </AutoPlaySwipeableViews>
                                                {maxSteps > 1 && (
                                                    <MobileStepper
                                                        steps={maxSteps}
                                                        position="static"
                                                        activeStep={activeStep}
                                                        nextButton={<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>Next <KeyboardArrowRight /></Button>}
                                                        backButton={<Button size="small" onClick={handleBack} disabled={activeStep === 0}><KeyboardArrowLeft /> Back</Button>}
                                                    />
                                                )}
                                            </Stack>
                                        ) : (
                                            <div style={{ width: "100%", height: "380px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} src={product.images?.[selectedImageIndex] || product.thumbnail} alt={product.title} />
                                            </div>
                                        )}
                                    </Stack>
                                </Stack>

                                {/* Right stack - Medical product details */}
                                <Stack rowGap={"1.2rem"} width={is840 ? "100%" : '55%'}>
                                    {/* Prescription warning badge */}
                                    {product.requiresPrescription && (
                                        <Alert
                                            severity="warning"
                                            icon={<MedicalServicesOutlinedIcon sx={{ color: "#d97706" }} />}
                                            sx={{
                                                bgcolor: "#fffbeb",
                                                border: "1px solid #fde68a",
                                                color: "#92400e",
                                                fontWeight: 600,
                                                borderRadius: "8px"
                                            }}
                                        >
                                            Prescription Required: A valid medical prescription is required to fulfill and deliver this medication.
                                        </Alert>
                                    )}

                                    {/* Title & Brand */}
                                    <Stack rowGap={".4rem"}>
                                        <Stack flexDirection="row" justifyContent="space-between" alignItems="flex-start" columnGap={2}>
                                            <Typography variant='h4' fontWeight={700} sx={{ fontSize: is480 ? "1.4rem" : "1.8rem" }}>
                                                {product.title}
                                            </Typography>
                                            {product.requiresPrescription && (
                                                <Chip label="Rx Only" color="error" size="small" sx={{ fontWeight: 700 }} />
                                            )}
                                        </Stack>

                                        <Typography variant='subtitle1' color="primary.main" fontWeight={600}>
                                            Brand: {brandName} {categoryName ? `| Category: ${categoryName}` : ''}
                                        </Typography>

                                        {/* Ratings & Stock */}
                                        <Stack sx={{ flexDirection: "row", columnGap: is340 ? ".5rem" : "1rem", alignItems: "center", flexWrap: 'wrap', rowGap: '.5rem', mt: 0.5 }}>
                                            <Rating value={averageRating} readOnly size="small" />
                                            <Typography variant="body2" color="text.secondary">
                                                ({totalReviews === 0 ? "No reviews" : totalReviews === 1 ? `${totalReviews} Review` : `${totalReviews} Reviews`})
                                            </Typography>
                                            <Chip
                                                size="small"
                                                label={product.stockQuantity <= 10 ? `Only ${product.stockQuantity} left` : "In Stock"}
                                                color={product.stockQuantity <= 10 ? "warning" : "success"}
                                                variant="outlined"
                                            />
                                        </Stack>
                                    </Stack>

                                    {/* Pricing */}
                                    <Stack flexDirection="row" alignItems="baseline" columnGap={2}>
                                        <Typography variant='h4' fontWeight={800} color="text.primary">
                                            ${product.price}
                                        </Typography>
                                        {product.discountPercentage > 0 && (
                                            <Chip label={`${product.discountPercentage}% OFF`} color="error" size="small" sx={{ fontWeight: 700 }} />
                                        )}
                                    </Stack>

                                    {/* Description */}
                                    <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {product.description}
                                    </Typography>

                                    {/* Healthcare Specifications Table */}
                                    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", my: 1 }}>
                                        <Table size="small">
                                            <TableBody>
                                                {product.manufacturer && (
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, width: "35%", bgcolor: "#f8fafc" }}>Manufacturer</TableCell>
                                                        <TableCell>{product.manufacturer}</TableCell>
                                                    </TableRow>
                                                )}
                                                {product.dosage && (
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Dosage</TableCell>
                                                        <TableCell>{product.dosage}</TableCell>
                                                    </TableRow>
                                                )}
                                                {product.medicineType && (
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Form / Type</TableCell>
                                                        <TableCell>{product.medicineType}</TableCell>
                                                    </TableRow>
                                                )}
                                                {product.expiryDate && (
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Expiry Date</TableCell>
                                                        <TableCell>{new Date(product.expiryDate).toLocaleDateString()}</TableCell>
                                                    </TableRow>
                                                )}
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Prescription</TableCell>
                                                    <TableCell>{product.requiresPrescription ? "Required (Rx)" : "Over the Counter (OTC)"}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Quantity, Add-To-Cart and Wishlist Actions */}
                                    {!loggedInUser?.isAdmin && (
                                        <Stack sx={{ rowGap: "1rem", mt: 1 }}>
                                            <Stack flexDirection={"row"} columnGap={is387 ? ".5rem" : "1rem"} alignItems="center">
                                                {/* Quantity Selector */}
                                                <Stack flexDirection={'row'} alignItems={'center'} sx={{ border: "1px solid #cbd5e1", borderRadius: "8px", px: 1, py: 0.5 }}>
                                                    <MotionConfig whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                        <Button size="small" onClick={handleDecreaseQty} sx={{ minWidth: "30px", fontWeight: 700, color: "text.primary" }}>-</Button>
                                                        <Typography sx={{ mx: 1.5, fontWeight: 600 }}>{quantity}</Typography>
                                                        <Button size="small" onClick={handleIncreaseQty} sx={{ minWidth: "30px", fontWeight: 700, color: "text.primary" }}>+</Button>
                                                    </MotionConfig>
                                                </Stack>

                                                {/* Add to Cart Button */}
                                                {isProductAlreadyInCart ? (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => navigate("/cart")}
                                                        sx={{ py: 1.2, px: 3, fontWeight: 700, borderRadius: "8px" }}
                                                    >
                                                        View in Cart
                                                    </Button>
                                                ) : (
                                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                        <Button
                                                            variant="contained"
                                                            onClick={handleAddToCart}
                                                            sx={{
                                                                py: 1.2,
                                                                px: 4,
                                                                fontWeight: 700,
                                                                borderRadius: "8px",
                                                                bgcolor: "#0f766e",
                                                                '&:hover': { bgcolor: "#115e59" }
                                                            }}
                                                        >
                                                            Add To Cart
                                                        </Button>
                                                    </motion.div>
                                                )}

                                                {/* Wishlist Button */}
                                                <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "8px", display: "flex", p: 0.3 }}>
                                                    <Checkbox
                                                        checked={isProductAlreadyinWishlist}
                                                        onChange={(e) => handleAddRemoveFromWishlist(e)}
                                                        icon={<FavoriteBorder />}
                                                        checkedIcon={<Favorite sx={{ color: 'red' }} />}
                                                    />
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    )}

                                    {/* Healthcare trust guarantees */}
                                    <Stack mt={2} sx={{ border: "1px solid #e2e8f0", borderRadius: "10px", bgcolor: "#f8fafc", overflow: "hidden" }}>
                                        <Stack p={1.5} flexDirection={'row'} alignItems={"center"} columnGap={'1rem'}>
                                            <LocalShippingOutlinedIcon color="primary" />
                                            <Stack>
                                                <Typography variant="subtitle2" fontWeight={600}>⚡ Express Healthcare Delivery</Typography>
                                                <Typography variant="caption" color="text.secondary">Emergency orders delivered in 20-45 minutes</Typography>
                                            </Stack>
                                        </Stack>
                                        <Divider />
                                        <Stack p={1.5} flexDirection={'row'} alignItems={"center"} columnGap={'1rem'}>
                                            <VerifiedUserOutlinedIcon color="success" />
                                            <Stack>
                                                <Typography variant="subtitle2" fontWeight={600}>🛡️ 100% Genuine Pharmacy Certified</Typography>
                                                <Typography variant="caption" color="text.secondary">Sourced directly from licensed pharmaceutical distributors</Typography>
                                            </Stack>
                                        </Stack>
                                        <Divider />
                                        <Stack p={1.5} flexDirection={'row'} alignItems={"center"} columnGap={'1rem'}>
                                            <AcUnitOutlinedIcon color="info" />
                                            <Stack>
                                                <Typography variant="subtitle2" fontWeight={600}>❄️ Temperature-Controlled Packaging</Typography>
                                                <Typography variant="caption" color="text.secondary">Safe cold-chain maintenance for sensitive medicines</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>

                            {/* Reviews section */}
                            <Stack width={is1420 ? "90vw" : '80rem'} p={is480 ? 1 : 2}>
                                <Reviews productId={id} averageRating={averageRating} />
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            )}
        </>
    )
}
