import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => 
  {
      const handleLogout = async () => 
      {
          await axios.get("http://localhost:5001/logout", { withCredentials: true });
          setTimeout(() => 
          {
            navigate("/");
              
          }, 400);
      };
      handleLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <h2 className="text-xl font-medium text-gray-500 animate-pulse">Logging out...</h2>
    </div>

  );
};

export default Logout;