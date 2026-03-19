import Transaction from '../models/transactionModel.js';

const addTransaction = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const {type, amount, category, date, note} = req.body;
        if(!type || !amount || !category || !date) 
        {
            console.log("Add transaction failed: missing fields");
            return res.status(400).json({message: "All fields are required"});
        }
        const transaction = await Transaction.create({user: userId, type, amount, category, date, note});
        if(transaction) res.status(201).json({transaction: transaction._id});
    }
    catch (err)
    {
        console.log("Couldnt add transaction:", err.message);
        res.status(500).json({message: "Couldnt add transaction"});
    }
}

const editTransaction = async (req, res) =>
{
    try 
    {
        const id = req.params.id;
        const userId = req.userId;
        const {type, amount, category, date, note} = req.body;
        if(!type || !amount || !category || !date) 
        {
            console.log("Edit transaction failed: missing fields");
            return res.status(400).json({message: "All fields are required!"});
        }
        const transaction = await Transaction.findOneAndUpdate({_id: id, user: userId}, {type, amount, category, date, note});
        if(transaction)
        {
            res.status(200).json({message: "Transaction edited successfully!"});
        }
        else 
        {
            console.log("Couldnt edit transaction: not found");
            res.status(404).json({message: "Couldnt edit transaction!"});
        }
    }
    catch (err)
    {
        console.log("Couldnt edit transaction:", err.message);
        res.status(500).json({message: "Couldnt edit transaction!"});
    }
}

const deleteTransaction = async (req, res) =>
{
    try 
    {
        const id = req.params.id;
        const userId = req.userId;
        const transaction = await Transaction.findOneAndDelete({_id: id, user: userId});
        if(transaction) return res.status(200).json({transaction: transaction._id});
        else 
        {
            console.log("Couldnt delete transaction: not found");
            return res.status(400).json({message: "Couldnt delete transaction!"});
        }
    }
    catch (err)
    {
        console.log("Couldnt delete transaction:", err.message);
        res.status(500).json({message: "Couldnt delete transaction!"});
    }
}

const display = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const allTransactions = await Transaction.find({user: userId});
        res.status(200).json(allTransactions);
        
    }
    catch (err)
    {
        console.log("Couldnt find transactions:", err.message);
        res.status(500).json({message:"Couldnt find transactions!"});
    }
}

export {addTransaction, deleteTransaction, editTransaction, display};