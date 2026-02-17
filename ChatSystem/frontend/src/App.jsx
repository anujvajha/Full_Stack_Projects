import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import Logout from './Components/LogOut';
import Footer from './Components/Footer';

function App() {

  return (
    <>
     <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )

}

export default App
