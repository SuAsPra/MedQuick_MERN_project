import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AdminCustomers } from '../features/admin/components/AdminCustomers'
import { Footer } from '../features/footer/Footer'

export const AdminCustomersPage = () => {
    return (
        <>
            <Navbar />
            <AdminCustomers />
            <Footer />
        </>
    )
}
