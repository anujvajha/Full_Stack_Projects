import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate, useLocation} from 'react-router-dom';

const AddTransaction = () => {

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("Income");
    const [id, setId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => 
    {
        if (location.state?.transaction) 
        {
            const e = location.state.transaction;
            setId(e._id);
            setType(e.type);
            setCategory(e.category);
            setAmount(e.amount);
            setDate(new Date(e.date).toISOString().split("T")[0]);
        }
    }, [location.state]);

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
            const transaction = {type, category, amount: Number(amount), date};
            if (id)
            {
                const res = await axios.patch(`http://localhost:5001/editTransaction/${id}`, transaction, { withCredentials: true } );
                if (res.status === 200) 
                { 
                    setId(null);
                    setType("Income");
                    setCategory("");
                    setAmount("");
                    setDate("");
                    navigate("/");
                }
            }
            else 
            {
                const res = await axios.post("http://localhost:5001/addTransaction", transaction, { withCredentials: true });
                if(res.status===201) navigate("/");
            }
        }
        catch (err)
        {
            console.log("Couldnt Add Transaction", err);
        }
    }

    return ( 
        <div className="addexpense-form">
            <form onSubmit={handleSubmit}>
                <label><b>Type</b></label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <label><b>Category</b></label>
                <input type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)}></input>

                <label><b>Amount</b></label>
                <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></input>

                <label><b>Date</b></label>
                <input type="date" placeholder="Enter Date" value={date} onChange={(e) => setDate(e.target.value)}></input>

                <button type="submit">{id ? "Edit Transaction" : "Add Transaction"}</button>
            </form>
        </div>
     );
}
 
export default AddTransaction;