import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const useAuth = () => {

    const { user, setUser } = useContext(UserContext);
    const [auth, setAuth] = useState("pending");

    useEffect(() => {
        const abortCont = new AbortController();
        async function fetchAuth(abortCont) {
            if (user) {
                try {
                    const res = await fetch("http://localhost:8000/auth", {
                        method: "POST",
                        credentials: 'include',
                        signal: abortCont.signal
                    });
                    const data = await res.json();
                    if (data.user) {
                        setUser(data.user);
                        localStorage.setItem("user", data.user);
                        setAuth("authenticated");
                    }
                    if (data.err) {
                        setUser(null);
                        localStorage.removeItem("user");
                        setAuth("unauthenticated");
                    }
                } catch (err) {
                    if (err.name === "AbortError") {
                        console.log("fetch aborted");
                    }
                    localStorage.removeItem("user");
                    setAuth("unauthenticated");
                    setUser(null);
                }
            } else {
                setAuth("unauthenticated");
                setUser(null);
                localStorage.removeItem("user");
            }
        }

        fetchAuth(abortCont);

        return () => abortCont.abort();

    }, [user, setUser]);

    return { auth };
}

export default useAuth;