import mongoose from 'mongoose';

const docsSchema = new mongoose.Schema
(
    {
        title :
        {
            type: String, 
            required: true
        },

        content :
        {
            type: String, 
            default: ''
        },

        owner : 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },

        collaborators :
        [
            {
                user: 
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                role : 
                {
                    type: String, 
                    enum: ['viewer', 'editor'],
                    default: 'viewer'
                }
            }
        ]
    },
    {
        timestamps: true
    }

)
const docsModel = mongoose.model('docs', docsSchema);
export default docsModel;