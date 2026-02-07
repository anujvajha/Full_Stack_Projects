import User from '../models/users.js';

const placeOrder = async (req, res) =>
{
    try 
    {
        const {name, quantity, price} = req.body;
        const userId = req.userId;

        const user = await User.findOne({_id: userId});
        if(user)
        {
            user.cart.push({name, quantity, price});
            await user.save();
            res.status(200).json({cart: user.cart});
        }
        else 
        {
            console.log("couldnt add order to the cart");
        }
    }
    catch (err)
    {   
        console.log("user not found", err);
    }

}

module.exports = {placeOrder};