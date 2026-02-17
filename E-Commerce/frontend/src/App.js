import './App.css';
import Navbar from './components/navbar.js';
import SignUp from './components/signup.js';
import LogIn from './components/login.js';
import LogOut from './components/logout.js';
import Home from './components/home.js';
import Notfound from './components/404.js';
import ViewCart from './components/viewcart.js';
import Footer from './components/footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  return (
    <Router>
      <div className="App">
        <Navbar search={search} setSearch={setSearch} onSearchClick={() => setAppliedSearch(search)} />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home search={appliedSearch} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/viewcart" element={<ViewCart />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
export default App;
