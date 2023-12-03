import React from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import AdminAddProductComponent from '../../components/Admin/AdminAddProductComponent'
import Footer from '../../components/Common/Footer'
const AdminAddProduct = () => {
    return (
        <>
            <Header />
            <Banner title="Add Product" />
            <AdminAddProductComponent />
            <Footer />
        </>
    )
}

export default AdminAddProduct