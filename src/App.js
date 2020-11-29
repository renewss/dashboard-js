import './assets/css/App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Home from './pages/home';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
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
                {/** 
          <Footer /> */}
            </Router>
        </div>
    );
}

export default App;
