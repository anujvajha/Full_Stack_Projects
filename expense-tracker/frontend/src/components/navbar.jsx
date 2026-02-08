import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div>
            <Link to="/"><h1>ExpenseIQ</h1></Link>
            <Link to="/signup"><button>Sign Up</button></Link>
            <Link to="/login"><button>Log In</button></Link>
            <Link to="/editProfile"><button>Edit Profile</button></Link>
            <Link to="/addTransaction"><button>Add Transaction</button></Link>
            <Link to="/logout"><button>Log Out</button></Link>
        </div>
     );
}
 
export default Navbar;