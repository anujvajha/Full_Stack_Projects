import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({search}) => {

    const [products, setProducts] = useState([]);
    const [qty, setQty] = useState({});
    const [error, setError] = useState("");

    useEffect(() => 
    {
        const fetchProducts = async () => 
        {
            try 
            {
                const res = await axios.get('http://localhost:5001/products', {withCredentials: true});
                if(res.status===200)
                {
                    setProducts(res.data);
                }
            }
            catch (err)
            {
                if (err.response && err.response.data && err.response.data.errors)
                {
                    setError(err.response.data.errors);
                }
                else
                {
                    setError(err.message);
                }
            }
        }
        fetchProducts();    

    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );


    const handleClick = async (id, qty) => 
    {
        try 
        {
            await axios.post('http://localhost:5001/addtocart', { productId: id, quantity: qty }, { withCredentials: true });
        } 
        catch (err)
        {
            if (err.response && err.response.data && err.response.data.errors)
            {
                setError(Object.values(err.response.data.errors).join(", "));
            }
            else
            {
                setError("add to cart failed");
            }
        }
    };


    return ( 
        <div className={`products-grid ${filteredProducts.length === 1 ? 'center-grid' : ''}`}>

            {error && <h3 style={{color:"red"}}>{error}</h3>}

            {
                filteredProducts.map((product) => (
                    <div key={product._id} className='product-card'>
                        <h2>{product.name}</h2>
                        <img src={product.image} alt={product.name}></img>
                        <h3> Price : Rs.{product.price}</h3>
                        <div className="qty-row">
                            <label><b>Quantity:</b></label>
                            <select onChange={(e) => setQty({...qty, [product._id]: e.target.value})} value={qty[product._id] || "1"}>
                                <option value ="1">1</option>
                                <option value ="2">2</option>
                                <option value ="3">3</option>
                                <option value ="4">4</option>
                                <option value ="5">5</option>
                                <option value ="6">6</option>
                            </select>
                        </div>
                        <button onClick={ () => handleClick(product._id, qty[product._id] || "1") }>ADD TO CART</button>
                    </div>
                ))
            }

        </div>
            
    );
}
export default Home;
