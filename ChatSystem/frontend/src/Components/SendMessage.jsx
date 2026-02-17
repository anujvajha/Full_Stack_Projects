import { useState } from "react";
import Socket from '../Socket';
const Send = ({user, convId, receiverId}) => {

    const [text, setText] = useState("");

    const sendMessage = () => 
    {
        Socket.emit("sendMessage", 
            {
                convId,
                senderId: user._id,
                receiverId,
                text
            }
        )
        setText("");
    }

    return ( 
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Send a Message" />
            <button onClick={sendMessage}>Send</button>
        </div>
     );
}

export default Send;