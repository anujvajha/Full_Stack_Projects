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
                console.log(err.message);
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
            console.log(err.message);
        }
    }

    const handleEdit = (transaction) =>
    {
        navigate("/addTransaction", {state: {transaction}});
    }


    return ( 
        <div>
            {!isLoggedIn && <h1>Please login / signup to view the transactions!</h1>}
            {transactions.length!=0 && <h1>Your Transactions</h1>}
            {isLoggedIn && transactions.length==0 && <h1>Please add a transaction to see the summary!</h1>}

            { transactions.length!=0 && 
                transactions.map((transaction) => 
                (
                    <div key={transaction._id}>
                        <h2><b>Category :- </b>{transaction.category}</h2>
                        <h2><b>Amount :- </b>Rs.{transaction.amount}</h2>
                        <h2><b>Date:- </b> {new Date(transaction.date).toLocaleDateString()}</h2>

                        <div>
                            <button onClick={() => handleEdit(transaction)}>Edit</button>
                            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
                        </div>

                    </div>
                ))
            }
            {transactions.length !== 0 && <SummaryChart />}

        </div>
     );
}
 
export default Home;