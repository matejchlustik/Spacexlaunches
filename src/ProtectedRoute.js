import { Redirect, Route, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = ({ children, ...rest }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        <Route {...rest} render={() => {
            if (auth === "authenticated") {
                return children;
            }
            if (auth === "unauthenticated") {
                return <Redirect to={{ pathname: "/login", state: { from: location } }} />
            }
        }} />
    );
}

export default ProtectedRoute;