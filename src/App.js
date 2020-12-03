import './assets/css/App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Login from './pages/login';
import Logout from './pages/logout';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

function App() {
    const cookies = new Cookies();

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/login">
                        {cookies.get('auth') && <Redirect to="/" />}
                        <Login />
                    </Route>

                    {!cookies.get('auth') && <Redirect to="/login" />}
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>

                    <Route exact path="/logout">
                        <Logout />
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
                {/* <Footer /> */}
            </Router>
        </div>
    );
}

export default App;
