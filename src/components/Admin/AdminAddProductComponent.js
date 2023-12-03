import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector}  from "react-redux";
import { addProduct } from '../../app/Actions/Index';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import { useNavigate  } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLeftSideBar = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector((state) => state.user.user);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    
    const addThisProduct = () => {
        if (user && user.role === 'Admin') {
            let product = {
                ProductId: 0,
                Name: name,
                Price: price,
                Description: description,
                CategoryName: categoryName,
                ImageUrl: imageUrl
            }
            dispatch(
                addProduct({
                    user,
                    product
                })
            );
            
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Unauthorized',
            text: 'You are not authorized to add a product.',
          });
          //navigate(`/`);
        }
    }

    return (
        <section id="addProd" className="container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{paddingTop: '5px'}}>
                    <Card style={{ width: '26rem', alignItems: 'center' }}>
                        <Card.Header>
                            <Card.Title>Add Product</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div style={{width: "100%", padding: "5px 10px", margin: "8px 0"}}>
                                <label>Product Name:</label>
                                <input
                                type="text"
                                onChange={(e) => {setName(e.target.value)}}
                                />
                            </div>
                            <div style={{width: "100%", padding: "5px 10px", margin: "8px 0"}}>
                                <label>Product Price:</label>
                                <input
                                type="number"
                                onChange={(e) => {setPrice(e.target.value)}}
                                />
                            </div>
                            <div style={{width: "100%", padding: "5px 10px", margin: "8px 0"}}>
                                <label>Product Description:</label>
                                <textarea
                                onChange={(e) => {setDescription(e.target.value)}}
                                />
                            </div>
                            <div style={{width: "100%", padding: "5px 10px", margin: "8px 0"}}>
                                <label>Product Category:</label>
                                <input
                                type="text"
                                onChange={(e) => {setCategoryName(e.target.value)}}
                                />
                            </div>
                            <div style={{width: "100%", padding: "12px 10px", margin: "8px 0"}}>
                                <label>Product Image URL:</label>
                                <input
                                type="text"
                                onChange={(e) => {setImageUrl(e.target.value)}}
                                />
                            </div>
                            <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={() => addThisProduct()}>Add Product</button>
                            
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default AdminLeftSideBar
