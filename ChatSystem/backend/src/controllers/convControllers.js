import Conv from '../models/conversationModel.js';
import Msg from '../models/messageModel.js';

const get_conv = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const id = req.params.id;
        const conv = await Conv.findOne({participants: {$all: [userId, id]} });
        if(conv) return res.status(200).json({success: true, data: conv});

        const newConv = await Conv.create({participants: [userId, id]});
        if(newConv) return res.status(201).json({success: true, data: newConv});
        return res.status(500).json({success: false, message: "Couldn't create the conversation!"});
        
    }
    catch (err)
    {
        return res.status(500).json({success: false, message: "Internal Error!"});
    }
}

const get_all_conv = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const conv = await Conv.find({participants: userId}).sort({updatedAt: -1});
        return res.status(200).json({success: true, data: conv});
    }
    catch (err)
    {
        return res.status(500).json({success: false, message: "Internal Error!"});
    }
}

// const send_message = async (req, res) => 
// {
//     try 
//     {
//         const senderId = req.userId;
//         const {convId, text} = req.body;
//         if(!convId || !text) return res.status(400).json({success: false, message: "Please provide conversationId and text!"}); 

//         const msg = await Msg.create({conversation: convId, sender: senderId, text});
//         await Conv.findByIdAndUpdate(convId, {lastMessage: msg._id});

//         if(msg) return res.status(201).json({success: true, data: msg});
//         return res.status(500).json({success: false, message: "Couldn't send the message"});

//     }
//     catch (err)
//     {
//         return res.status(500).json({success: false, message: "Internal Error!"});
//     }
    
// }

const get_messages = async (req, res) => 
{
    try 
    {
        const {convId} = req.params;
        const msgs = await Msg.find({conversation: convId}).sort({createdAt: 1});
        return res.status(200).json({ success: true, data: msgs});
    }
    catch (err)
    {
        return res.status(500).json({success: false, message: "Internal Error"});   
    }
}

export {get_conv, get_all_conv,get_messages};