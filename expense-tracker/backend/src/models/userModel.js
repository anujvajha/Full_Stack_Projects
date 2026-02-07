import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator';
const userSchema = new mongoose.Schema
(
    {
        name:
        {
            type: String,
            required: true,
            trim: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            validate: isEmail,
            trim: true,
            lowercase: true
        },
        password:
        {
            type: String,
            required: true,
            minlength: [4, "Password must be at least 4 characters"]
        }
    }
);

userSchema.pre('save', async function (next) 
{
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const userModel = mongoose.model('user', userSchema);
export default userModel;