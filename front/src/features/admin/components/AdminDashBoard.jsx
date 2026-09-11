import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import { ProductCard } from '../../products/components/ProductCard'
import { deleteProductByIdAsync, fetchProductsAsync, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters, undeleteProductByIdAsync } from '../../products/ProductSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ITEMS_PER_PAGE } from '../../../constants';

const sortOptions = [
    { name: "Price: Low to High", sort: "price", order: "asc" },
    { name: "Price: High to Low", sort: "price", order: "desc" },
]

export const AdminDashBoard = () => {

    const [filters, setFilters] = useState({})
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const [sort, setSort] = useState(null)
    const [page, setPage] = useState(1)
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()
    const theme = useTheme()
    const is500 = useMediaQuery(theme.breakpoints.down(500))
    const isProductFilterOpen = useSelector(selectProductIsFilterOpen)
    const totalResults = useSelector(selectProductTotalResults)

    const is600 = useMediaQuery(theme.breakpoints.down(600))
    const is488 = useMediaQuery(theme.breakpoints.down(488))

    useEffect(() => {
        setPage(1)
    }, [totalResults])

    useEffect(() => {
        const finalFilters = { ...filters }
        finalFilters['pagination'] = { page: page, limit: ITEMS_PER_PAGE }
        finalFilters['sort'] = sort

        dispatch(fetchProductsAsync(finalFilters))
    }, [filters, sort, page, dispatch])

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

    const handleProductDelete = (productId) => {
        dispatch(deleteProductByIdAsync(productId))
    }

    const handleProductUnDelete = (productId) => {
        dispatch(undeleteProductByIdAsync(productId))
    }

    const handleFilterClose = () => {
        dispatch(toggleFilters())
    }

    return (
        <>
            {/* Filter sidebar */}
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
                        <Typography variant='h5' fontWeight={700}>Filter Catalog</Typography>
                        <IconButton onClick={handleFilterClose}>
                            <ClearIcon />
                        </IconButton>
                    </Stack>

                    {/* Brand filters */}
                    <Stack mt={2}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<AddIcon />}>
                                <Typography fontWeight={600}>Healthcare Brands</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <FormGroup onChange={handleBrandFilters}>
                                    {brands?.map((brand) => (
                                        <FormControlLabel
                                            key={brand._id}
                                            sx={{ ml: 1 }}
                                            control={<Checkbox checked={filters.brand?.includes(brand._id) || false} size="small" />}
                                            label={<Typography variant="body2">{brand.name}</Typography>}
                                            value={brand._id}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>

                    {/* Category filters */}
                    <Stack mt={2}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<AddIcon />}>
                                <Typography fontWeight={600}>Categories</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <FormGroup onChange={handleCategoryFilters}>
                                    {categories?.map((category) => (
                                        <FormControlLabel
                                            key={category._id}
                                            sx={{ ml: 1 }}
                                            control={<Checkbox checked={filters.category?.includes(category._id) || false} size="small" />}
                                            label={<Typography variant="body2">{category.name}</Typography>}
                                            value={category._id}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Stack>
            </motion.div>

            {/* Main content */}
            <Stack rowGap={4} mt={3} mb={'3rem'} px={is488 ? 1.5 : 4}>
                {/* Header & Action Bar */}
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap="wrap" rowGap={2}>
                    <Stack>
                        <Typography variant="h4" fontWeight={800} color="#0f766e">
                            Medicine & Product Catalog
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage pharmaceutical inventory, dosage information, prescription requirements, and pricing.
                        </Typography>
                    </Stack>

                    <Stack flexDirection="row" columnGap={2} alignItems="center">
                        <Button
                            variant="contained"
                            component={Link}
                            to="/admin/add-product"
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{ bgcolor: "#0f766e", '&:hover': { bgcolor: "#115e59" }, fontWeight: 700 }}
                        >
                            Add New Medicine / Product
                        </Button>

                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel id="sort-dropdown">Sort</InputLabel>
                            <Select
                                labelId="sort-dropdown"
                                label="Sort"
                                onChange={(e) => setSort(e.target.value)}
                                value={sort}
                            >
                                <MenuItem value={null}>Reset</MenuItem>
                                {sortOptions.map((option) => (
                                    <MenuItem key={option.name} value={option}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>

                {/* Product Grid */}
                <Grid container spacing={3} justifyContent="flex-start">
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <Stack
                                sx={{
                                    opacity: product.isDeleted ? 0.6 : 1,
                                    bgcolor: "white",
                                    borderRadius: "12px",
                                    p: 1,
                                    border: product.isDeleted ? "1px dashed #ef4444" : "1px solid #e2e8f0"
                                }}
                            >
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
                                    isAdminCard={true}
                                />
                                <Stack pt={1.5} pb={0.5} px={1} flexDirection={'row'} justifyContent="space-between" alignItems="center">
                                    <Button
                                        size="small"
                                        component={Link}
                                        to={`/admin/product-update/${product._id}`}
                                        variant='outlined'
                                    >
                                        Edit
                                    </Button>
                                    {product.isDeleted ? (
                                        <Button
                                            size="small"
                                            onClick={() => handleProductUnDelete(product._id)}
                                            color='success'
                                            variant='contained'
                                        >
                                            Restore
                                        </Button>
                                    ) : (
                                        <Button
                                            size="small"
                                            onClick={() => handleProductDelete(product._id)}
                                            color='error'
                                            variant='outlined'
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
                <Stack alignSelf={is488 ? 'center' : 'flex-end'} rowGap={1} p={1}>
                    <Pagination
                        size={is488 ? 'medium' : 'large'}
                        page={page}
                        onChange={(e, p) => setPage(p)}
                        count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
                        variant="outlined"
                        shape="rounded"
                    />
                    <Typography variant="caption" textAlign={'center'} color="text.secondary">
                        Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, totalResults)} of {totalResults} items
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}
