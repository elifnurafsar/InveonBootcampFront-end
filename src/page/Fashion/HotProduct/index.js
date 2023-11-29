import Heading from "../Heading"
import React from "react"
import { useSelector }  from "react-redux";
import ProductCard from "../../../components/Common/Product/ProductCard"; 

const HotProduct = () => {

    const TumUrunler = useSelector((state) => state.products.products);
    const healthy = useSelector((state) => state.products.healthy);
    const snacks = useSelector((state) => state.products.snacks);
    const dessert = useSelector((state) => state.products.dessert);
    const gluten_free = useSelector((state) => state.products.gluten_free);
    const italian = useSelector((state) => state.products.italian);
    const seasonal = useSelector((state) => state.products.seasonal);
    
    return(
        <>
        <section id="hot-Product_area" className="ptb-100">
             <div className="container">
                <Heading baslik="Mutfağın Popülerleri" 
                 altBaslik="Burası Sizin Sofranız" />
                 <div className="row">
                  <div className="col-lg-12">
                    <div className="tabs_center_button">
                        <ul className="nav nav-tabs">
                            <li><a data-toggle="tab" href="#new_arrival" className="active">Tam Mevsimi</a></li>
                            <li><a data-toggle="tab" href="#trending">Snack Shop</a></li>
                            <li><a data-toggle="tab" href="#best_sellers">Dt. Beyza Çulha'nın Tarifleri</a></li>
                            <li><a data-toggle="tab" href="#featured">İtalyan Şef Lorenzo Mossi</a></li>
                            <li><a data-toggle="tab" href="#on_sall">Şimdi Mutfakta</a></li>
                        </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="tabs_el_wrapper">
                        <div className="tab-content">
                            <div id="new_arrival" className="tab-pane fade show in active">
                                <div className="row">
                               {seasonal.map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="trending" className="tab-pane fade">
                            <div className="row">
                               {snacks.map((urun, index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="best_sellers" className="tab-pane fade">
                            <div className="row">
                               {healthy.map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="featured" className="tab-pane fade">
                            <div className="row">
                               {italian.map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="on_sall" className="tab-pane fade">
                            <div className="row">
                               {gluten_free.map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                        </div>
                    </div>
                  </div>
                 </div>
             </div>
        </section>
        </>
    )
}

export default HotProduct