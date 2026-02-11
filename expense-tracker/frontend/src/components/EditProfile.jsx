import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

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
            const message = err.response?.data?.message || "Couldnt Edit the Profile";
            setError(message);
        }
   };

  return (
    <div className="edit-profile flex mt-34 justify-center  bg-black text-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col w-80 p-6 space-y-4 bg-zinc-900 rounded-xl shadow-md border border-zinc-800">
        {error && <p className="text-red-400">{error}</p>}
        <label><b>Name</b></label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <label><b>Email</b></label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">Update Profile</button>
      </form>
    </div>

    // <div className="edit-profile flex justify-center bg-black text-gray-100 py-20">
    //   <form onSubmit={handleSubmit} className="flex flex-col w-80 p-6 space-y-4 bg-zinc-900 rounded-xl shadow-md border border-zinc-800">
    //     {error && <p className="text-red-400">{error}</p>}
    //     <label><b>Name</b></label>
    //     <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    //     <label><b>Email</b></label>
    //     <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    //     <button className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">Update Profile</button>
    //   </form>
    // </div>


  );
};

export default EditProfile;
