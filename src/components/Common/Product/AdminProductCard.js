import React from "react";
import {Link} from "react-router-dom";
const AdminProductCard = (props) => {

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

export default AdminProductCard