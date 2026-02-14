import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  useEffect(() => 
  {
    const fetchUser = async () => 
    {
        try 
        {
            await axios.get("http://localhost:5001/me", { withCredentials: true });
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
            const res = await axios.patch("http://localhost:5001/editPassword", { oldPassword, newPassword }, { withCredentials: true });
            if (res.status === 200) navigate("/");
        } 
        catch (err)
        {
            const backendErrors = err.response?.data?.errors;
            if (backendErrors)
            {
                setError(backendErrors);
            }
            else
            {
                setError({ general: err.response?.data?.message || "Couldnt Change the Password" });
            }
        }
   };

  return (
    <div className="edit-profile flex mt-34 justify-center  bg-black text-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col w-80 p-6 space-y-4 bg-zinc-900 rounded-xl shadow-md border border-zinc-800">
        {error.general && <p className="text-red-400">{error.general}</p>}
        
        <label><b>Old Password</b></label>
        <input
          type="password"
          placeholder="Enter the old password"
          value={oldPassword}
          onChange={e => {
            setOldPassword(e.target.value);
            setError(prev => ({ ...prev, oldPassword: null }));
          }}
          className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error.oldPassword && <p className="text-red-400">{error.oldPassword}</p>}

        <label><b>New Password</b></label>
        <input
          type="password"
          placeholder="Enter the new password"
          value={newPassword}
          onChange={e => {
            setNewPassword(e.target.value);
            setError(prev => ({ ...prev, newPassword: null }));
          }}
          className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error.newPassword && <p className="text-red-400">{error.newPassword}</p>}

        <button className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">Change Password</button>
      </form>
    </div>
  );
};

export default EditPassword;
