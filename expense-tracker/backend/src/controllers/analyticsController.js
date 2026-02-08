import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';
const getSummary = async (req, res) =>
{
    try 
    {
        const userId = req.userId;

        const result = await Transaction.aggregate([
            {
                $match: 
                {
                    user: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: 
                {
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json(result);
    }
    catch (err)
    {
        res.status(500).json({ error: "Analytics failed" });
    }
};

const categoryExpense = async (req, res) =>
{
    try
    {
        const userId = req.userId;

        const result = await Transaction.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    //type: "Expense"
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json(result);
    }
    catch (err)
    {
        res.status(500).json({ error: "Category analytics failed" });
    }
};

export {categoryExpense, getSummary};