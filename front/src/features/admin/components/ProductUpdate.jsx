import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearSelectedProduct, fetchProductByIdAsync, resetProductUpdateStatus, selectProductUpdateStatus, selectSelectedProduct, updateProductByIdAsync } from '../../products/ProductSlice'
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'

export const ProductUpdate = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const { id } = useParams()
    const dispatch = useDispatch()
    const selectedProduct = useSelector(selectSelectedProduct)
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const productUpdateStatus = useSelector(selectProductUpdateStatus)
    const navigate = useNavigate()
    const theme = useTheme()
    const is1100 = useMediaQuery(theme.breakpoints.down(1100))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (productUpdateStatus === 'fulfilled' || productUpdateStatus === 'fullfilled') {
            toast.success("Product updated successfully")
            navigate("/admin/dashboard")
        } else if (productUpdateStatus === 'rejected') {
            toast.error("Error updating product, please try again later")
        }
    }, [productUpdateStatus, navigate])

    useEffect(() => {
        return () => {
            dispatch(clearSelectedProduct())
            dispatch(resetProductUpdateStatus())
        }
    }, [dispatch])

    const handleProductUpdate = (data) => {
        const images = [data?.image0, data?.image1, data?.image2, data?.image3].filter(Boolean)
        const productUpdate = {
            ...data,
            _id: selectedProduct._id,
            price: Number(data.price),
            discountPercentage: Number(data.discountPercentage || 0),
            stockQuantity: Number(data.stockQuantity),
            requiresPrescription: Boolean(data.requiresPrescription),
            images: images.length > 0 ? images : selectedProduct.images
        }
        delete productUpdate?.image0
        delete productUpdate?.image1
        delete productUpdate?.image2
        delete productUpdate?.image3

        dispatch(updateProductByIdAsync(productUpdate))
    }

    const defaultBrandId = typeof selectedProduct?.brand === 'object' && selectedProduct?.brand !== null ? selectedProduct?.brand._id : selectedProduct?.brand
    const defaultCategoryId = typeof selectedProduct?.category === 'object' && selectedProduct?.category !== null ? selectedProduct?.category._id : selectedProduct?.category

    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
            {selectedProduct && (
                <Stack width={is1100 ? "100%" : "60rem"} rowGap={4} mt={is480 ? 3 : 5} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleProductUpdate)}>
                    <Typography variant='h4' fontWeight={700} color="#0f766e">Update Healthcare Product</Typography>

                    {/* Field area */}
                    <Stack rowGap={3}>
                        <Stack>
                            <Typography variant='subtitle1' fontWeight={600} gutterBottom>Product Title / Medicine Name</Typography>
                            <TextField {...register("title", { required: 'Title is required', value: selectedProduct.title })} />
                        </Stack>

                        <Stack flexDirection={'row'} columnGap={2}>
                            <FormControl fullWidth>
                                <InputLabel id="brand-selection">Healthcare Brand</InputLabel>
                                <Select defaultValue={defaultBrandId} {...register("brand", { required: "Brand is required" })} labelId="brand-selection" label="Healthcare Brand">
                                    {brands.map((brand) => (
                                        <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="category-selection">Healthcare Category</InputLabel>
                                <Select defaultValue={defaultCategoryId} {...register("category", { required: "Category is required" })} labelId="category-selection" label="Healthcare Category">
                                    {categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>

                        {/* Healthcare Specific Metadata */}
                        <Stack p={2} sx={{ bgcolor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }} spacing={2}>
                            <Typography variant='subtitle1' fontWeight={700} color="primary">Healthcare Attributes</Typography>

                            <FormControlLabel
                                control={<Checkbox defaultChecked={selectedProduct.requiresPrescription} {...register("requiresPrescription")} color="error" />}
                                label={<Typography fontWeight={600}>Requires Doctor Prescription (Rx Required)</Typography>}
                            />

                            <Stack flexDirection={'row'} columnGap={2}>
                                <TextField
                                    fullWidth
                                    label="Manufacturer"
                                    defaultValue={selectedProduct.manufacturer || ""}
                                    {...register("manufacturer", { required: "Manufacturer is required" })}
                                />
                                <TextField
                                    fullWidth
                                    label="Dosage & Usage Instructions"
                                    defaultValue={selectedProduct.dosage || ""}
                                    {...register("dosage")}
                                />
                            </Stack>

                            <Stack flexDirection={'row'} columnGap={2}>
                                <TextField
                                    fullWidth
                                    label="Medicine Type / Form"
                                    defaultValue={selectedProduct.medicineType || ""}
                                    {...register("medicineType")}
                                />
                                <TextField
                                    fullWidth
                                    label="Expiry Date"
                                    type="date"
                                    defaultValue={selectedProduct.expiryDate ? new Date(selectedProduct.expiryDate).toISOString().split('T')[0] : ""}
                                    InputLabelProps={{ shrink: true }}
                                    {...register("expiryDate")}
                                />
                            </Stack>
                        </Stack>

                        <Stack>
                            <Typography variant='subtitle1' fontWeight={600} gutterBottom>Description & Indications</Typography>
                            <TextField multiline rows={3} {...register("description", { required: "Description is required", value: selectedProduct.description })} />
                        </Stack>

                        <Stack flexDirection={'row'} columnGap={2}>
                            <Stack flex={1}>
                                <Typography variant='subtitle1' fontWeight={600} gutterBottom>Price ($)</Typography>
                                <TextField type='number' inputProps={{ step: "0.01" }} {...register("price", { required: "Price is required", value: selectedProduct.price })} />
                            </Stack>
                            <Stack flex={1}>
                                <Typography variant='subtitle1' fontWeight={600} gutterBottom>Discount (%)</Typography>
                                <TextField type='number' {...register("discountPercentage", { value: selectedProduct.discountPercentage })} />
                            </Stack>
                            <Stack flex={1}>
                                <Typography variant='subtitle1' fontWeight={600} gutterBottom>Stock Quantity</Typography>
                                <TextField type='number' {...register("stockQuantity", { required: "Stock Quantity is required", value: selectedProduct.stockQuantity })} />
                            </Stack>
                        </Stack>

                        <Stack>
                            <Typography variant='subtitle1' fontWeight={600} gutterBottom>Thumbnail</Typography>
                            <TextField {...register("thumbnail", { required: "Thumbnail is required", value: selectedProduct.thumbnail })} />
                        </Stack>

                        <Stack>
                            <Typography variant='subtitle1' fontWeight={600} gutterBottom>Product Images</Typography>
                            <Stack rowGap={1.5}>
                                {selectedProduct.images.map((image, index) => (
                                    <TextField key={index} {...register(`image${index}`, { value: image })} placeholder={`Image ${index + 1} URL`} />
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* Action area */}
                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2} mt={2}>
                        <Button size='large' variant='contained' type='submit' sx={{ bgcolor: "#0f766e", '&:hover': { bgcolor: "#115e59" } }}>
                            Update Product
                        </Button>
                        <Button size='large' variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Stack>
    )
}
