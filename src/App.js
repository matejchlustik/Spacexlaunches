import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import LaunchDetails from './LaunchDetails';
import Login from './Login';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import Signup from './Signup';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={providerValue}>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/launch/:id">
                <LaunchDetails />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <ProtectedRoute path="/random">
                <h2>Hello</h2>
              </ProtectedRoute>
            </Switch>
          </div>
        </UserContext.Provider>
      </div>
    </Router>
  );

}

export default App;
