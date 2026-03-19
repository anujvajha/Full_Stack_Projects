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

        const res = await axios.post('http://localhost:5001/login', user, {withCredentials: true});
        if(res.status===200) navigate("/");
    };

    return ( 
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-2">Welcome Back!</h2>
                
                <label className="text-sm font-semibold text-gray-600"><b>Email</b></label>
                <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />

                <label className="text-sm font-semibold text-gray-600"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />

                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-2 transition duration-200"> Log In </button>
            </form>
        </div>
     );
}
 
export default LogIn;