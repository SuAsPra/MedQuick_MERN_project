import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrderUpdateStatus, selectOrders, updateOrderByIdAsync } from '../../order/OrderSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { noOrdersAnimation } from '../../../assets/index'
import Lottie from 'lottie-react'

export const AdminOrders = () => {

  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const [editIndex, setEditIndex] = useState(-1)
  const orderUpdateStatus = useSelector(selectOrderUpdateStatus)
  const theme = useTheme()
  const is1620 = useMediaQuery(theme.breakpoints.down(1620))
  const is480 = useMediaQuery(theme.breakpoints.down(480))

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    dispatch(getAllOrdersAsync())
  }, [dispatch])

  useEffect(() => {
    if (orderUpdateStatus === 'fulfilled' || orderUpdateStatus === 'fullfilled') {
      toast.success("Order status updated successfully")
      dispatch(getAllOrdersAsync())
    } else if (orderUpdateStatus === 'rejected') {
      toast.error("Error updating order status")
    }
  }, [orderUpdateStatus, dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetOrderUpdateStatus())
    }
  }, [dispatch])

  const handleUpdateOrder = (data) => {
    if (editIndex === -1 || !orders[editIndex]) return
    const update = { ...data, _id: orders[editIndex]._id }
    setEditIndex(-1)
    dispatch(updateOrderByIdAsync(update))
  }

  const editOptions = ['Pending', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled']

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return { bgcolor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }
      case 'Confirmed':
        return { bgcolor: '#e0e7ff', color: '#3730a3', border: '1px solid #c7d2fe' }
      case 'Packed':
        return { bgcolor: '#ede9fe', color: '#5b21b6', border: '1px solid #ddd6fe' }
      case 'Out for Delivery':
        return { bgcolor: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }
      case 'Delivered':
        return { bgcolor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' }
      case 'Cancelled':
        return { bgcolor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5' }
      default:
        return { bgcolor: '#f1f5f9', color: '#475569' }
    }
  }

  return (
    <Stack justifyContent={'center'} alignItems={'center'} p={is480 ? 1 : 3}>
      <Stack mt={2} mb={4} width="100%" maxWidth="1400px">
        <Typography variant='h4' fontWeight={800} color="#0f766e" mb={3}>
          Order Management
        </Typography>

        <Stack component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>
          {orders && orders.length > 0 ? (
            <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <Table aria-label="orders table">
                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Medical Items</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Total ($)</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 700 }}>Delivery Address</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Payment</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Date Placed</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Delivery Stage</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow key={order._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{index + 1}</TableCell>
                      <TableCell sx={{ fontSize: "0.8rem", fontFamily: "monospace", color: "text.secondary" }}>
                        {order._id}
                      </TableCell>

                      <TableCell>
                        <Stack spacing={1}>
                          {order.item?.map((p, pIdx) => {
                            const prod = p.product || {}
                            return (
                              <Stack key={pIdx} flexDirection={'row'} alignItems={'center'} columnGap={1.5}>
                                <Avatar src={prod.thumbnail || prod.images?.[0]} variant="rounded" sx={{ width: 36, height: 36, bgcolor: "#f1f5f9" }} />
                                <Stack>
                                  <Typography variant="body2" fontWeight={600}>{prod.title || "Medicine Item"}</Typography>
                                  <Typography variant="caption" color="text.secondary">Qty: {p.quantity}</Typography>
                                </Stack>
                              </Stack>
                            )
                          })}
                        </Stack>
                      </TableCell>

                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        ${order.total}
                      </TableCell>

                      <TableCell align="left">
                        {order.address?.[0] ? (
                          <Stack>
                            <Typography variant="body2" fontWeight={500}>{order.address[0].street}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.address[0].city}, {order.address[0].state} - {order.address[0].postalCode}
                            </Typography>
                          </Stack>
                        ) : (
                          <Typography variant="caption" color="text.secondary">N/A</Typography>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <Chip size="small" label={order.paymentMode} variant="outlined" sx={{ fontWeight: 600 }} />
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="caption" color="text.secondary">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                      </TableCell>

                      {/* Order status & Inline Edit */}
                      <TableCell align="center">
                        {editIndex === index ? (
                          <FormControl size="small" sx={{ minWidth: 140 }}>
                            <InputLabel id="order-status-label">Stage</InputLabel>
                            <Select
                              defaultValue={order.status}
                              labelId="order-status-label"
                              label="Stage"
                              {...register('status', { required: true })}
                            >
                              {editOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <Chip label={order.status} size="small" sx={{ ...getStatusColor(order.status), fontWeight: 700 }} />
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        {editIndex === index ? (
                          <Stack flexDirection="row" justifyContent="center">
                            <IconButton type='submit' color="success" size="small">
                              <CheckCircleOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => setEditIndex(-1)} color="error" size="small">
                              <CloseIcon />
                            </IconButton>
                          </Stack>
                        ) : (
                          <IconButton onClick={() => setEditIndex(index)} size="small" color="primary">
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Stack width={is480 ? "auto" : '30rem'} justifyContent={'center'} alignItems="center" mx="auto" py={6}>
              <Lottie animationData={noOrdersAnimation} style={{ width: 220 }} />
              <Typography textAlign={'center'} variant='h6' color="text.secondary">
                No orders found currently
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
