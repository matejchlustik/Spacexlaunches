import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "./useAuth";
import { UserContext } from "./UserContext";

const Navbar = () => {

    useAuth();
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    const logout = async () => {
        try {
            await fetch("http://localhost:8000/logout", {
                method: "GET",
                credentials: 'include'
            })
            localStorage.removeItem("user");
            setUser(null);
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className="navbar">
            <h1>Launches</h1>
            <div className="links">
                <Link to="/" className="nav-link">Home</Link>
                {!user && <div className="authButtons">
                    <Link to="/signup"><button className="btn">Signup</button></Link>
                    <Link to="/login"><button className="btn">Login</button></Link>
                </div>}
                {user && <div className="authButtons">
                    <button onClick={logout} className="btn logout-btn">Logout</button>
                </div>}
            </div>
        </nav>
    );
}

export default Navbar;