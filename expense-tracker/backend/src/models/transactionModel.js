import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema
(
  {
    user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    type: 
    {
      type: String,
      enum: ["income", "expense"],
      required: true
    },

    amount: 
    {
      type: Number,
      required: true,
      min: [1, "Amount must be greater than 0"]
    },

    category: 
    {
      type: String,
      required: true,
      trim: true
    },

    date: 
    {
      type: Date,
      required: true
    },

    // paymentMethod: 
    // {
    //   type: String,
    //   enum: ["Cash", "Card", "UPI", "Bank Transfer"],
    //   required: true
    // },

    note: String
  },

  { timestamps: true }
);

const transactionModel = mongoose.model('transaction', transactionSchema);
export default transactionModel;
