import Socket from '../Socket';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Chat = ({selectedConv}) => {

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState();
    const [text, setText] = useState("");

    useEffect(() => 
    {
        const fetchUser = async () => 
        {
            try 
            {
                const res = await axios.get("http://localhost:5001/me", {withCredentials: true});
                if(res.status===200) setUser(res.data.data);
            }
            catch (err)
            {
                console.log(err.message);
            }
            
        }
        fetchUser();
    }, []);

    useEffect(() => 
    {
        if(!selectedConv) return;
        const fetchMessages = async () => 
        {
            try 
            {
                const res = await axios.get(`http://localhost:5001/getMessages/${selectedConv._id}`, {withCredentials: true});
                if(res.status===200) setMessages(res.data.data);
            }
            catch (err)
            {
                console.log(err.message);
            }
            
        }
        fetchMessages();
    }, [selectedConv]);



    useEffect(() => 
    {
        if(!user) return;
        Socket.emit("addUser", user._id);
        Socket.on("receiveMessage", (msg) =>
        {
            setMessages(prev => [...prev, msg]);
        });
        return () => {
            Socket.off("receiveMessage");
        };

    }, [user])

    const sendMessage = () => 
    {
        const receiverId = selectedConv.participants.find(id => id!==user._id);
        Socket.emit("sendMessage", 
            {
                convId: selectedConv._id,
                senderId: user._id,
                receiverId,
                text
            }
        )
        setText("");
    }

    if (!selectedConv) return <div>Select a conversation</div>;
    return ( 
        <div>
            <div>
                {messages.map((msg) =>
                (
                    <div key={msg._id}>
                        {msg.text}
                    </div>
                ))}
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Send a Message" />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
     );
}
 
export default Chat;