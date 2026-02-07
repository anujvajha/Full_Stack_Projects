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
                console.error("Logout failed", err);
            }
        };

        handleLogout();
    }, [navigate]);

  return (
    <div className="logout">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
