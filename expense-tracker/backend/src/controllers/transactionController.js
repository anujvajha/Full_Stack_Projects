import Transaction from '../models/transactionModel';

const addTransaction = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const {type, amount, category, date, note} = req.body;
        const transaction = await Transaction.create({user: userId, type, amount, category, date, note});
        if(transaction) res.status(201).json({transaction: transaction._id});
        else res.status(400).json({error: "Couldnt add transaction"});
    }
    catch (err)
    {
        res.status(400).json({error: "Couldnt add transaction"});
    }
}

const editTransaction = async (req, res) =>
{
    try 
    {
        const id = req.params.id;
        const userId = req.userId;
        const {type, amount, category, date, note} = req.body;

        const transaction = await Transaction.findOneAndUpdate({_id: id, user: userId}, {type, amount, category, date, note});
        if(transaction)
        {
            res.status(200).json({transaction: transaction._id});
        }
        else 
        {
            res.status(404).json({error: "Couldnt edit transaction"});
        }
    }
    catch (err)
    {
        res.status(500).json({error: "Couldnt edit transaction"});
    }
}

const deleteTransaction = async (req, res) =>
{
    try 
    {
        const id = req.params.id;
        const userId = req.userId;
        const transaction = await Transaction.findOneAndDelete({_id: id, user: userId});
        if(transaction) res.status(200).json({transaction: transaction._id});
        else res.status(400).json({error: "Couldnt delete transaction"});
    }
    catch (err)
    {
        res.status(404).json({error: "Couldnt delete transaction"});
    }
}

const display = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const allTransactions = await Transaction.find({user: userId});
        if(allTransactions)
        {
            res.status(200).json(allTransactions);
        }
    }
    catch (err)
    {
        res.status(500).json({error: "couldnt find transactions"});
    }
}

export {addTransaction, deleteTransaction, editTransaction, display};