import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewCart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => 
    {
        const viewcart = async () => 
        {
            try 
            {
                const res = await axios.get('http://localhost:5001/viewcart', {withCredentials: true});
                if(res.status===200)
                {
                    setCart(res.data.cart || []);
                }
            }
            catch (err)
            {
                console.log("Error fetching cart:", err.message);
            }
        }
        
        viewcart();
    }, []);

   
    let totalPrice = 0;
    (cart || []).forEach(item => 
    {
        if (item && item.product && item.product.price) 
        {
            totalPrice += item.quantity * item.product.price;
        }
    });

    let tax = 0.05 * totalPrice;
    const price_pay = totalPrice + tax;


    const handlePay = async () => {
        try 
        {
            const res = await axios.post("http://localhost:5001/payment", { amount: price_pay }, { withCredentials: true });

            if (res.data.success) 
            {
                alert('Payment Successful \nThank You for shopping with us!');
                navigate("/");
                setCart([]);
            }
        } 
        catch (err) 
        {
            console.log("Payment failed:", err.message);
        }
    };

    const handleDelete = async (id) => 
    {
        try 
        {
            const res = await axios.delete(`http://localhost:5001/deleteitem/${id}`,{ withCredentials: true });
            if (res.status === 200) 
            {
                setCart(cart.filter(item => item._id !== id));
            } 
            else 
            {
                console.log("Delete failed");
            }
        } 
        catch (err) 
        {
            console.log("Delete failed:", err.message);
        }
    };

    return (
        <div className="viewcart">
           { cart.length!==0 &&  <h2>Your Cart</h2> } 

            {cart.length === 0 ? (
                <h2>Your cart is empty.</h2>
            ) : (
                cart.map(item => (
                    <div key={item._id}>
                        <h3>Name of the Product : {item.product.name}</h3>
                        <h4>Total Quantity : {item.quantity}</h4>
                        <h3>Total Price : Rs.{item.quantity * (item.product.price)}</h3>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))
            )}

            { cart.length!==0 && 
                <div className="bill">
                    <h2>BILL</h2>
                    <h3>Items Price  : Rs.{totalPrice}</h3>
                    <h4>Tax  : Rs.{tax} (5%)</h4>
                    <h3>Total Price  : Rs.{price_pay}</h3>
                    <button onClick={handlePay}>Pay Now</button>
                </div>
            }   
        </div>
    );
};

export default ViewCart;