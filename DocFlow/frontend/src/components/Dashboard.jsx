import {useState, useEffect} from 'react';
import axios from 'axios';
import Edit from './Edit.jsx';
const Dashboard = () => {

    const [docs, setDocs] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const fetchDocs = async () => 
    {
        try
        {
            const res = await axios.get("http://localhost:5001/", {withCredentials: true});
            if(res.status==200)
            {
                setDocs(res.data.data);
                setIsLoggedIn(true);
            }
        }
        catch(err)
        {
            if(err.response?.status === 401)
            {
                setIsLoggedIn(false);
            }
        }
    }
    useEffect(() => 
    {
        fetchDocs();
    }, []);

    const handleCreate = async () => 
    {
        try 
        {
            const res = await axios.post('http://localhost:5001/', {title: "Untitled", content: ""}, {withCredentials: true}); 
            if(res.status===201) 
            {
                const newDoc = res.data.data;
                setDocs(prev => [newDoc, ...prev]);
                setSelectedDoc(newDoc);
            }
        }
        catch (err)
        {
            console.log(err.message);
        }
    }

    const handleDelete = async (id) => 
    {
        try 
        {
            const res = await axios.delete(`http://localhost:5001/${id}`, {withCredentials: true}); 
            if(res.status===200) 
            {
                setDocs(prev => prev.filter(doc => doc._id!==id));
                if(selectedDoc?._id === id)
                {
                    setSelectedDoc(null);
                }
            }
        }
        catch (err)
        {
            console.log(err.message);
        }
    }

    const handleUpdate = (updatedDoc) => 
    {
        setDocs(prev => prev.map(doc => doc._id== updatedDoc._id ? updatedDoc : doc));
        setSelectedDoc(updatedDoc);
    }

    if(!isLoggedIn)
    {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <i className="fa-regular fa-pen-to-square text-blue-400 text-5xl mb-4"></i>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to DocFlow!</h2>
                    <p className="text-gray-500 text-md">Please <a href="/login" className="text-blue-500 hover:underline">Log In</a> or <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a> to continue.</p>
                </div>
            </div>
        )
    }

    return ( 
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">

                <div className="p-4 border-b border-gray-200">
                    <button onClick={handleCreate} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg transition duration-200">+ New Document</button>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 h-full">
                    {docs.map((doc) => 
                    {
                        return (
                            <div key={doc._id} className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-gray-200 transition duration-150 ${selectedDoc?._id === doc._id ? 'bg-blue-100 border-l-4 border-l-blue-500' : ''}`}>
                                <p onClick={() => setSelectedDoc(doc)} className="text-sm text-gray-700 truncate flex-1 font-bold">{doc.title}</p>
                                <button onClick={() => handleDelete(doc._id)} className="ml-2 text-xs text-red-500 transition duration-150"> ❌ </button>
                            </div>
                        ) 

                    })}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {
                    !selectedDoc ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-600 text-lg">Select a Document!</p>
                        </div>
                    ) : 
                    (
                        <Edit doc={selectedDoc} onUpdate={handleUpdate} role="editor" />
                    )
                }
            </div>
        </div>
     );
}
 
export default Dashboard;