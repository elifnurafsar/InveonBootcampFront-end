import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import userManager from "./userManager"
import axios from 'axios';
import { useDispatch}  from "react-redux";
import { getAllProducts, getProductsByCategory, getUserFavorites, getAllOrders } from "./app/Actions/Index";
import { useEffect } from "react";
import loadable from "./components/Common/loadable";
import pMinDelay from "p-min-delay";
import Loader from "./components/Common/Loader";
import './assets/css/style.css';
import './assets/css/animate.min.css';
import './assets/css/color.css';

const Fashion = loadable(() => pMinDelay(import('./page/'), 250), { fallback: <Loader /> });
const Register = loadable(() => pMinDelay(import('./page/register'), 250), { fallback: <Loader /> });
const ProductDetailsTwos = loadable(() => pMinDelay(import('./page/Product/product-details-two'), 250), { fallback: <Loader /> });
const About = loadable(() => pMinDelay(import('./page/about'), 250), { fallback: <Loader /> });
const ContactTwo = loadable(() => pMinDelay(import('./page/Contact/contact-two'), 250), { fallback: <Loader /> });
const Login = loadable(() => pMinDelay(import('./page/login'), 250), { fallback: <Loader /> });
const Cart = loadable(() => pMinDelay(import('./page/cart/index'), 250), { fallback: <Loader /> });
const Favorites = loadable(() => pMinDelay(import('./page/Wishlist/index'), 250), { fallback: <Loader /> });
const ShopLeftSideBar = loadable(() => pMinDelay(import('./page/shop/shop-left-sidebar'), 250), { fallback: <Loader /> });
const OrderComplete = loadable(() => pMinDelay(import('./page/order/order-complete'), 250), { fallback: <Loader /> });
const CheckoutTwo = loadable(() => pMinDelay(import('./page/checkout/checkout-two'), 250), { fallback: <Loader /> });
const CustomerOrder = loadable(() => pMinDelay(import('./page/my-account/customer-order'), 250), { fallback: <Loader /> });
const CustomerAddress = loadable(() => pMinDelay(import('./page/my-account/customer-address'), 250), { fallback: <Loader /> });
const CustomerAccountDetails = loadable(() => pMinDelay(import('./page/my-account/customer-account-details'), 250), { fallback: <Loader /> });
const CallbackPage = loadable(() => pMinDelay(import('./components/CallbackPage'), 250), { fallback: <Loader /> });
const OrderMessage = loadable(() => pMinDelay(import('./page/checkout/OrderMessage'), 250), { fallback: <Loader /> });
const OrderDetailsPage = loadable(() => pMinDelay(import('./page/order/OrderDetailsPage'), 250), { fallback: <Loader /> });
const ChatPage = loadable(() => pMinDelay(import('./page/chat/ChatPage'), 250), { fallback: <Loader /> });
const AdminPanel = loadable(() => pMinDelay(import('./page/admin/AdminPanel'), 250), { fallback: <Loader /> });
const AdminAddProduct = loadable(() => pMinDelay(import('./page/admin/AdminAddProduct'), 250), { fallback: <Loader /> });

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    userManager.getUser().then(user => {
      if (user && !user.expired) {
        if(user.profile.role == "Admin"){
          dispatch(
              getAllOrders({
                  user
              })
          );
        }
        else if(user.profile.role == "Customer"){
          dispatch(
            getUserFavorites({
                  user
              })
          );
        }
        const userProfile = {
          name: user.profile.name,
          role: user.profile.role,
          email: user.profile.preferred_username,
          id_token: user.id_token,
          access_token: user.access_token,
          user_id: user.profile.sub,
          role: user.profile.role
        }
        dispatch({ type: "user/login", payload: { user: userProfile, status: true } })
      }
    });
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


  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Fashion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/signout-callback-oidc" element={ <Navigate to="/" /> } />
          <Route path="/product-details-two/:id" element={<ProductDetailsTwos />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactTwo />} />
          <Route path='/order-complete' element={<OrderComplete />} />
          <Route path="/checkout-two" element={<CheckoutTwo />} />
          <Route path="/my-account/customer-order" element={<CustomerOrder />} />
          <Route path="/my-account/customer-address" element={<CustomerAddress />} />
          <Route path="/my-account/customer-account-details" element={<CustomerAccountDetails />} />
          <Route path="/shop/shop-left-sidebar" element={<ShopLeftSideBar />} />
          <Route path="/panel" element={<AdminPanel />} />
          <Route path="/after-checkout" element={<OrderMessage />} />
          <Route path="/order-details/:orderHeaderId" element={<OrderDetailsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/admin-add-product" element={<AdminAddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
