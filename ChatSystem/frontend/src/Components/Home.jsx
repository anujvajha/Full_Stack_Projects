import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5001/me", { withCredentials: true });
      if (res.status === 200) setCurrentUser(res.data.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5001/users", { withCredentials: true });
      if (res.status === 200) setUsers(res.data.data);
    };
    fetchUsers();
  }, [currentUser]);

  const startConversation = async (otherUserId) => {
    if (!currentUser) return;

    try {
      const res = await axios.get(`http://localhost:5001/getConv/${otherUserId}`, {
        withCredentials: true,
      });
      if (res.status === 200) setSelectedConv(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h2>Start a Conversation</h2>
      {users.map((user) => (
        <button key={user._id} onClick={() => startConversation(user._id)}>
          {user.name || user.email}
        </button>
      ))}

      <h2>Chat</h2>
      <Chat selectedConv={selectedConv} />
    </div>
  );
}

export default Home;