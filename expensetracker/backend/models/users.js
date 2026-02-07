const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema
(
    {
        name : 
        {
            type: String, 
            required: true,
        },

        email :
        {
            type: String, 
            required: true,
            unique: true,
            validate: isEmail
        },

        password :
        {
            type: String, 
            required: true,
            minlength: 4

        }
    }
)

userSchema.pre('save', async function () 
{
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('user', userSchema);