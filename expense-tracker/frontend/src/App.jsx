import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import AddTransaction from './components/AddTransaction';
import Logout from './components/logout';
import Footer from './components/footer';
import EditProfile from './components/EditProfile';
import EditPassword from "./components/EditPassword";


function App() {

  return (
    <>
     <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/editPassword" element={<EditPassword />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )

}

export default App
