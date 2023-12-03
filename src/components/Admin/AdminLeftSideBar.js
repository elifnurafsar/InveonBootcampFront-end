import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector}  from "react-redux";
import AdminSideBar from './AdminSideBar'
import err_img from '../../assets/img/svg/chef.svg'
import order_img from '../../assets/img/svg/order.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import { getAllOrders } from "../../app/Actions/Index";
import { useNavigate  } from "react-router-dom";
import search from '../../assets/img/svg/search.svg'

const AdminLeftSideBar = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector((state) => state.user.user);

    /*useEffect(() => {
        dispatch(
            getAllOrders({
                user
            })
        );
    }, []);*/

    const [orders, setOrders] = useState(useSelector((state) => state.orders.orders))
    const [page, setPage] = useState(1)
   // const [email, setEmail] = useState("");
    let allData = [...useSelector((state) => state.orders.orders)];
    let lngth = Math.ceil(allData.length/10);
    let [maxPage, setMaxPage] = useState(lngth);

    const getPage = (page) => {
        if(page){
            let start = (page+1) * 10 - 10;
            let end = (page+1) * 10 -1;
            orders = allData.slice(start, end);
            setOrders(orders);
            setPage(page);
        }
    }

    const emailFilter = (email) => {
        console.log("Email: ", email);
        let selectedOrders = allData.filter(
            (order) => order.email.includes(email)
        );
        console.log("selectedOrders", selectedOrders)
        setOrders(selectedOrders);
    }

    const viewDetails = (orderHeaderId) => {
        console.log("viewDetails ", orderHeaderId);
        navigate(`/order-details/${orderHeaderId}`);
    }

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="shop_Search">
                            <form>
                                <input id="input_area" className='form-control' type="text" onChange={(e) => emailFilter(e.target.value)} placeholder="Search..." />
                                <button><img src={search} alt="img" /></button> 
                            </form>
                        </div>
                        {orders != null && orders.length > 0 ? (
                        <div className="col-lg-9">
                            <div className="row">
                                {orders.map((data, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <Card style={{ width: '18rem', alignItems: 'center' }}>
                                            <Card.Img style={{ width: "150px", height: "150px"}} variant="top" src={order_img} />
                                            <Card.Body style={{textAlign: 'center' }}>
                                                <Card.Title >ID: {data.orderHeaderId}</Card.Title>
                                                <Card.Subtitle>{data.orderTotal} TL</Card.Subtitle>
                                                <Card.Text>
                                                    {data.firstName} {data.lastName}
                                                </Card.Text>
                                                <Button onClick={() => viewDetails(data.orderHeaderId)} variant="primary">Details</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                                <div className="col-lg-12">
                                    <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { getPage(page) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        {[...Array(maxPage)].map((_, index) => (
                                            <li
                                                key={index}
                                                className={`page-item ${page === index +1 ? 'active' : null}`}
                                                onClick={() => { getPage(index + 1) }}
                                            >
                                                <a className="page-link" href="#!">{index + 1}</a>
                                            </li>
                                        ))}
                                        <li className="page-item" onClick={(e) => { getPage(page <maxPage?page+1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        ):
                        <div>
                            <div className="col-lg-9">
                                <img style={{ width: "150px", height: "150px"}} src={err_img} alt="An error occurred!"/>
                                <h3 style={{color: "#dc143c"}}>We are doing our best to make this app useful but this page has not ready yet.</h3>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminLeftSideBar
