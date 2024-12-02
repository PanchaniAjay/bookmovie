import React, { useState, useEffect } from 'react';
import './Viewcart.css';
import Cookies from 'js-cookie';

export default function Viewcart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const savedCart = Cookies.get('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // total item are store in cookies
        const total = cartItems
            .map(item => item.quantity.toString())
            .reduce((acc, quantityStr) => acc + Number(quantityStr), 0);

        setTotalQuantity(total);

        // Store total quantity in cookies
        Cookies.set('totalQuantity', total);
    }, [cartItems]);

    return (
        <div className='mainviewcart'>
            <div className="container">
                <div className="row">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="cart-card">
                                    <div className="row">

                                        <div className="col-8 item-details">
                                            <h5>{item.name}</h5>
                                            <p>Quantity: {item.quantity}</p>
                                            <div className="d-flex justify-content-between">
                                                <h5>Price</h5>
                                                <span className="item-price">${item.price}</span>
                                            </div>
                                            <div>
                                                <h5>Total item price</h5>
                                                <p>${item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="total-quantity">
                        <h3>Total Booked sheat: {totalQuantity}</h3>
                        <h5>You can only book 10 seats </h5>
                    </div>
                )}
            </div>
        </div>
    );
}
