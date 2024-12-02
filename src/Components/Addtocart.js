import React, { useState } from 'react';
import './Addtocart.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Addtocart() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(100); // Assuming a fixed price
    const [productQuantity, setProductQuantity] = useState('');
    const [cartItems, setCartItems] = useState(() => {
        // Initialize cart items from cookies if present
        const savedCart = Cookies.get('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new cart item
        const newCartItem = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
        };

        // Add the new item to the cart
        const updatedCart = [...cartItems, newCartItem];
        setCartItems(updatedCart);

        // Save updated cart to cookies
        Cookies.set('cartItems', JSON.stringify(updatedCart));

        // Calculate the total number of seats and store it in cookies
        const totalSeats = updatedCart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
        Cookies.set('totalSeats', totalSeats);

        // Reset form fields
        setProductName('');
        setProductQuantity('');
    };

    const handleNavigate = () => {
        navigate('/Viewcart');
    };

    return (
        <div>
            <div className="container my-5">
                <h2 className="text-center mb-4">Add Product to Cart</h2>
                <form onSubmit={handleSubmit} className="border p-4 rounded">
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Enter Your Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter Your Name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Ticket Price ($)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productPrice"
                            value={productPrice}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productQuantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productQuantity"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            placeholder="Enter Quantity"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={handleNavigate}>Add to Cart</button>
                </form>
            </div>
        </div>
    );
}
