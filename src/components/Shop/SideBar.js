import React, { useEffect, useState } from 'react'
// Import Img
import search from '../../assets/img/svg/search.svg'


const SideBar = (props) => {

    useEffect(() => {
        document.querySelectorAll("input[type='radio']").forEach((input) => {
            input.addEventListener('change', function () {
                props.filterEvent(input.value)
            });
        });

        document.querySelector("input[type='range']").addEventListener('change', function (e) {
            setPrice(e.target.value);
            props.filterEvent(1);
        });

    }, [props])

    const [price, setPrice] = useState(100)

    return (
        <>
            <div className="col-lg-3">
                <div className="shop_sidebar_wrapper">
                    <div className="shop_Search">
                        <form>

                            <input type="text" className="form-control" placeholder="Ara..." onKeyUp={(e) => { props.filterEvent(e) }} />
                            <button><img src={search} alt="img" /></button>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Ürün Kategorileri</h4>
                        <form>
                            <label className="custom_boxed">Tümü
                                <input type="radio" name="radio" value="all" defaultChecked />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Pizzalar
                                <input type="radio" name="radio" value="italian" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Burgerler
                                <input type="radio" name="radio" value="snacks" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Gluten - Free
                                <input type="radio" name="radio" value="gluten_free" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Tatlılar
                                <input type="radio" name="radio" value="dessert" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Sezonluk Sebzeler
                                <input type="radio" name="radio" value="seasonal" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Sağlıklı Menü
                                <input type="radio" name="radio" value="healthy"/>
                                <span className="checkmark"></span>
                            </label>
                        </form>
                    </div>
                    
                    <div className="shop_sidebar_boxed">
                        <h4>Fiyat</h4>
                        <div className="price_filter">
                            <input type="range" min="10" max="200" defaultValue={price} className="form-control-range" id="formControlRange" />
                            <div className="price_slider_amount mt-2">
                                <span>Fiyat : {price}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="shop_sidebar_boxed">
                        <form>
                            <div className="clear_button">
                                <button className="theme-btn-one btn_sm btn-black-overlay" type="button" onClick={() => { props.filterEvent("all") }}>Filtreyi Temizle</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
