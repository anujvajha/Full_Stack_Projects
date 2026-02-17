import { Link } from "react-router-dom";

const Notfound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry!</h2>
            <p>That page cannot be found!</p>
            <Link to="/">Back to HomePage..</Link>
        </div>

     );
}
 
export default Notfound;