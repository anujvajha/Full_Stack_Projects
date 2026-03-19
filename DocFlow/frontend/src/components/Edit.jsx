import {useState, useEffect} from 'react';
import axios from 'axios';
import {io} from "socket.io-client";

const socket = io("http://localhost:5001", { withCredentials: true });
const Edit = ({doc, onUpdate, role}) => {

    const [title, setTitle] = useState(doc.title);
    const [content, setContent] = useState(doc.content);

    useEffect(() => 
    {
        setTitle(doc.title);
        setContent(doc.content);
    }, [doc]);


    useEffect(() => 
    {
        const timeout = setTimeout(() => 
        {
            if(!doc._id) return;
            axios.patch(`http://localhost:5001/${doc._id}`, {title, content}, {withCredentials: true})
                .then(res=> {
                    onUpdate({...doc, title, content})
                })
                .catch(err => console.log(err.message));
        }, 500)

        return () => clearTimeout(timeout);
    }, [title, content])


    useEffect(() => 
    {
        if(!doc?._id) return;

        socket.emit("joinDoc", doc._id);
        socket.on("receiveDocChange", ({title: newTitle, content: newContent}) => 
        {
            setTitle(newTitle);
            setContent(newContent);
            onUpdate({...doc, title: newTitle, content: newContent});
        });

        return () => {
            socket.off("receiveDocChange");
        };

    }, [doc])

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onUpdate({ ...doc, title: newTitle });

        if (role === "editor") {
            socket.emit("docChange", { docId: doc._id, title: newTitle, content });
        }
    };

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);

        if (role === "editor") {
            socket.emit("docChange", { docId: doc._id, title, content: newContent });
        }
    };

    return ( 
        <div className="flex flex-col h-full bg-white">
            <input
                type="text"
                placeholder='TITLE'
                value={title}
                onChange={handleTitleChange}
                readOnly={role === "viewer"}
                className="text-2xl font-bold text-gray-800 border-b border-gray-200 px-6 py-4.5 focus:outline-none placeholder-gray-300"
            />
            <h2 className="hidden">{title}</h2>

            <textarea 
                placeholder='' 
                value={content} 
                onChange={handleContentChange} 
                readOnly={role === "viewer"}
                className="flex-1 px-6 py-4 text-gray-700 text-sm leading-relaxed resize-none focus:outline-none placeholder-gray-300 min-h-[500px]" />

            <p className="hidden">{content}</p>
        </div>
    );
}
 
export default Edit;