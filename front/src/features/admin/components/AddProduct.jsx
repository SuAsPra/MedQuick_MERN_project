import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../products/ProductSlice'
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'

export const AddProduct = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const productAddStatus = useSelector(selectProductAddStatus)
    const navigate = useNavigate()
    const theme = useTheme()
    const is1100 = useMediaQuery(theme.breakpoints.down(1100))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        if (productAddStatus === 'fulfilled' || productAddStatus === 'fullfilled') {
            reset()
            toast.success("New healthcare product added successfully")
            navigate("/admin/dashboard")
        } else if (productAddStatus === 'rejected') {
            toast.error("Error adding product, please try again later")
        }
    }, [productAddStatus, navigate, reset])

    useEffect(() => {
        return () => {
            dispatch(resetProductAddStatus())
        }
    }, [dispatch])

    const handleAddProduct = (data) => {
        const images = [data.image0, data.image1, data.image2, data.image3].filter(Boolean)
        const newProduct = {
            ...data,
            price: Number(data.price),
            discountPercentage: Number(data.discountPercentage || 0),
            stockQuantity: Number(data.stockQuantity),
            requiresPrescription: Boolean(data.requiresPrescription),
            images: images.length > 0 ? images : [data.thumbnail]
        }
        delete newProduct.image0
        delete newProduct.image1
        delete newProduct.image2
        delete newProduct.image3

        dispatch(addProductAsync(newProduct))
    }

    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
            <Stack width={is1100 ? "100%" : "60rem"} rowGap={4} mt={is480 ? 3 : 5} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}>
                <Typography variant='h4' fontWeight={700} color="#0f766e">Add Healthcare Product</Typography>

                {/* Field area */}
                <Stack rowGap={3}>
                    <Stack>
                        <Typography variant='subtitle1' fontWeight={600} gutterBottom>Product Title / Medicine Name</Typography>
                        <TextField {...register("title", { required: 'Title is required' })} placeholder="e.g. Amoxicillin 500mg Capsules" />
                        {errors.title && <Typography variant="caption" color="error">{errors.title.message}</Typography>}
                    </Stack>

                    <Stack flexDirection={'row'} columnGap={2}>
                        <FormControl fullWidth>
                            <InputLabel id="brand-selection">Healthcare Brand</InputLabel>
                            <Select {...register("brand", { required: "Brand is required" })} labelId="brand-selection" label="Healthcare Brand" defaultValue="">
                                {brands.map((brand) => (
                                    <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.brand && <Typography variant="caption" color="error">{errors.brand.message}</Typography>}
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="category-selection">Healthcare Category</InputLabel>
                            <Select {...register("category", { required: "Category is required" })} labelId="category-selection" label="Healthcare Category" defaultValue="">
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.category && <Typography variant="caption" color="error">{errors.category.message}</Typography>}
                        </FormControl>
                    </Stack>

                    {/* Healthcare Specific Metadata */}
                    <Stack p={2} sx={{ bgcolor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }} spacing={2}>
                        <Typography variant='subtitle1' fontWeight={700} color="primary">Healthcare Attributes</Typography>

                        <FormControlLabel
                            control={<Checkbox {...register("requiresPrescription")} color="error" />}
                            label={<Typography fontWeight={600}>Requires Doctor Prescription (Rx Required)</Typography>}
                        />

                        <Stack flexDirection={'row'} columnGap={2}>
                            <TextField
                                fullWidth
                                label="Manufacturer"
                                {...register("manufacturer", { required: "Manufacturer is required" })}
                                placeholder="e.g. GlaxoSmithKline Pharmaceuticals Ltd."
                            />
                            <TextField
                                fullWidth
                                label="Dosage & Usage Instructions"
                                {...register("dosage")}
                                placeholder="e.g. 500 mg, 3 times daily or as directed"
                            />
                        </Stack>

                        <Stack flexDirection={'row'} columnGap={2}>
                            <TextField
                                fullWidth
                                label="Medicine Type / Form"
                                {...register("medicineType")}
                                placeholder="e.g. Antibiotic Capsule, Syrup, Tablet, Device"
                            />
                            <TextField
                                fullWidth
                                label="Expiry Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                {...register("expiryDate")}
                            />
                        </Stack>
                    </Stack>

                    <Stack>
                        <Typography variant='subtitle1' fontWeight={600} gutterBottom>Description & Medical Indications</Typography>
                        <TextField multiline rows={3} {...register("description", { required: "Description is required" })} placeholder="Describe indications, therapeutic uses, and storage conditions" />
                    </Stack>

                    <Stack flexDirection={'row'} columnGap={2}>
                        <Stack flex={1}>
                            <Typography variant='subtitle1' fontWeight={600} gutterBottom>Price ($)</Typography>
                            <TextField type='number' inputProps={{ step: "0.01" }} {...register("price", { required: "Price is required" })} />
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant='subtitle1' fontWeight={600} gutterBottom>Discount (%)</Typography>
                            <TextField type='number' defaultValue={0} {...register("discountPercentage")} />
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant='subtitle1' fontWeight={600} gutterBottom>Stock Quantity</Typography>
                            <TextField type='number' {...register("stockQuantity", { required: "Stock Quantity is required" })} />
                        </Stack>
                    </Stack>

                    <Stack>
                        <Typography variant='subtitle1' fontWeight={600} gutterBottom>Thumbnail Image URL</Typography>
                        <TextField {...register("thumbnail", { required: "Thumbnail is required" })} placeholder="https://..." />
                    </Stack>

                    <Stack>
                        <Typography variant='subtitle1' fontWeight={600} gutterBottom>Additional Image URLs</Typography>
                        <Stack rowGap={1.5}>
                            <TextField {...register("image0")} placeholder="Image 1 URL" />
                            <TextField {...register("image1")} placeholder="Image 2 URL (optional)" />
                            <TextField {...register("image2")} placeholder="Image 3 URL (optional)" />
                            <TextField {...register("image3")} placeholder="Image 4 URL (optional)" />
                        </Stack>
                    </Stack>
                </Stack>

                {/* Action area */}
                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2} mt={2}>
                    <Button size='large' variant='contained' type='submit' sx={{ bgcolor: "#0f766e", '&:hover': { bgcolor: "#115e59" } }}>
                        Save Product
                    </Button>
                    <Button size='large' variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}
