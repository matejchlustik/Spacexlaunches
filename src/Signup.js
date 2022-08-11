import { useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import { UserContext } from "./UserContext";

const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = { username, email, password };
        try {
            const res = await fetch("http://localhost:8000/signup", {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (data.user) {
                localStorage.setItem("user", data.user);
                setUser(data.user);
                history.push("/")
            }
            if (data.errors) {
                setErrors(data.errors);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div>{errors.username}</div>}
                <label>Email</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div>{errors.email}</div>}
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div>{errors.password}</div>}
                <button>Signup</button>
            </form>
        </div>
    );
}

export default Signup;