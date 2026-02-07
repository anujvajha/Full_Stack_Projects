import { useEffect, useState } from "react";
import axios from 'axios';
const Home = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect (() => 
    {
        const display = async () =>
        {
            try 
            {
                const res = await axios.get("http://localhost:5001/display", {withCredentials: true});
                if (res.status===200) setTransactions(res.data);
            }
            catch (err)
            {
                console.log(err.message);
            }
        }

        display();

    }, []);

    const handleDelete = async (id) =>
    {
        try 
        {
            const res = await axios.get(`http://localhost:5001/deleteTransaction/${id}`, {withCredentials: true});
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


    return ( 
        <div>
            {!user && <h1>Please login / signup to view the transactions!</h1>}
            {transactions.length!=0 && <h1>Your Transactions</h1>}
            {transactions.length==0 && <h1>Please add a transaction to see the summary!</h1>}

            { transactions.length!=0 && 
                transactions.map((transaction) => 
                (
                    <div key={transaction._id}>
                        <h2><b>Category :- </b>{transaction.category}</h2>
                        <h2><b>Amount :- </b>Rs.{transaction.amount}</h2>
                        <h2><b>Date:- </b> {new Date(transaction.Date).toLocaleDateString()}</h2>

                        <div>
                            <button onClick={() => handleEdit(transaction)}>Edit</button>
                            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
                        </div>

                    </div>
                ))
            }

        </div>
     );
}
 
export default Home;