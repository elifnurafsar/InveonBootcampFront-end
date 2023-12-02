import React from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import OrderDetais from '../../components/OrderDetais'
import Footer from '../../components/Common/Footer'
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
    const { orderHeaderId } = useParams();
    return (
        <>
            <Header />
            <Banner title="Siparişiniz Alındı" />
            <OrderDetais selectedOrderId={orderHeaderId} />
            <Footer />
        </>
    )
}

export default OrderDetailsPage