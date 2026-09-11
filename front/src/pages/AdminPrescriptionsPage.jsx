import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AdminPrescriptions } from '../features/admin/components/AdminPrescriptions'
import { Footer } from '../features/footer/Footer'

export const AdminPrescriptionsPage = () => {
    return (
        <>
            <Navbar />
            <AdminPrescriptions />
            <Footer />
        </>
    )
}
