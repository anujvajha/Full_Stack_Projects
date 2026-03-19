import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-gray-200">
            <div>
                <Link to="/"><h1 className="text-xl font-bold text-blue-500 tracking-tight"> <i className="fa-regular fa-pen-to-square" style={{color: "rgb(62, 141, 229)"}}></i> DocFlow</h1></Link>
            </div>

            <div className="flex items-center gap-3">
                <Link to="/signup"><button className="px-4 py-1.5 text-sm font-medium text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition duration-200">Sign Up</button></Link>
                <Link to="/login"><button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200">Log In</button></Link>
                <Link to="/logout"><button className="px-4 py-1.5 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">Log Out</button></Link>
            </div>
        </div>
     );
}
 
export default Navbar;