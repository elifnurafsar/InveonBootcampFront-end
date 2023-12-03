// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import { useDispatch, useSelector}  from "react-redux";
import TopHeader from "../components/Common/Header/TopHeader";
import Header from "../components/Common/Header";
import FashionBanner from "./Fashion/Banner";
import BannerBottom from "./Fashion/BannerBottom";
import HotProduct from "./Fashion/HotProduct";
import Footer from "../components/Common/Footer";
import {getAllOrders } from "../app/Actions/Index";

const Fashion = () => {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user.user);
    useEffect(() => { 
        if(user.role == "Admin"){
            dispatch(
                getAllOrders({
                    user
                })
            );
          }
    });
    return(
        <div>
            <TopHeader />
            <Header />
            <FashionBanner />
            <BannerBottom />
            <HotProduct />
            <Footer />
        </div>
    )
}
export default Fashion