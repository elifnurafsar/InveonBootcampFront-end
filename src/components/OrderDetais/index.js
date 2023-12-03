import React, {useState, useEffect} from "react" 
import { useDispatch, useSelector } from "react-redux"
import { getMyPurchases } from "../../app/Actions/Index"
import ticket from '../../assets/img/svg/ticket.svg' 

const OrderDetails = ({ selectedOrderId }) => {
   
    let myPurchases = useSelector((state) => state.orders.orders);
    const selectedOrder = myPurchases.find(
        (purchase) => purchase.orderHeaderId == selectedOrderId
    );

    const parseDate = (dateString) => {
        if(dateString != null && dateString.length > 10)
            return dateString.substring(0, 10);
        else return "invalid date"
    };

    return (
        <>
           <div className="orderdetails-content">
                <div className="order_comp">
                <img style={{ width: "40px", height: "40px"}} src={ticket} alt="An error occurred!"/>
                <h2 className="title" style={{ color: '#ff4500' }}><strong>Order Details</strong></h2>
                {selectedOrder && (
                    <>
                    <div>
                        <strong style={{ color: '#ffa07a' }}>Order ID:</strong> {selectedOrder.orderHeaderId}
                    </div>
                    <div>
                        <strong style={{ color: '#ffa07a' }}>Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}
                    </div>
                    <div>
                        <strong style={{ color: '#ffa07a' }}>Total:</strong> {selectedOrder.orderTotal}
                    </div>
                    <div>
                        <strong style={{ color: '#ffa07a' }}>Discount:</strong> {selectedOrder.discountTotal}
                    </div>
                    <div>
                        <strong style={{ color: '#ffa07a' }}>Date:</strong> {parseDate(selectedOrder.orderTime)}
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <h3><strong style={{ color: '#ff4500'}}>Order Items</strong></h3>
                    </div>
                    <ul>
                        {selectedOrder.orderDetails.map((orderDetail) => (
                        <li className="order_item" key={orderDetail.OrderDetailsId}>
                            <div>
                                <strong style={{ color: '#ffa07a' }}>Product:</strong> {orderDetail.productName}
                            </div>
                            <div>
                                <strong style={{ color: '#ffa07a' }}>Count:</strong> {orderDetail.count}
                            </div>
                            <div>
                                <strong style={{ color: '#ffa07a' }}>Price:</strong> {orderDetail.price} TL
                            </div>
                        </li>
                        ))}
                    </ul>
                    </>
                )}
                </div>
            </div>
        </>
    )
}

export default OrderDetails