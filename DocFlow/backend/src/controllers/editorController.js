import Docs from '../models/docsModel.js';

const fetchDoc = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const docId = req.params.id;

        if(!userId) return res.status(401).json({message: "User not authorised"});
        const requiredDoc = await Docs.findOne(
        {
            _id: docId,
            $or: 
            [
                {
                    owner: userId 
                },
                {
                    "collaborators.user" : userId
                }
            ]
        });

        if(requiredDoc)
        {
            return res.status(200).json({data: requiredDoc});
        }
        else return res.status(404).json({message: "Document couldnt be found"});
    }
    catch (err)
    {
        return res.status(500).json({message: "Document couldnt be found"});
    }
}

const shareDoc = async (req, res) => 
{
    try 
    {
        const { id } = req.params;
        const { userId, role } = req.body;

        const doc = await Docs.findById(id);
        if (!doc) return res.status(404).json({ message: "Document not found" });

        doc.collaborators.push({ user: userId, role });
        await doc.save();

        res.status(200).json({ message: "Collaborator added", doc });
    } 
    catch (err) 
    {
        res.status(500).json({ message: err.message });
    }
};
export {fetchDoc, shareDoc};