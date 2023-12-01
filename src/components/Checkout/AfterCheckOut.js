import React, {useEffect} from "react"
import { useSelector } from "react-redux" 
import { Link } from 'react-router-dom'
import Confetti from "react-confetti"
import err_img from '../../assets/img/svg/error.svg' 
import useWindowSize from 'react-use/lib/useWindowSize'

const AfterCheckOut = () => {

    let error = useSelector((state) => state.shoppingcart.error);
    const { width, height } = useWindowSize()
    /*useEffect(() => {

    }, [error]);
*/
    console.log("Error: ", error);

    return (
        <section id="order_complete_area">
          <div className="container">
            <div>
              <div className="col-md-8">
                {error != null && error=="false" ? (
                  <div className="text-center order_complete">
                    <i className="fa fa-check-circle"></i>
                    <div className="order_complete_heading">
                      <h2>Your Order has been Placed</h2>
                    </div>
                    <p>Thank you for your order! Your order is being prepared... </p>
                    <Confetti
                      numberOfPieces={600}
                      width={width}
                      height={height}
                    />
                    <Link to="/" className="theme-btn-one bg-black btn_sm">Continue Shopping</Link>
                  </div>
                ) : (
                  <div className="text-center order_complete">
                    <img style={{ width: "150px", height: "150px"}} src={err_img} alt="An error occurred!"/>
                    <h3 style={{color: "#dc143c"}}>An Error Occurred During The Payment Process</h3>
                    <Link to="/" className="theme-btn-one bg-black btn_sm">Turn Back Home</Link>       
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    };
    
    
export default AfterCheckOut;