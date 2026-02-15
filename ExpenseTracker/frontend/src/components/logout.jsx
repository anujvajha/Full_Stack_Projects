import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});

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
                const backendErrors = err.response?.data?.errors;

                if (backendErrors)
                {
                    setError(backendErrors);
                }
                else
                {
                    setError({ general: "Couldnt Log Out" });
                }
            }
        };

        handleLogout();
    }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-gray-100">
      {error.general && <p className="text-red-400 text-lg font-medium">{error.general}</p>}
      {!error && <h2 className="text-xl font-semibold animate-pulse">Logging out...</h2>}
    </div>

  );
};

export default Logout;
