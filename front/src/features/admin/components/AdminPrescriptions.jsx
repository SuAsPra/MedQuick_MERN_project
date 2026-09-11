import React, { useState } from 'react'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { toast } from 'react-toastify';

const INITIAL_PRESCRIPTIONS = [
    {
        id: "RX-2026-001",
        customerName: "Rahul Sharma",
        customerEmail: "rahul.sharma@example.com",
        medicineName: "Amoxicillin 500mg Capsules",
        dosage: "500 mg, 3 times daily",
        doctorName: "Dr. S. Mehta, MD (General Medicine)",
        registrationNo: "MCI-48192",
        submittedAt: new Date(Date.now() - 35 * 60 * 1000).toLocaleTimeString(),
        status: "Pending",
        documentName: "Rx_Rahul_Amoxicillin_Signed.pdf"
    },
    {
        id: "RX-2026-002",
        customerName: "Demo Customer",
        customerEmail: "customer@medquick.com",
        medicineName: "Lipitor Atorvastatin 20mg",
        dosage: "20 mg once daily at bedtime",
        doctorName: "Dr. Ananya Roy, DM (Cardiology)",
        registrationNo: "DMC-77210",
        submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleTimeString(),
        status: "Verified",
        documentName: "Rx_Customer_Lipitor.pdf"
    },
    {
        id: "RX-2026-003",
        customerName: "Priya Patel",
        customerEmail: "priya.patel@example.com",
        medicineName: "Amoxicillin 500mg Capsules",
        dosage: "500 mg, twice daily",
        doctorName: "Dr. K. Verma, MS (ENT)",
        registrationNo: "UPMC-19340",
        submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toLocaleTimeString(),
        status: "Pending",
        documentName: "Rx_Priya_Antibiotic.pdf"
    }
]

export const AdminPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS)
    const theme = useTheme()
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    const handleApprove = (id) => {
        setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: "Verified" } : p))
        toast.success(`Prescription ${id} verified and approved successfully`)
    }

    const handleReject = (id) => {
        setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: "Rejected" } : p))
        toast.info(`Prescription ${id} marked as rejected`)
    }

    const pendingCount = prescriptions.filter(p => p.status === 'Pending').length
    const verifiedCount = prescriptions.filter(p => p.status === 'Verified').length
    const rejectedCount = prescriptions.filter(p => p.status === 'Rejected').length

    return (
        <Stack justifyContent="center" alignItems="center" p={is480 ? 1 : 3}>
            <Stack mt={2} mb={4} width="100%" maxWidth="1400px" spacing={3}>
                
                {/* Header */}
                <Stack>
                    <Typography variant="h4" fontWeight={800} color="#0f766e">
                        Prescription Verification Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        V1 Pharmacist Review: Review and verify doctor prescriptions submitted by customers for Rx-required medications.
                    </Typography>
                </Stack>

                {/* Summary metrics */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Card elevation={1} sx={{ borderRadius: "12px", border: "1px solid #fde68a", bgcolor: "#fffbeb" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
                                <PendingActionsIcon sx={{ fontSize: 36, color: "#d97706" }} />
                                <Box>
                                    <Typography variant="h4" fontWeight={800} color="#92400e">{pendingCount}</Typography>
                                    <Typography variant="caption" fontWeight={600} color="#b45309">PENDING VERIFICATION</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card elevation={1} sx={{ borderRadius: "12px", border: "1px solid #bbf7d0", bgcolor: "#f0fdf4" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
                                <AssignmentTurnedInIcon sx={{ fontSize: 36, color: "#16a34a" }} />
                                <Box>
                                    <Typography variant="h4" fontWeight={800} color="#166534">{verifiedCount}</Typography>
                                    <Typography variant="caption" fontWeight={600} color="#15803d">VERIFIED & DISPATCHABLE</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card elevation={1} sx={{ borderRadius: "12px", border: "1px solid #fca5a5", bgcolor: "#fef2f2" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
                                <HighlightOffIcon sx={{ fontSize: 36, color: "#dc2626" }} />
                                <Box>
                                    <Typography variant="h4" fontWeight={800} color="#991b1b">{rejectedCount}</Typography>
                                    <Typography variant="caption" fontWeight={600} color="#b91c1c">REJECTED / INVALID</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Prescriptions Table */}
                <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <Table aria-label="prescriptions table">
                        <TableHead sx={{ bgcolor: "#f8fafc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Rx ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Customer Details</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Medication & Dosage</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Doctor & Medical Registration</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Prescription Document</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700 }}>Verification Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {prescriptions.map((rx) => (
                                <TableRow key={rx.id} hover>
                                    <TableCell sx={{ fontWeight: 700, fontFamily: "monospace", color: "#0f766e" }}>
                                        {rx.id}
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="body2" fontWeight={600}>{rx.customerName}</Typography>
                                        <Typography variant="caption" color="text.secondary">{rx.customerEmail}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="body2" fontWeight={600} color="error.main">
                                            {rx.medicineName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">{rx.dosage}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="body2" fontWeight={500}>{rx.doctorName}</Typography>
                                        <Typography variant="caption" color="text.secondary">Reg: {rx.registrationNo}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            icon={<DescriptionOutlinedIcon />}
                                            label={rx.documentName}
                                            size="small"
                                            variant="outlined"
                                            onClick={() => toast.info(`Viewing prescription document: ${rx.documentName}`)}
                                            sx={{ cursor: "pointer", maxWidth: 180 }}
                                        />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip
                                            label={rx.status}
                                            size="small"
                                            color={rx.status === 'Verified' ? 'success' : rx.status === 'Pending' ? 'warning' : 'error'}
                                            sx={{ fontWeight: 700 }}
                                        />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Stack flexDirection="row" justifyContent="center" columnGap={1}>
                                            <Tooltip title="Approve Prescription">
                                                <span>
                                                    <IconButton
                                                        color="success"
                                                        size="small"
                                                        disabled={rx.status === 'Verified'}
                                                        onClick={() => handleApprove(rx.id)}
                                                    >
                                                        <CheckCircleOutlineIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Reject Prescription">
                                                <span>
                                                    <IconButton
                                                        color="error"
                                                        size="small"
                                                        disabled={rx.status === 'Rejected'}
                                                        onClick={() => handleReject(rx.id)}
                                                    >
                                                        <HighlightOffIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    )
}
