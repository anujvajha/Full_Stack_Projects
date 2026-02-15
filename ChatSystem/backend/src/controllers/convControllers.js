import Conv from '../models/conversationModel.js';

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

export {get_conv, get_all_conv};