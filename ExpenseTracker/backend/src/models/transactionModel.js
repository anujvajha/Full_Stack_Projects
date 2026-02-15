import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema
(
  {
    user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required!"]
    },

    type: 
    {
      type: String,
      enum: { values: ["Income", "Expense"], message: "Type must be Income or Expense!" },
      required: [true, "Type is required!"]
    },

    amount: 
    {
      type: Number,
      required: [true, "Amount is required!"],
      min: [1, "Amount must be greater than 0!"]
    },

    category: 
    {
      type: String,
      required: [true, "Category is required!"],
      trim: true
    },

    date: 
    {
      type: Date,
      default: Date.now,
      required: [true, "Date is required!"]
    },

    note: 
    {
      type: String,
    }
  },

  { timestamps: true }
);

const transactionModel = mongoose.model('transaction', transactionSchema);
export default transactionModel;
