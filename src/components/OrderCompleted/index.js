import React, {useState, useEffect} from "react" 
import { Link } from 'react-router-dom'
import Confetti from "react-confetti"
import Button from 'react-bootstrap/Button' 
import Form from 'react-bootstrap/Form' 
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { useNavigate  } from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit'
import { getMyBasket, checkout } from "../../app/Actions/Index"

const OrderComplete = () => {
    let user = useSelector((state) => state.user.user);
    const [cvv, setCVV] = useState("") 
    const [cardHolderName, setCardHolderName] = useState("") 
    const [cardNumber, setCardNumber] = useState("") 
    const [expiryMonth, setExpiryMonth] = useState("") 
    const [expiryYear, setExpiryYear] = useState("") 
    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(
            getMyBasket({
                user
            })
        );
    }, []);

    let myCart = useSelector((state) => state.shoppingcart.carts);
    
    const handleConfirmPayment = () => {
        if(user.access_token){
            try{
                let cardDetails = {
                    CardNumber: cardNumber,
                    CVV: cvv,
                    ExpiryMonth: expiryMonth,
                    ExpiryYear: expiryYear,
                    CardHolderName: cardHolderName
                }
                
                let cartHeaderId = 0;
                if(myCart.length > 0){
                    cartHeaderId = myCart[0].CartHeaderId;
                }
                
                dispatch(
                    checkout({
                        user,
                        cardDetails,
                        cartHeaderId
                    })
                )
                
            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                });
            }
            finally{
                navigate('/after-checkout');
            }
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please log in to add items to your basket.',
            });
        }
       
    };

    const onCvvChange = (e) => {
        e.preventDefault() 
        setCVV(e.target.value) 
    }
    
    const onCardHolderNameChange = (e) => {
        e.preventDefault() 
        setCardHolderName(e.target.value) 
    }

    const onExpiryMonthChange = (e) => {
        e.preventDefault() 
        setExpiryMonth(e.target.value) 
    }

    const onExpiryYearChange = (e) => {
        e.preventDefault() 
        setExpiryYear(e.target.value) 
    }

    const onCardNumberChange = (e) => {
        e.preventDefault() 
        setCardNumber(e.target.value) 
    }

  return (
    <section id="order_complete_area" className="ptb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center order_complete">
                <Form key={22}>
                    <Form.Group key={23} className="white_label" onChange={(e) => onCardNumberChange(e)}>
                        <Form.Label key={24}>Card Number</Form.Label>
                        <Form.Control key={25} className="input_box" type="text" autoFocus/>
                    </Form.Group>
                    <Form.Group key={26} className="white_label" onChange={(e) => onCardHolderNameChange(e)}>
                        <Form.Label key={27}>Card Holder Name</Form.Label>
                        <Form.Control key={28} className="input_box" as="textarea" rows={2} />
                    </Form.Group>
                    <Form.Group key={29} className="white_label" onChange={(e) => onCvvChange(e)}>
                        <Form.Label key={30}>CVV</Form.Label>
                        <Form.Control key={31} className="input_box" as="textarea" rows={1} />
                    </Form.Group>
                    <Form.Group key={32} className="white_label" onChange={(e) => onExpiryMonthChange(e)}>
                        <Form.Label key={33}>Expiry Month</Form.Label>
                        <Form.Control key={34} className="input_box" as="textarea" rows={1} />
                    </Form.Group>
                    <Form.Group key={35} className="white_label" onChange={(e) => onExpiryYearChange(e)}>
                        <Form.Label key={36}>Expiry Year</Form.Label>
                        <Form.Control key={37} className="input_box" as="textarea" rows={1} />
                    </Form.Group>
                </Form>
                <button className='input_submit' onClick={() => handleConfirmPayment()}> Confirm Payment </button>       
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default OrderComplete;