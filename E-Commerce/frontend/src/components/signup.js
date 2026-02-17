import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      if (err.response && err.response.data && err.response.data.errors)
      {
        setErrors(Object.values(err.response.data.errors).join(", "));
        console.log(err.response.data.errors);
      }
      else
      {
        console.log("Signup not successful");
      }
    }
};

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <label><b>Name</b></label>
        <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}

        <label><b>Email</b></label>
        <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <p style={{color:"red"}}>{errors.email}</p>}

        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <p style={{color:"red"}}>{errors.password}</p>}

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
