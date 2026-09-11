import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsersAsync, selectUserStatus, selectUsers } from '../../user/UserSlice'
import {
    Avatar,
    Box,
    Chip,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Lottie from 'lottie-react'
import { loadingAnimation } from '../../../assets'

export const AdminCustomers = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectUsers)
    const status = useSelector(selectUserStatus)
    const theme = useTheme()
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        dispatch(fetchAllUsersAsync())
    }, [dispatch])

    return (
        <Stack justifyContent="center" alignItems="center" p={is480 ? 1 : 3}>
            <Stack mt={2} mb={4} width="100%" maxWidth="1200px" spacing={3}>
                
                {/* Header */}
                <Stack flexDirection="row" alignItems="center" columnGap={1.5}>
                    <Box sx={{ bgcolor: "#0284c7", color: "white", p: 1, borderRadius: "10px" }}>
                        <PeopleAltOutlinedIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Stack>
                        <Typography variant="h4" fontWeight={800} color="#0f766e">
                            Customer Directory
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            View registered customer accounts, authentication status, and platform access.
                        </Typography>
                    </Stack>
                </Stack>

                {/* Users Table */}
                {status === 'pending' && (!users || users.length === 0) ? (
                    <Stack width="100%" height="250px" justifyContent="center" alignItems="center">
                        <Lottie animationData={loadingAnimation} style={{ width: 140 }} />
                    </Stack>
                ) : (
                    <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <Table aria-label="customers table">
                            <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>User ID</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700 }}>Account Role</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700 }}>Email Verified</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users && users.map((user, index) => (
                                    <TableRow key={user._id} hover>
                                        <TableCell>{index + 1}</TableCell>
                                        
                                        <TableCell>
                                            <Stack flexDirection="row" alignItems="center" columnGap={1.5}>
                                                <Avatar sx={{ width: 34, height: 34, bgcolor: user.isAdmin ? "#0f766e" : "#0284c7", fontSize: "0.85rem" }}>
                                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                </Avatar>
                                                <Typography variant="body2" fontWeight={600}>{user.name}</Typography>
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="body2" color="text.primary">{user.email}</Typography>
                                        </TableCell>

                                        <TableCell sx={{ fontSize: "0.8rem", fontFamily: "monospace", color: "text.secondary" }}>
                                            {user._id}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Chip
                                                label={user.isAdmin ? "Administrator" : "Customer"}
                                                size="small"
                                                color={user.isAdmin ? "primary" : "default"}
                                                variant={user.isAdmin ? "filled" : "outlined"}
                                                sx={{ fontWeight: 700 }}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            <Chip
                                                icon={<CheckCircleOutlineIcon sx={{ fontSize: "16px !important" }} />}
                                                label={user.isVerified ? "Verified" : "Pending"}
                                                size="small"
                                                color={user.isVerified ? "success" : "warning"}
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Stack>
        </Stack>
    )
}
