import React, {useEffect} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getMyBasket } from "../../app/Actions/Index";

const YourOrder = () => {
    let dispatch = useDispatch();
    let user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(
            getMyBasket({
                user
            })
        );
    }, []);

    let items = useSelector((state) => state.shoppingcart.carts);
    //console.log("ITEMS: ", items);
    const total_amount = items.reduce((total, item) => total + item.price * item.count, 0);

    return (
        <>
            <div className="col-lg-6 col-md-6">
                <h3>Orders</h3>
                <div className="order_table table-responsive">
                    <table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name} <strong> × {item.quantity}</strong></td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <td>{total_amount}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="payment_method">
                    <form>
                        <div className="accordion" id="accordionExample">
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingOne">
                                    <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                        <input type="radio" name="payment" id="html" value="HTML" defaultChecked />
                                        <label htmlFor="html">Para Transferi</label>
                                    </div>
                                </div>
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Direct Bank Transfer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingTwo">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                        <input type="radio" name="payment" id="javascript" value="JavaScript" />
                                        <label htmlFor="javascript">Mobile Bankacılık</label>
                                    </div>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Direct Mobile Transfer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingThree">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseThree">
                                        <input type="radio" name="payment" id="css" value="JavaScript" />
                                        <label htmlFor="css">Paypal</label>
                                    </div>
                                </div>
                                <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="order_button pt-3">
        
                        <Link to="/order-complete" className="theme-btn-one btn-black-overlay btn_sm">
                                Sipariş Ver</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default YourOrder