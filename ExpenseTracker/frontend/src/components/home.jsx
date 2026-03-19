import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import SummaryChart from "./SummaryChart";
import axios from 'axios';

const Home = () => {

    const [transactions, setTransactions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    useEffect (() => 
    {
        const display = async () =>
        {
            try 
            {
                const res = await axios.get("http://localhost:5001/display", {withCredentials: true});
                if (res.status===200) 
                {
                    setTransactions(res.data);
                    setIsLoggedIn(true);
                }
            }
            catch (err)
            {
                console.log("Fetch transactions failed:", err.response?.data || err.message);
                setIsLoggedIn(false);
            }
        }

        display();

    }, []);

    const handleDelete = async (id) =>
    {
        try 
        {
            const res = await axios.delete(`http://localhost:5001/deleteTransaction/${id}`, {withCredentials: true});
            if(res.status===200) 
            {
                setTransactions(transactions.filter((transaction) => transaction._id!==id ))
            }
        }
        catch (err)
        {
            console.log("Delete transaction failed:", err.response?.data || err.message);
        }
    }

    const handleEdit = (transaction) =>
    {
        navigate("/addTransaction", {state: {transaction}});
    }


    return ( 
        <div className="max-w-2xl mx-auto mt-8 px-6 text-gray-100">
            {/* {error.general && <p className="text-red-400 mb-4">{error.general}</p>} */}
            {!isLoggedIn && <h1 className="text-xl font-semibold text-center text-gray-300">Please login / signup to view the transactions!</h1>}
            {transactions.length!=0 && <h1 className="text-2xl font-bold mb-6 text-blue-500 text-center">Your Transactions</h1>}
            {isLoggedIn && transactions.length==0 && <h1 className="text-xl font-semibold text-center text-gray-300">Please add a transaction to see the summary!</h1>}

            { transactions.length!=0 && 
                transactions.map((transaction) => 
                (
                    <div key={transaction._id} className="bg-zinc-900 p-6 rounded-xl shadow-md mb-6 border border-zinc-800">
                        <h2 className="mb-2"><b>Category :- </b>{transaction.category}</h2>
                        <h2 className="mb-2"><b>Amount :- </b>Rs.{transaction.amount}</h2>
                        <h2 className="mb-4"><b>Date:- </b> {new Date(transaction.date).toLocaleDateString()}</h2>
                        {transaction.note && <h2 className="mb-2"><b>Description:- </b>{transaction.note}</h2>}
                        <div className="flex gap-4">
                            <button onClick={() => handleEdit(transaction)} className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit</button>
                            <button onClick={() => handleDelete(transaction._id)} className="bg-red-800 px-4 py-2 rounded-lg hover:bg-red-600 transition">Delete</button>
                        </div>
                    </div>
                ))
            }
            {transactions.length !== 0 && <SummaryChart />}

        </div>

     );
}
 
export default Home;