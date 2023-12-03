import React, { useEffect, useState } from 'react'
// Import Img
import search from '../../assets/img/svg/search.svg'


const SideBar = (props) => {

    const [queryName, setqueryName] = useState("")
    const [queryPrice, setqueryPrice] = useState(0)
    const [queryCategory, setqueryCategory] = useState("all")

    useEffect(() => {
        document.querySelectorAll("input[type='radio']").forEach((input) => {
            input.addEventListener('change', function () {
                setqueryCategory(input.value)
                props.filterEvent(0, input.value, 0, false)
            });
        });

        document.querySelector("input[type='number']").addEventListener('change', function (e) {
            setqueryPrice(e.target.value);
            props.filterEvent(queryName, queryCategory, e.target.value, false);
        });

    }, [props])

    const setDefault = () =>{
        setqueryName("");
        setqueryCategory("all");
        setqueryPrice(0)
        props.filterEvent("", "", 0, true)
    }

    const setMaxPrice = (e) =>{
        e.preventDefault();
        console.log(e.target.value)
        setqueryPrice(e.target.value)
        props.filterEvent(queryName, queryCategory, e.target.value, false);
    }

    return (
        <>
            <div className="col-lg-3">
                <div className="shop_sidebar_wrapper">
                    <div className="shop_Search">
                        <form>
                            <input type="text" className="form-control" placeholder="Ara..." onChange={(e)=>props.filterEvent(e.target.value, queryCategory, queryPrice, false)}/>
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
                                <input type="radio" name="radio" value="snack" />
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
                            <div style={{flexDirection: "row"}}>
                                <div style={{flex:1}}>
                                    <label style={{justifyContent: 'flex-end'}}> 
                                        Max Fiyat:
                                        <input type="number" name="price_max" onChange={(e)=>setMaxPrice(e)}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="shop_sidebar_boxed">
                        <form>
                            <div className="clear_button">
                                <button className="theme-btn-one btn_sm btn-black-overlay" type="button" onClick={() =>  setDefault() }>Filtreyi Temizle</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
