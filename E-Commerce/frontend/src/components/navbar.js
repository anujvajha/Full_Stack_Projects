import {Link} from 'react-router-dom';

const Navbar = ({search, setSearch, onSearchClick}) => {
    return ( 
        <div className='main-nav'>
            <nav>
                <Link to="/" style={{textDecoration:"none"}}><h1 className='logo'>Ｍᴀʀᴋᴇᴛʟʏ</h1></Link>

                <div className='search'>
                    <input type="text" placeholder='What are you looking for?' className='inputbar' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    
                    <button className="searchbtn" onClick={onSearchClick}>
                        <i
                            className="fa-solid fa-magnifying-glass"
                            style={{ color: "#ffffff" }}
                        ></i>
                    </button>
                </div>

                <div className='nav-actions'>
                    <Link to="/signup"><button>SignUp</button></Link>
                    <Link to="/login"><button>LogIn</button></Link>
                    <Link to="/viewcart"><button>Cart <i className="fa-solid fa-cart-arrow-down" style={{color: "#ffffff"}}></i></button></Link>
                    <Link to="/logout"><button>LogOut</button></Link>
                </div>
            </nav>
        </div>
     );
}
 
export default Navbar;