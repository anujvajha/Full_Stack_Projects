import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate, useLocation} from 'react-router-dom';

const AddTransaction = () => {

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("Income");
    const [note, setNote] = useState("");
    const [id, setId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => 
    {
        const checkAuth = async () => 
        {
            try 
            {
                await axios.get("http://localhost:5001/me", { withCredentials: true });
            } 
            catch (err) 
            {
                console.log("Auth check failed:", err.message);
                navigate("/login");
            }
        };
        checkAuth();

        if (location.state?.transaction) 
        {
            const e = location.state.transaction;
            setId(e._id);
            setType(e.type);
            setCategory(e.category);
            setAmount(e.amount);
            setDate(new Date(e.date).toISOString().split("T")[0]);
            setNote(e.note);
        }
    }, [location.state]);

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
            const transaction = {type, category, amount: Number(amount), date, note};
            if (id)
            {
                const res = await axios.patch(`http://localhost:5001/editTransaction/${id}`, transaction, { withCredentials: true } );
                if (res.status === 200) 
                { 
                    setId(null);
                    setType("Income");
                    setCategory("");
                    setAmount("");
                    setNote("");
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
            console.log("Transaction error:", err.response?.data || err.message);
        }
    }

    return ( 
        <div className="addexpense-form flex  justify-center mt-2 bg-black text-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col w-125 p-8 space-y-5 bg-zinc-900 rounded-xl shadow-md border border-zinc-800">
                
                <label><b>Type</b></label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <label><b>Category</b></label>
                <input type="text" placeholder="Enter Category" value={category} onChange={(e) => {
                    setCategory(e.target.value);
                }} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>

                <label><b>Amount</b></label>
                <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => {
                    setAmount(e.target.value);
                }} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>

                <label><b>Date</b></label>
                <input type="date" placeholder="Enter Date" value={date} onChange={(e) => {
                    setDate(e.target.value);
                }} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></input>

                <label><b>Description</b></label>
                <textarea type="string" placeholder="Enter Description" value={note} onChange={(e) => setNote(e.target.value)} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

                <button type="submit" className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                    {id ? "Edit Transaction" : "Add Transaction"}
                </button>
            </form>
        </div>
     );
}
 
export default AddTransaction;