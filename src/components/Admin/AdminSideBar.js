import React, { useEffect, useState } from 'react'
import search from '../../assets/img/svg/search.svg'

const AdminSideBar = (props) => {
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        document.querySelectorAll("input[type='radio']").forEach((input) => {
            input.addEventListener('change', function () {
                props.filterEvent(input.value)
            });
        });

        

    }, [props])
   
    return (
        <>
            <div className="col-lg-3">
                <div className="shop_sidebar_wrapper">
                    <div className="shop_sidebar_boxed">
                        <h4>Orders</h4>
                        <form>
                            <label className="custom_boxed">All Orders
                                <input type="radio" name="radio" value="all" defaultChecked />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Returns
                                <input type="radio" name="radio" value="iade" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Late Delivery
                                <input type="radio" name="radio" value="snacks" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Search By User
                                <input type="radio" name="radio" value="user" />
                                <span className="checkmark"></span>
                            </label>
                        </form>
                    </div>
                    
                    <div className="shop_sidebar_boxed">
                        <form>
                            <div className="clear_button">
                                <button className="theme-btn-one btn_sm btn-black-overlay" type="button" onClick={() => { props.filterEvent("all") }}>Filtreyi Temizle</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSideBar
