const Expense = require('../models/expenses.js');

const addExpense = async (req, res) => 
{
    const {Type, Category, Amount, Date} = req.body;
    const userId = req.userId;

    const expense = await Expense.create({user: userId, Type, Category, Amount, Date});

    if(expense)
    {
        return res.status(201).json({expense: expense._id});
    }
    else 
    {
        return res.status(400).json({ error: "Add Transaction Failed" });
    }
}

const deleteExpense =  async(req, res) => 
{
    const userId = req.userId;
    const expenseId = req.params.id;

    const deleted_expense = await Expense.findOneAndDelete({_id: expenseId, user: userId});
    if(deleted_expense)
    {
        res.status(200).json({deleted_expense});
    }
    else 
    {
        return res.status(400).json({ error: "Deletion Failed" });
    }
}

const editExpense =  async(req, res) => 
{
    const userId = req.userId;
    const expenseId = req.params.id;
    const {Type, Category, Amount, Date} = req.body;

    const edited_expense = await Expense.findOneAndUpdate({_id: expenseId, user: userId}, {Type, Category, Amount, Date}, {new: true});
    if(edited_expense)
    {
        res.status(200).json({message: "Successful Updation"});
    }
    else 
    {
        return res.status(400).json({ error: "Updation Failed" });
    }
}

const displayExpenses = async (req, res) =>
{
    const allExpenses = await Expense.find();
    try 
    {
        res.status(200).json(allExpenses);
    }
    catch (err)
    {
        return res.status(400).json({ error: "Couldnt fetch all expenses" });
    }
}

module.exports = {addExpense, deleteExpense, editExpense, displayExpenses};
