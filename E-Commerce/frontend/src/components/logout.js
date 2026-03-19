import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => 
    {
        const logout = async () => 
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
                console.log("Logout failed:", err.message);
            }
        }
        logout();
    }, [navigate]);

    return (
        <div className="logout">
            <h3>Logging out...</h3>
        </div>
    );
}
 
export default LogOut;