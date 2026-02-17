import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const LogOut = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect( () => 
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
                if (err.response && err.response.data && err.response.data.errors)
                {
                    setError(Object.values(err.response.data.errors).join(", "));
                }
                else
                {
                    setError(err.message);
                }
            }
        }
        logout();
    }, [navigate])

    return (
        <div className="logout">
            {error && <h3 style={{color:"red"}}>{error}</h3>}
            {!error && <h3>Logging out...</h3>}
        </div>
    );
}
 
export default LogOut;
