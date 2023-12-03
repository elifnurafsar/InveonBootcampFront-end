import React, { useState, useEffect } from 'react'
import { useSelector }  from "react-redux";
import SideBar from './SideBar'
import ProductCard from '../Common/Product/ProductCard'
import AdminProductCard from '../Common/Product/AdminProductCard'
import err_img from '../../assets/img/svg/chef.svg' 

const LeftSideBar = () => {
   
    const [products, setProducts] = useState(useSelector((state) => state.products.products).slice(0,9))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    let user = useSelector((state) => state.user.user);
    let lngth = Math.ceil(allData.length/10);
    let [maxPage, setMaxPage] = useState(lngth);

    const randProduct = (page) => {
        if(page){
            let start = ((page-1) * 10);
            let end = start + 9;
            let data = allData.slice(start, end)
            setProducts(data);
            setPage(page);
        }
    }

    const complexFilter = (name, category, price, reset) => {
       
        if(reset){
            setProducts(allData);
            setMaxPage(Math.ceil(allData.length/10));
        }
        
        else{
            let new_products = allData;
            if(category.length > 0){
                if(category == "all"){
                    setProducts(allData);
                    setMaxPage(Math.ceil(allData.length/10));
                }
               else{
                    new_products = allData.filter(product =>
                        product.categoryName.toLowerCase().includes(category.toLowerCase()))
               }
                
            }

            // Filter by name
            if(name.length > 0){
                console.log("name filter")
                new_products = new_products.filter(product =>
                    product.name.toLowerCase().includes(name.toLowerCase()))
                //setProducts(new_products);
                //setMaxPage(Math.ceil(new_products.length/10));
            }
            
            // Filter by price
            if(price > 10){
                console.log("price filter")
                new_products = new_products.filter((product =>
                    product.price <= price))
                //setProducts(new_products);
                //setMaxPage(Math.ceil(new_products.length/10));
            }
            setProducts(new_products)
            setMaxPage(Math.ceil(new_products.length/10));
        }
        
    }

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <SideBar filterEvent={complexFilter}/>
                        {products != null && products.length > 0 ? (
                        <div className="col-lg-9">
                            <div className="row">
                                {products.map((data, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        {user != null && user.role == "Admin" ? (
                                                <AdminProductCard data={data} />
                                            ):(
                                                <ProductCard data={data} />
                                            )
                                        }
                                       
                                    </div>
                                ))}
                                <div className="col-lg-12">
                                    <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { randProduct(page >1?page-1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        {[...Array(maxPage)].map((_, index) => (
                                            <li
                                                key={index}
                                                className={`page-item ${page === index + 1 ? 'active' : null}`}
                                                onClick={() => { randProduct(index + 1) }}
                                            >
                                                <a className="page-link" href="#!">{index + 1}</a>
                                            </li>
                                        ))}
                                        <li className="page-item" onClick={(e) => { randProduct(page <maxPage?page+1:0) }}>
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
                                <h3 style={{color: "#dc143c"}}>Keep tracking, new flavours are coming soon...</h3>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default LeftSideBar
