import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema
(
    {
        participants : 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: [true, "User is required!"]
            }
        ],
        lastMessage : 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
        },
        timestamps:
        {
            createdAt : "created_at",
            updatedAt : "updated_at",
        } 
    }
)

const conversationModel = mongoose.model('conv', conversationSchema);
export default conversationModel;