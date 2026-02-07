import Transaction from '../models/transactionModel';
import mongoose from 'mongoose'

const getSummary = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const result = await Transaction.aggregate
        (
            [   
                {
                    $match:
                    {
                        user : new mongoose.Types.ObjectId(userId)
                    }
                },

                {
                    $group:
                    {
                        _id: $type,
                        total: 
                        {
                            $sum: "amount"
                        }
                    }
                }
            ]
        );
        res.status(200).json(result);
    }
    catch (err)
    {
        res.status(500).json({error: "Analytics failed"});
    }
}

const categoryExpense = async (req, res) =>
{
    try
    {
        const userId = req.userId;

        const result = await Transaction.aggregate(
        [
            {
                $match:
                {
                    user: new mongoose.Types.ObjectId(userId),
                    type: "expense"
                }
            },
            {
                $group:
                {
                    _id: "$category",
                    total:
                    {
                        $sum: "$amount"
                    }
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


export {getSummary, categoryExpense};