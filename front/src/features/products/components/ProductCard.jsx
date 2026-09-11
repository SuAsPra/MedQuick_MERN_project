import { Chip, FormHelperText, Paper, Stack, Typography, useMediaQuery, useTheme} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice';
import { motion } from 'framer-motion'
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';

export const ProductCard = ({
    id,
    title,
    price,
    thumbnail,
    brand,
    stockQuantity,
    requiresPrescription,
    dosage,
    medicineType,
    manufacturer,
    handleAddRemoveFromWishlist,
    isWishlistCard,
    isAdminCard
}) => {

    const navigate=useNavigate()
    const wishlistItems=useSelector(selectWishlistItems)
    const loggedInUser=useSelector(selectLoggedInUser)
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()

    const theme=useTheme()
    const is1410=useMediaQuery(theme.breakpoints.down(1410))
    const is932=useMediaQuery(theme.breakpoints.down(932))
    const is752=useMediaQuery(theme.breakpoints.down(752))
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const is608=useMediaQuery(theme.breakpoints.down(608))
    const is488=useMediaQuery(theme.breakpoints.down(488))
    const is408=useMediaQuery(theme.breakpoints.down(408))

    const isProductAlreadyinWishlist = wishlistItems ? wishlistItems.some((item)=>item.product?._id===id || item.product===id) : false
    const isProductAlreadyInCart = cartItems ? cartItems.some((item)=>item.product?._id===id || item.product===id) : false

    const handleAddToCart=async(e)=>{
        e.stopPropagation()
        const data={user:loggedInUser?._id,product:id}
        dispatch(addToCartAsync(data))
    }

    const brandName = typeof brand === 'object' && brand !== null ? brand.name : brand;

  return (
    <Stack 
        component={isAdminCard?"":isWishlistCard?"":is408?'':Paper} 
        mt={is408?2:0} 
        elevation={2} 
        p={2} 
        width={is408?'auto':is488?"200px":is608?"240px":is752?"300px":is932?'240px':is1410?'300px':'340px'} 
        sx={{
            cursor:"pointer",
            borderRadius: "12px",
            transition: "transform 0.2s, box-shadow 0.2s",
            '&:hover': {
                transform: "translateY(-4px)",
                boxShadow: 4
            },
            position: "relative"
        }} 
        onClick={()=>navigate(`/product-details/${id}`)}
    >

        {/* image display & badges */}
        <Stack sx={{ position: "relative", width: "100%", height: "180px", bgcolor: "#f8fafc", borderRadius: "8px", overflow: "hidden" }} justifyContent="center" alignItems="center">
            {requiresPrescription && (
                <Chip 
                    icon={<MedicalServicesOutlinedIcon sx={{ fontSize: "14px !important", color: "#dc2626 !important" }} />}
                    label="Rx Required" 
                    size="small"
                    sx={{ 
                        position: "absolute", 
                        top: 8, 
                        left: 8, 
                        bgcolor: "#fee2e2", 
                        color: "#b91c1c", 
                        fontWeight: 700, 
                        fontSize: "0.7rem",
                        border: "1px solid #fca5a5",
                        zIndex: 2
                    }} 
                />
            )}
            
            <img 
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} 
                src={thumbnail} 
                alt={`${title} photo`} 
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60"; }}
            />
        </Stack>

        {/* lower section */}
        <Stack flex={2} justifyContent={'flex-end'} spacing={1} mt={1.5}>

            <Stack>
                <Stack flexDirection={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
                    <Typography variant='subtitle1' fontWeight={600} sx={{ lineHeight: 1.3 }}>{title}</Typography>
                    {
                    !isAdminCard && 
                    <motion.div whileHover={{scale:1.2}} whileTap={{scale:0.9}}>
                        <Checkbox 
                            onClick={(e)=>e.stopPropagation()} 
                            checked={isProductAlreadyinWishlist} 
                            onChange={(e)=>handleAddRemoveFromWishlist && handleAddRemoveFromWishlist(e,id)} 
                            icon={<FavoriteBorder fontSize='small' />} 
                            checkedIcon={<Favorite fontSize='small' sx={{color:'red'}} />} 
                        />
                    </motion.div>
                    }
                </Stack>
                
                <Typography variant='caption' color={"primary.main"} fontWeight={500}>
                    {brandName} {manufacturer ? `• ${manufacturer}` : ''}
                </Typography>

                {dosage && (
                    <Typography variant='caption' color="text.secondary" sx={{ display: "block", mt: 0.2 }}>
                        Dosage: {dosage}
                    </Typography>
                )}
            </Stack>

            <Stack sx={{flexDirection:"row",justifyContent:"space-between",alignItems:"center", pt: 1}}>
                <Typography variant='h6' fontWeight={700} color="text.primary">${price}</Typography>
                {
                    !isWishlistCard ? (
                        isProductAlreadyInCart ? (
                            <Chip size='small' label="In Cart" color='success' variant='outlined' />
                        ) : (
                            !isAdminCard && (
                                <motion.button  
                                    whileHover={{scale:1.04}} 
                                    whileTap={{scale:0.96}} 
                                    onClick={(e)=>handleAddToCart(e)} 
                                    style={{
                                        padding:"8px 14px",
                                        borderRadius:"6px",
                                        outline:"none",
                                        border:"none",
                                        cursor:"pointer",
                                        backgroundColor:"#0f766e",
                                        color:"white",
                                        fontWeight: 600,
                                        fontSize:is408?'.85rem':is488?'.75rem':'.85rem'
                                    }}
                                >
                                    Add To Cart
                                </motion.button>
                            )
                        )
                    ) : ''
                }
            </Stack>
            
            {
                stockQuantity<=10 && (
                    <FormHelperText sx={{fontSize:".8rem", m: 0}} error>
                        {stockQuantity===1 ? "Only 1 unit in stock!" : `Only ${stockQuantity} units left!`}
                    </FormHelperText>
                )
            }
        </Stack>
    </Stack> 
  )
}
