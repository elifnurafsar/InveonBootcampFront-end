import React, {useState} from "react";
import { useSelector, useDispatch }  from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineHeart} from 'react-icons/ai';
import { toggleFavorite } from "../../../app/Actions/Index";
import Swal from "sweetalert2";

//Her bir ürünü temsil edecek
const ProductCard = (props) => {
    let dispatch=  useDispatch();
    let user = useSelector((state) => state.user.user);
    let favs = useSelector((state) => state.products.favorites);

    const sepeteEkle = async(id) => {
        console.log( id, " tıklandı");
        dispatch({type :"products/AddToCart", payload : {id}})
    }

    // Add to Favorite
    const addToFav = (productId) => {
        if(user.access_token){
            // Check if the product is already in favorites
            if (favs.find((fav) => fav.productId === productId)) {
                Swal.fire({
                    icon: 'info',
                    title: 'Already in Favorites',
                    text: 'This product is already in your favorites!',
                });
            } else {
                try{
                    dispatch(
                        toggleFavorite({
                            user,
                            productId,
                            _action: 'add'
                        })
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Added to Favorites',
                        text: 'This product has been added to your favorites!',
                    });
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
                <button type="button" className="add-to-cart offcanvas-toggle" onClick={() => sepeteEkle(props.data.productId)}>
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