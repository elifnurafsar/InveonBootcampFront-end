// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import TopHeader from "../components/Common/Header/TopHeader";
import Header from "../components/Common/Header";
import FashionBanner from "./Fashion/Banner";
import BannerBottom from "./Fashion/BannerBottom";
import HotProduct from "./Fashion/HotProduct";
import Footer from "../components/Common/Footer";
import { useDispatch, useSelector}  from "react-redux";
import { getAllProducts, getProductsByCategory, getUserFavorites } from "../app/Actions/Index";

const Fashion = () => {

    const dispatch = useDispatch();
    let user = useSelector((state) => state.user.user);
    useEffect(() => {
        dispatch(getAllProducts());

        // Dispatch the action to fetch products by category for 'healthy'
        dispatch(getProductsByCategory('healthy'));
    
        // Dispatch the action to fetch products by category for 'snacks'
        dispatch(getProductsByCategory('snack'));
    
        // Dispatch the action to fetch products by category for 'dessert'
        dispatch(getProductsByCategory('dessert'));
    
        // Dispatch the action to fetch products by category for 'gluten_free'
        dispatch(getProductsByCategory('gluten_free'));
    
        // Dispatch the action to fetch products by category for 'italian'
        dispatch(getProductsByCategory('italian'));
    
        // Dispatch the action to fetch products by category for 'seasonal'
        dispatch(getProductsByCategory('seasonal'));

    }, []);

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