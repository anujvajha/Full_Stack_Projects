const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema
(
    {
      name: 
      {
        type: String,
        required: true
      },
      email: 
      {
        type: String,
        required: true,
        unique: true,
        validate: isEmail
      },
      password: 
      {
        type: String,
        required: true,
        minlength: 5
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
              required: true
            },
            quantity: 
            { 
              type: Number, 
              default: 1, 
              min: 1 
            }
          }
        ],
        default: [] 
      }
    }
);

userSchema.pre('save', async function () 
{
  // if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

});


module.exports = mongoose.model('user', userSchema); 
