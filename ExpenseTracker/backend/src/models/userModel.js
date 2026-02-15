import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const userSchema = new mongoose.Schema(
{
  name:
  {
    type: String,
    required: [true, "Name is required!"],
    trim: true
  },

  email:
  {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    validate: [validator.isEmail, "Email is invalid!"],
    trim: true,
    lowercase: true
  },

  password:
  {
    type: String,
    required: [true, "Password is required!"],
    minlength: [4, "Password must be at least 4 characters!"]
  }
},
{
  timestamps: true   
});


userSchema.pre('save', async function () 
{
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model('user', userSchema);
export default userModel;