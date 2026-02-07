const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema
(
    {
        user : 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : "user", 
            required: true
        },

        Type :
        {
            type: String,
            required: true,
        },

        Category :
        {
            type: String,
            required: true,
        },

        Amount :
        {
            type: Number, 
            required: true
        },
        
        Date : 
        {
            type: Date, 
            default: Date.now
        }
    }
)

module.exports = mongoose.model('expense', expenseSchema);