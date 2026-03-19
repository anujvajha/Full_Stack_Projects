import Docs from '../models/docsModel.js';

const display = async (req, res) => 
{
    try 
    {
        const userId = req.userId;
        if(!userId) return res.status(401).json({message: "Login / SignUp"});

        const docs = await Docs.find
        (
            {
                $or : 
                [
                    {owner: userId},
                    {
                        "collaborators.user" : userId
                    }
                ]
            }
        ).sort({updatedAt: -1});
        return res.status(200).json({data: docs});
    }
    catch (err)
    {
        return res.status(500).json({message: err.message});
    }
}

const addDoc = async (req, res) => 
{
    try 
    {
        const userId = req.userId;
        if(!userId) return res.status(401).json({message: "Login / SignUp"});

        const {title} = req.body;
        const newDoc = await Docs.create
        (
            {
                title: title || "Untitled",
                content: '',
                owner: userId,
                collaborators: []

            }   
        );
        return res.status(201).json({data: newDoc});
    }
    catch (err)
    {
        return res.status(500).json({message: err.message});
    }
}

const deleteDoc = async (req, res) => 
{
    try 
    {
        const userId = req.userId;
        const id = req.params.id;
        if(!userId) return res.status(401).json({message: "Login / SignUp"});

        const deleteDoc = await Docs.findOneAndDelete({owner: userId, _id: id});
        if (!deleteDoc) 
        {
            return res.status(404).json({ message: "Document not found or not authorized" });
        }
        return res.status(200).json({message: "Document deleted Successfully"});
    }
    catch (err)
    {
        return res.status(500).json({message: err.message});
    }
}

const updateDoc = async (req, res) => 
{
    try 
    {
        const userId = req.userId;
        const id = req.params.id;
        const {title, content} = req.body;
        if (!title && !content) 
        {
            return res.status(400).json({ message: "No data provided to update" });
        }

        if(!userId) return res.status(401).json({message: "Login / SignUp"});

        const updatedDoc = await Docs.findOneAndUpdate({owner: userId, _id: id}, 
        {
            $set : 
            {
                ...(title && {title}),
                ...(content && {content})
            }
        },
        {
            new: true
        });
        
        if (!updatedDoc) 
        {
            return res.status(404).json({ message: "Document not found or not authorized" });
        }
        return res.status(200).json({data: updatedDoc});
    }
    catch (err)
    {
        return res.status(500).json({message: err.message});
    }
}

export {display, addDoc, deleteDoc, updateDoc};