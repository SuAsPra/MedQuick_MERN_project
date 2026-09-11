import { Box, Button, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Pagination, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters } from '../ProductSlice'
import { ProductCard } from './ProductCard'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import { ITEMS_PER_PAGE } from '../../../constants'
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems } from '../../wishlist/WishlistSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { toast } from 'react-toastify'
import { resetCartItemAddStatus, selectCartItemAddStatus } from '../../cart/CartSlice'
import { motion } from 'framer-motion'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Lottie from 'lottie-react'
import { loadingAnimation } from '../../../assets'

const sortOptions = [
    { name: "Price: Low to High", sort: "price", order: "asc" },
    { name: "Price: High to Low", sort: "price", order: "desc" },
]

export const ProductList = () => {
    const [filters, setFilters] = useState({})
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const theme = useTheme()

    const is1200 = useMediaQuery(theme.breakpoints.down(1200))
    const is800 = useMediaQuery(theme.breakpoints.down(800))
    const is700 = useMediaQuery(theme.breakpoints.down(700))
    const is600 = useMediaQuery(theme.breakpoints.down(600))
    const is500 = useMediaQuery(theme.breakpoints.down(500))
    const is488 = useMediaQuery(theme.breakpoints.down(488))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const products = useSelector(selectProducts)
    const totalResults = useSelector(selectProductTotalResults)
    const loggedInUser = useSelector(selectLoggedInUser)

    const productFetchStatus = useSelector(selectProductFetchStatus)

    const wishlistItems = useSelector(selectWishlistItems)
    const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus)

    const cartItemAddStatus = useSelector(selectCartItemAddStatus)
    const isProductFilterOpen = useSelector(selectProductIsFilterOpen)

    const dispatch = useDispatch()

    const handleBrandFilters = (e) => {
        const filterSet = new Set(filters.brand || [])
        if (e.target.checked) { filterSet.add(e.target.value) }
        else { filterSet.delete(e.target.value) }
        const filterArray = Array.from(filterSet)
        setFilters({ ...filters, brand: filterArray })
    }

    const handleCategoryFilters = (e) => {
        const filterSet = new Set(filters.category || [])
        if (e.target.checked) { filterSet.add(e.target.value) }
        else { filterSet.delete(e.target.value) }
        const filterArray = Array.from(filterSet)
        setFilters({ ...filters, category: filterArray })
    }

    const handleCategoryChipClick = (categoryId) => {
        const currentSelected = filters.category || []
        if (currentSelected.includes(categoryId)) {
            setFilters({ ...filters, category: currentSelected.filter(c => c !== categoryId) })
        } else {
            setFilters({ ...filters, category: [...currentSelected, categoryId] })
        }
    }

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault()
        setFilters({ ...filters, search: searchInput })
    }

    const handleClearSearch = () => {
        setSearchInput('')
        const newFilters = { ...filters }
        delete newFilters.search
        setFilters(newFilters)
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    useEffect(() => {
        setPage(1)
    }, [totalResults, filters, sort])

    useEffect(() => {
        const finalFilters = { ...filters }
        finalFilters['pagination'] = { page: page, limit: ITEMS_PER_PAGE }
        finalFilters['sort'] = sort

        if (!loggedInUser?.isAdmin) {
            finalFilters['user'] = true
        }

        dispatch(fetchProductsAsync(finalFilters))
    }, [filters, page, sort, dispatch, loggedInUser])

    const handleAddRemoveFromWishlist = (e, productId) => {
        if (e.target.checked) {
            const data = { user: loggedInUser?._id, product: productId }
            dispatch(createWishlistItemAsync(data))
        } else {
            const index = wishlistItems.findIndex((item) => (item.product?._id === productId || item.product === productId))
            if (index !== -1) {
                dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id))
            }
        }
    }

    useEffect(() => {
        if (wishlistItemAddStatus === 'fulfilled') {
            toast.success("Product added to wishlist")
        } else if (wishlistItemAddStatus === 'rejected') {
            toast.error("Error adding product to wishlist, please try again later")
        }
    }, [wishlistItemAddStatus])

    useEffect(() => {
        if (wishlistItemDeleteStatus === 'fulfilled') {
            toast.success("Product removed from wishlist")
        } else if (wishlistItemDeleteStatus === 'rejected') {
            toast.error("Error removing product from wishlist, please try again later")
        }
    }, [wishlistItemDeleteStatus])

    useEffect(() => {
        if (cartItemAddStatus === 'fulfilled') {
            toast.success("Product added to cart")
        } else if (cartItemAddStatus === 'rejected') {
            toast.error("Error adding product to cart, please try again later")
        }
    }, [cartItemAddStatus])

    useEffect(() => {
        if (productFetchStatus === 'rejected') {
            toast.error("Error fetching products, please try again later")
        }
    }, [productFetchStatus])

    useEffect(() => {
        return () => {
            dispatch(resetProductFetchStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetCartItemAddStatus())
        }
    }, [dispatch])

    const handleFilterClose = () => {
        dispatch(toggleFilters())
    }

    return (
        <>
            {/* Filter drawer for mobile/tablet */}
            <motion.div
                style={{
                    position: "fixed",
                    backgroundColor: "white",
                    height: "100vh",
                    padding: '1.5rem',
                    overflowY: "scroll",
                    width: is500 ? "100vw" : "24rem",
                    zIndex: 1200,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                }}
                variants={{ show: { left: 0 }, hide: { left: -500 } }}
                initial={'hide'}
                transition={{ ease: "easeInOut", duration: .4 }}
                animate={isProductFilterOpen === true ? "show" : "hide"}
            >
                <Stack mb={'5rem'}>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant='h5' fontWeight={700}>Filter Products</Typography>
                        <IconButton onClick={handleFilterClose}>
                            <ClearIcon />
                        </IconButton>
                    </Stack>

                    {/* Category filters */}
                    <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mb: 1 }}>Categories</Typography>
                    <FormGroup onChange={handleCategoryFilters} sx={{ mb: 3 }}>
                        {categories?.map((category) => (
                            <FormControlLabel
                                key={category._id}
                                control={<Checkbox checked={filters.category?.includes(category._id) || false} size="small" />}
                                label={<Typography variant="body2">{category.name}</Typography>}
                                value={category._id}
                            />
                        ))}
                    </FormGroup>

                    {/* Brand filters */}
                    <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mb: 1 }}>Healthcare Brands</Typography>
                    <FormGroup onChange={handleBrandFilters}>
                        {brands?.map((brand) => (
                            <FormControlLabel
                                key={brand._id}
                                control={<Checkbox checked={filters.brand?.includes(brand._id) || false} size="small" />}
                                label={<Typography variant="body2">{brand.name}</Typography>}
                                value={brand._id}
                            />
                        ))}
                    </FormGroup>
                </Stack>
            </motion.div>

            {/* Main Content Area */}
            <Stack mb={'4rem'} px={is480 ? 1.5 : 3}>
                {/* Hero Healthcare Banner */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%)",
                        borderRadius: "16px",
                        p: is480 ? 3 : 5,
                        color: "white",
                        mt: 2,
                        mb: 3,
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <Stack maxWidth="700px" spacing={1.5} zIndex={2} position="relative">
                        <Stack flexDirection="row" alignItems="center" columnGap={1}>
                            <Chip
                                icon={<FlashOnIcon sx={{ color: "#fef08a !important" }} />}
                                label="24/7 Emergency Delivery"
                                size="small"
                                sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fef08a", fontWeight: 700 }}
                            />
                        </Stack>
                        <Typography variant={is480 ? 'h5' : 'h3'} fontWeight={800} sx={{ letterSpacing: "-0.5px" }}>
                            Your Health, Delivered in Minutes.
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 300 }}>
                            Order prescription medicines, emergency first aid, diagnostic devices, and wellness essentials with doorstep delivery.
                        </Typography>
                    </Stack>
                </Box>

                {/* Keyword Search & Category Bar */}
                <Stack spacing={2} mb={3}>
                    {/* Search input form */}
                    <Box component="form" onSubmit={handleSearchSubmit}>
                        <TextField
                            fullWidth
                            placeholder="Search medicines, ailments, devices, manufacturers (e.g., Amoxicillin, BP Monitor, Cipla)..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {searchInput && (
                                            <IconButton size="small" onClick={handleClearSearch}>
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="small"
                                            sx={{ ml: 1, bgcolor: "#0f766e", '&:hover': { bgcolor: "#115e59" } }}
                                        >
                                            Search
                                        </Button>
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: "10px", bgcolor: "white" }
                            }}
                        />
                    </Box>

                    {/* Quick Category Chips */}
                    <Stack flexDirection="row" columnGap={1} rowGap={1} flexWrap="wrap" alignItems="center">
                        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mr: 1 }}>Categories:</Typography>
                        {categories?.map((cat) => {
                            const isSelected = filters.category?.includes(cat._id)
                            return (
                                <Chip
                                    key={cat._id}
                                    label={cat.name}
                                    clickable
                                    color={isSelected ? "primary" : "default"}
                                    variant={isSelected ? "filled" : "outlined"}
                                    onClick={() => handleCategoryChipClick(cat._id)}
                                    sx={{ fontWeight: isSelected ? 700 : 500 }}
                                />
                            )
                        })}
                        {((filters.category?.length > 0) || (filters.brand?.length > 0) || filters.search) && (
                            <Chip
                                label="Clear All Filters"
                                color="error"
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    setFilters({})
                                    setSearchInput('')
                                }}
                            />
                        )}
                    </Stack>
                </Stack>

                {/* Products section header & Sort */}
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight={700}>
                        {filters.search ? `Search Results for "${filters.search}"` : "All Healthcare Products"}
                        <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({totalResults} products found)
                        </Typography>
                    </Typography>

                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel id="sort-select-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-select-label"
                            label="Sort by"
                            value={sort?.sort ? `${sort.sort}-${sort.order}` : ''}
                            onChange={(e) => {
                                const val = e.target.value
                                if (!val) { setSort(null) }
                                else {
                                    const option = sortOptions.find(o => `${o.sort}-${o.order}` === val)
                                    setSort(option || null)
                                }
                            }}
                        >
                            <MenuItem value="">Featured</MenuItem>
                            {sortOptions.map((opt) => (
                                <MenuItem key={`${opt.sort}-${opt.order}`} value={`${opt.sort}-${opt.order}`}>
                                    {opt.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                {/* Product List Grid or Loading */}
                {productFetchStatus === 'pending' ? (
                    <Stack width="100%" height="300px" justifyContent="center" alignItems="center">
                        <Lottie animationData={loadingAnimation} style={{ width: 150 }} />
                    </Stack>
                ) : products.length === 0 ? (
                    <Stack alignItems="center" justifyContent="center" py={8} spacing={2}>
                        <MedicalServicesIcon sx={{ fontSize: 60, color: "text.secondary" }} />
                        <Typography variant="h6" color="text.secondary">No healthcare products match your criteria</Typography>
                        <Button variant="outlined" onClick={() => { setFilters({}); setSearchInput(''); }}>
                            Reset All Filters
                        </Button>
                    </Stack>
                ) : (
                    <Grid container spacing={3} justifyContent="flex-start">
                        {products.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard
                                    id={product._id}
                                    title={product.title}
                                    thumbnail={product.thumbnail}
                                    brand={product.brand}
                                    price={product.price}
                                    stockQuantity={product.stockQuantity}
                                    requiresPrescription={product.requiresPrescription}
                                    dosage={product.dosage}
                                    medicineType={product.medicineType}
                                    manufacturer={product.manufacturer}
                                    handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Pagination */}
                {totalResults > ITEMS_PER_PAGE && (
                    <Stack alignItems="center" mt={5} spacing={1}>
                        <Pagination
                            page={page}
                            count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
                            onChange={(e, p) => setPage(p)}
                            color="primary"
                            shape="rounded"
                        />
                        <Typography variant="caption" color="text.secondary">
                            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, totalResults)} of {totalResults} items
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </>
    )
}
