import React, { useEffect } from 'react';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';


export const Redirect = () => {
    const history = useHistory();
    useEffect(() => {
        history.push('/login');
    })
    return (
        <></>
    )
}


const App = () => {

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Redirect} />
                <Route exact path='/register' component={Register} />
                <Route path='/login/' component={Login} />
                <Route path='/user/:username/home' component={Dashboard} />
            </Switch>
        </Router>
    )
}
export default App;


