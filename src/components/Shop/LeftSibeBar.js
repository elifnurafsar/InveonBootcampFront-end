import React, { useState, useEffect } from 'react'
import { useSelector }  from "react-redux";
import SideBar from './SideBar'
import ProductCard from '../Common/Product/ProductCard'
import err_img from '../../assets/img/svg/chef.svg' 

const LeftSideBar = () => {
   
    const [products, setProducts] = useState(useSelector((state) => state.products.products).slice(0,9))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    const healthy = useSelector((state) => state.products.healthy);
    const snacks = useSelector((state) => state.products.snacks);
    const dessert = useSelector((state) => state.products.dessert);
    const gluten_free = useSelector((state) => state.products.gluten_free);
    const italian = useSelector((state) => state.products.italian);
    const seasonal = useSelector((state) => state.products.seasonal);
    let lngth = Math.ceil(allData.length/10);
    let [maxPage, setMaxPage] = useState(lngth);

    const randProduct = (page) => {
        if(page){
            let data = allData.sort((a, b) => 0.5 - Math.random())
            data = data.slice(0,9);
            setProducts(data);
            setPage(page);
        }
    }

    const categoryFilter = (category) => {
        if(category == "seasonal"){
            setProducts(seasonal);
            setMaxPage(Math.ceil(seasonal.length/10));
        }
        else if(category == "dessert"){
            setProducts(dessert);
            setMaxPage(Math.ceil(dessert.length/10));
        }
        else if(category == "italian"){
            setProducts(italian);
            setMaxPage(Math.ceil(italian.length/10));
        }
        else if(category == "gluten_free"){
            setProducts(gluten_free);
            setMaxPage(Math.ceil(gluten_free.length/10));
        }
        else if(category == "snacks"){
            setProducts(snacks);
            setMaxPage(Math.ceil(snacks.length/10));
        }
        else if(category == "healthy"){
            setProducts(healthy);
            setMaxPage(Math.ceil(healthy.length/10));
        }
        else {
            setProducts(allData);
            setMaxPage(Math.ceil(allData.length/10));
        }
    }

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <SideBar filterEvent={categoryFilter}/>
                        {products != null && products.length > 0 ? (
                        <div className="col-lg-9">
                            <div className="row">
                                {products.map((data, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard data={data} />
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
