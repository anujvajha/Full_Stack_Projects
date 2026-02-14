import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className="flex justify-between items-center p-4 text-white">
            <div>
                <Link to="/"><h1 className="text-2xl font-bold ml-3 text-blue-600">ExpenseIQ</h1></Link>
            </div>

            <div className="flex space-x-5 mr-2">
                <Link to="/signup"><button className="px-3 py-1">Sign Up</button></Link>
                <Link to="/login"><button className="px-3 py-1 text-blue-600">Log In</button></Link>
                <Link to="/editProfile"><button className="px-3 py-1">Edit Profile</button></Link>
                <Link to="/editPassword"><button className="px-3 py-1">Edit Password</button></Link>
                <Link to="/addTransaction"><button className="px-3 py-1">Add Transaction</button></Link>
                <Link to="/logout"><button className="px-3 py-1 text-blue-600">Log Out</button></Link>
            </div>
        </div>
     );
}
 
export default Navbar;