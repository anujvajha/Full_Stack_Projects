import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => 
   {
        const handleLogout = async () => 
        {
            try 
            {
                await axios.get("http://localhost:5001/logout", { withCredentials: true });
                setTimeout(() => 
                {
                  navigate("/");
                    
                }, 400);

            } 
            catch (err)
            {
                console.log("Logout failed:", err.response?.data || err.message);
            }
        };

        handleLogout();
    }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-gray-100">
      <h2 className="text-xl font-semibold animate-pulse">Logging out...</h2>
    </div>

  );
};

export default Logout;