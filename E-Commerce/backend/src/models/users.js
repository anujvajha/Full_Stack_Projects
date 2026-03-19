const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema
(
    {
      name: 
      {
        type: String,
        required: [true, "Name is required!"]
      },
      email: 
      {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
      },
      password: 
      {
        type: String,
        required: [true, "Password is required!"],
        minlength: [5, "Minimum password length is 5 characters"]
      },
      cart: 
      {
        type: 
        [
          {
            product: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required: [true, "Product is required"]
            },
            quantity: 
            { 
              type: Number, 
              default: 1, 
              min: [1, "Quantity must be at least 1"] 
            }
          }
        ],
        default: [] 
      }
    }
);

userSchema.pre('save', async function () 
{
  if (!this.isModified('password')) return next(); 
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

});


module.exports = mongoose.model('user', userSchema);
