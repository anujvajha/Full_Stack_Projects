import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({});

const handleSubmit = async (e) => 
{
    e.preventDefault();
    const user = { name, email, password };

    try 
    {
      const res = await axios.post('http://localhost:5001/signup', user, {withCredentials: true});
      if(res.status===201) navigate("/");
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
        setError({ general: "Signup failed. Please try again." });
      }
    }
};

  return (
    <div className='flex justify-between align-middle'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-between w-80 mx-auto p-6 shadow space-y-4 bg-zinc-900 border-zinc-800 rounded-xl text-zinc-100 mt-32'>
        {error.general && <p className='text-red-400'>{error.general}</p>}
        <label><b>Name</b></label>
        <input type="text" placeholder="Enter Name" value={name} onChange={e => {setName(e.target.value), setError(prev => ({ ...prev, name: null }))}} className='bg-zinc-800 text-zinc-100 border border-zinc-700 p-3 rounded placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600' />
        {error.name && <p className='text-red-400'>{error.name}</p>}
        <label><b>Email</b></label>
        <input type="email" placeholder="Enter Email" value={email} onChange={e => {setEmail(e.target.value), setError(prev => ({ ...prev, email: null }))}} className='bg-zinc-800 text-zinc-100 border border-zinc-700 p-3 rounded placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600' />
        {error.email && <p className='text-red-400'>{error.email}</p>}
        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" value={password} onChange={e => {setPassword(e.target.value), setError(prev => ({ ...prev, password: null }))}} className='bg-zinc-800 text-zinc-100 border border-zinc-700 p-3 rounded placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600' />
        {error.password && <p className='text-red-400'>{error.password}</p>}
        <button className='bg-blue-900 text-white p-3 rounded hover:bg-blue-700 transition'>Sign Up</button>
      </form>

    </div>
  );
};

export default SignUp;
