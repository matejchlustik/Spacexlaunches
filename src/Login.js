import { useContext, useState } from "react";
import { Redirect, useLocation } from 'react-router-dom'
import { UserContext } from "./UserContext";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { state } = useLocation();
    const { from } = state || { from: { pathname: "/" } };
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = { email, password };
        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (data.user) {
                localStorage.setItem("user", data.user);
                setUser(data.user);
            }
            if (data.errors) {
                setErrors(data.errors);
                localStorage.removeItem("user");
                setUser(null);
            }
        } catch (err) {
            console.log(err);
            localStorage.removeItem("user");
            setUser(null);
        }
    }

    if (user) {
        return <Redirect to={from} />;
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;