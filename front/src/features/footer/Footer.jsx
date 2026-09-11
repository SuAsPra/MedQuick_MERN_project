import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const theme = useTheme()
    const is700 = useMediaQuery(theme.breakpoints.down(700))

    const labelStyles = {
        fontWeight: 300,
        cursor: 'pointer',
        fontSize: '0.9rem',
        opacity: 0.85,
        '&:hover': { opacity: 1, textDecoration: 'underline' }
    }

    return (
        <Stack sx={{
            backgroundColor: "#0f172a",
            paddingTop: "3rem",
            paddingLeft: is700 ? "1.5rem" : "3.5rem",
            paddingRight: is700 ? "1.5rem" : "3.5rem",
            paddingBottom: "2rem",
            rowGap: "3rem",
            color: "#f8fafc",
            borderTop: "4px solid #0f766e"
        }}>
            {/* upper section */}
            <Stack flexDirection={'row'} rowGap={'2rem'} justifyContent={is700 ? "flex-start" : 'space-between'} flexWrap={'wrap'}>

                {/* MedQuick info & Emergency Hotline */}
                <Stack rowGap={'1rem'} padding={'0.5rem'} maxWidth="320px">
                    <Stack flexDirection="row" alignItems="center" columnGap={1}>
                        <Box sx={{ bgcolor: "#0f766e", color: "white", p: 0.8, borderRadius: "8px" }}>
                            <LocalHospitalIcon sx={{ fontSize: 22 }} />
                        </Box>
                        <Typography variant='h5' fontWeight={800} color="#2dd4bf">MedQuick</Typography>
                    </Stack>
                    <Typography variant='body2' sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                        Your trusted 24/7 online pharmacy and emergency medical essentials delivery platform. Express delivery within 20 minutes.
                    </Typography>
                    <Stack sx={{ bgcolor: "rgba(15, 118, 110, 0.2)", border: "1px solid #0f766e", p: 1.5, borderRadius: "8px" }} spacing={0.5}>
                        <Typography variant="caption" color="#2dd4bf" fontWeight={700}>24/7 EMERGENCY PHARMACY HELPLINE</Typography>
                        <Stack flexDirection="row" alignItems="center" columnGap={1}>
                            <PhoneInTalkIcon sx={{ fontSize: 18, color: "#2dd4bf" }} />
                            <Typography variant="subtitle2" fontWeight={700}>1800-MED-QUICK (633-784)</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                {/* Contact & Support */}
                <Stack rowGap={'0.8rem'} padding={'0.5rem'}>
                    <Typography variant='subtitle1' fontWeight={700} color="#2dd4bf">Pharmacy Support</Typography>
                    <Stack flexDirection="row" alignItems="center" columnGap={1}>
                        <LocationOnIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
                        <Typography sx={{ fontSize: '0.85rem', opacity: 0.85 }}>Healthcare Hub, Sector 62, Noida, India</Typography>
                    </Stack>
                    <Stack flexDirection="row" alignItems="center" columnGap={1}>
                        <EmailIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
                        <Typography sx={{ fontSize: '0.85rem', opacity: 0.85 }}>support@medquick.com</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '0.85rem', opacity: 0.85 }}>Licensed Pharmacy Reg: DL-MED-2026-8891</Typography>
                </Stack>

                {/* Healthcare Categories */}
                <Stack rowGap={'0.6rem'} padding={'0.5rem'}>
                    <Typography variant='subtitle1' fontWeight={700} color="#2dd4bf">Healthcare</Typography>
                    <Typography sx={labelStyles}>Prescription Medicines</Typography>
                    <Typography sx={labelStyles}>Emergency First Aid</Typography>
                    <Typography sx={labelStyles}>Medical Health Devices</Typography>
                    <Typography sx={labelStyles}>Daily Wellness & Care</Typography>
                    <Typography sx={labelStyles}>Baby Health & Essentials</Typography>
                </Stack>

                {/* Account & Quick Links */}
                <Stack rowGap={'0.6rem'} padding={'0.5rem'}>
                    <Typography variant='subtitle1' fontWeight={700} color="#2dd4bf">Customer Links</Typography>
                    <Typography sx={labelStyles} component={Link} to="/orders" color="inherit">My Orders</Typography>
                    <Typography sx={labelStyles} component={Link} to="/wishlist" color="inherit">Saved Items</Typography>
                    <Typography sx={labelStyles} component={Link} to="/profile" color="inherit">Delivery Addresses</Typography>
                    <Typography sx={labelStyles}>Prescription Guidelines</Typography>
                    <Typography sx={labelStyles}>Privacy & Safety Policy</Typography>
                </Stack>

                {/* Newsletter */}
                <Stack rowGap={'0.8rem'} padding={'0.5rem'} maxWidth="280px">
                    <Typography variant='subtitle1' fontWeight={700} color="#2dd4bf">Health Updates</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.85 }}>Subscribe for seasonal health alerts and medicine discounts.</Typography>
                    <TextField
                        size="small"
                        placeholder='Enter your email'
                        sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: "6px", input: { color: "white" } }}
                        InputProps={{
                            endAdornment: (
                                <IconButton size="small">
                                    <SendIcon sx={{ color: "#2dd4bf", fontSize: 18 }} />
                                </IconButton>
                            )
                        }}
                    />
                </Stack>
            </Stack>

            {/* lower copyright */}
            <Stack alignSelf={"center"} pt={2} borderTop="1px solid rgba(255,255,255,0.1)" width="100%" alignItems="center">
                <Typography variant="caption" color='#94a3b8'>
                    &copy; {new Date().getFullYear()} MedQuick – Medicine & Emergency Essentials Delivery Platform. All rights reserved.
                </Typography>
            </Stack>
        </Stack>
    )
}
