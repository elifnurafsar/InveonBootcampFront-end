import React, {useState, useEffect} from "react";
import { useSelector, useDispatch }  from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineHeart} from 'react-icons/ai';
import { toggleFavorite, addToMyBasket, getProductByID } from "../../../app/Actions/Index";
import Swal from "sweetalert2";

//Her bir ürünü temsil edecek
const ProductCard = (props) => {
    let dispatch=  useDispatch();
    let user = useSelector((state) => state.user.user);
    useEffect(() => {
        dispatch(getProductByID(props.data.productId));
    }, []);

    let product = useSelector((state) => state.products.single);

    const addToCart = async(productId) => {
        console.log("Sepete Ekle Methodu: ", productId);
        if(user.access_token){
            try{
                dispatch(
                    addToMyBasket({
                        user,
                        product,
                        count: 1
                    })
                );
            }
            catch (error) {
                // Show a Swal alert for errors during dispatch
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'An error occurred while adding to basket. Please try again.',
                });
            }
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please log in to add items to your basket.',
            });
        }
    }

    // Add to Favorite
    const addToFav = (productId) => {
        if(user.access_token){
            try{
                dispatch(
                    toggleFavorite({
                        user,
                        productId,
                        _action: 'add'
                    })
                );
            }
            catch (error) {
                // Show a Swal alert for errors during dispatch
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'An error occurred while adding to favorites. Please try again.',
                });
            }
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please log in to add items to your favorites.',
            });
        }
    }

    //console.log("Insidecard ", props.data.name);
    return(
        <>
         <div className="product_wrappers_one">
            <div className="thumb">
                <Link to={`/product-details-two/${props.data.productId}`} className="image">
                    <img  src={props.data.imageUrl} alt={props.data.name}></img>
                    <img className="hover-image" src={props.data.imageUrl} alt={props.data.name} />
                </Link>
                <span className="badges">
                    <span className={(['yaz','yeni','satışta'][Math.round(Math.random()*2)])} >
                        {props.data.categoryName}
                    </span>
                </span>
                <div className="actions">
                    <a href="#!" className="action wishlist" title="Favorilere Ekle"
                        onClick={() => addToFav(props.data.productId)} ><AiOutlineHeart />
                    </a>
                </div>
                <button type="button" className="add-to-cart offcanvas-toggle" onClick={() => addToCart(props.data.productId)}>
                    Sepete Ekle
                </button>
             </div>
             <div className="content">
                <h5 className="title">
                    <Link to={`/product-details-two/${props.data.productId}`}>{props.data.name}</Link>
                </h5>
                <span className="price">
                    <span className="new">{props.data.price}.00 TL</span>
                </span>
             </div>
               
            </div>
        </>
    )
}

export default ProductCard