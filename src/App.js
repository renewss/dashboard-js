import './assets/css/App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
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
