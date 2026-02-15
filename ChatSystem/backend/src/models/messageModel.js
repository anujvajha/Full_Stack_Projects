import mongoose from "mongoose";

const messageSchema = new mongoose.Schema 
(
    {
        conversation : 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'conv',
            required: true
        },

        sender : 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },

        text : 
        {
            type: String,
            required: true
        }
         
    },
    {
        timestamps: true
    }
)

const messageModel = mongoose.model('message', messageSchema);
export default messageModel;