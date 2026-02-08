import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        const user = {email, password };
        try 
        {
            const res = await axios.post('http://localhost:5001/login', user, {withCredentials: true});
            if(res.status===200) navigate("/");
        }
        catch (err)
        {
            console.log("Login not successful", err.message);
        }
    };

    return ( 
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <label><b>Email</b></label>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>

                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>

                <button>Log In</button>
            </form>
        </div>
     );
}
 
export default LogIn;