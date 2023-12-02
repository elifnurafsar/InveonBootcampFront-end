import React, {useState, useEffect} from "react" 
import { useDispatch, useSelector } from "react-redux"
import { getMyPurchases } from "../../app/Actions/Index"
import { useNavigate  } from "react-router-dom";

const Order = () => {
    let user = useSelector((state) => state.user.user);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getMyPurchases({
                user
            })
        );
    }, []);

    let myPurchases = useSelector((state) => state.orders.orders);
    const navigate = useNavigate();

    const viewDetails = (orderHeaderId) => {
        console.log("viewDetails ", orderHeaderId);
        navigate(`/order-details/${orderHeaderId}`);
    }

    const parseDate = (dateString) => {
        if(dateString != null && dateString.length > 10)
            return dateString.substring(0, 10);
        else return "invalid date"
    };


    return (
        <>
        <div className="myaccount-content">
          <h4 className="title">My Purchases</h4>
          <div className="table_page table-responsive">
            {myPurchases && myPurchases.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myPurchases.map((purchase) => (
                    <tr key={purchase.orderHeaderId}>
                      <td>{purchase.orderHeaderId}</td>
                      <td>{parseDate(purchase.orderTime)}</td>
                      <td>{purchase.orderTotal} TL</td>
                      <td>
                        <button onClick={() => viewDetails(purchase.orderHeaderId)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No purchases yet.</p>
            )}
          </div>
        </div>
      </>
    )
}

export default Order
