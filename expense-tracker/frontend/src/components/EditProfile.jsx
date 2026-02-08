import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => 
  {
    const fetchUser = async () => 
    {
        try 
        {
            const res = await axios.get("http://localhost:5001/me", { withCredentials: true });
            setName(res.data.name);
            setEmail(res.data.email);
        } 
        catch (err) 
        {
            navigate("/login");
        }
    };
    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => 
   {
        e.preventDefault();
        try 
        {
            const res = await axios.patch("http://localhost:5001/editProfile", { name, email }, { withCredentials: true });
            if (res.status === 200) navigate("/");
        } 
        catch (err) 
        {
            console.log("Profile update failed", err.message);
        }
   };

  return (
    <div className="edit-profile">
      <form onSubmit={handleSubmit}>
        <label><b>Name</b></label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <label><b>Email</b></label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <button>Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
