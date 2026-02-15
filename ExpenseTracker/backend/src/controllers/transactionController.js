import Transaction from '../models/transactionModel.js';

const addTransaction = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const {type, amount, category, date, note} = req.body;
        if(!type || !amount || !category || !date) return res.status(400).json({errors: {general: "All fields are required"}});
        const transaction = await Transaction.create({user: userId, type, amount, category, date, note});
        if(transaction) res.status(201).json({transaction: transaction._id});
    }
    catch (err)
    {
        if (err.name === "ValidationError")
        {
            const errors = {};

            Object.values(err.errors).forEach(e =>
            {
                errors[e.path] = e.message;
            });

            return res.status(400).json({ errors});
        }
        res.status(500).json({errors: {general: "Couldnt add transaction"}});
    }
}

const editTransaction = async (req, res) =>
{
    try 
    {
        const id = req.params.id;
        const userId = req.userId;
        const {type, amount, category, date, note} = req.body;
        if(!type || !amount || !category || !date) return res.status(400).json({errors: {general: "All fields are required!"}});
        const transaction = await Transaction.findOneAndUpdate({_id: id, user: userId}, {type, amount, category, date, note});
        if(transaction)
        {
            res.status(200).json({message: "Transaction edited successfully!"});
        }
        else 
        {
            res.status(404).json({errors : {general: "Couldnt edit transaction!"}});
        }
    }
    catch (err)
    {
        if (err.name === "ValidationError")
        {
            const errors = {};

            Object.values(err.errors).forEach(e =>
            {
                errors[e.path] = e.message;
            });

            return res.status(400).json({ errors});
        }
        res.status(500).json({errors: {general: err.message || "Couldnt edit transaction!"}});
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
        else return res.status(400).json({errors: {general: "Couldnt delete transaction!"}});
    }
    catch (err)
    {
        res.status(500).json({errors: {general: "Couldnt delete transaction!"}});
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
        res.status(500).json({errors: {general:"Couldnt find transactions!"}});
    }
}

export {addTransaction, deleteTransaction, editTransaction, display};
