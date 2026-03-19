import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    const user = { name, email, password };

    try 
    {
      const res = await axios.post('http://localhost:5001/signup', user, { withCredentials: true });
      if(res.status===201) navigate("/");
    }
    catch (err)
    {
      if (err.response && err.response.data && err.response.data.errors)
      {
        console.log("Signup errors:", err.response.data.errors);
      }
      else
      {
        console.log("Signup not successful:", err.message);
      }
    }
  };

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <label><b>Name</b></label>
        <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />

        <label><b>Email</b></label>
        <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />

        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;