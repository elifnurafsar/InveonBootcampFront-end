import React from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import AdminLeftSideBar from '../../components/Admin/AdminLeftSideBar'
import Footer from '../../components/Common/Footer'
const AdminPanel = () => {
    return (
        <>
            <Header />
            <Banner title="Order Panel" />
            <AdminLeftSideBar />
            <Footer />
        </>
    )
}

export default AdminPanel