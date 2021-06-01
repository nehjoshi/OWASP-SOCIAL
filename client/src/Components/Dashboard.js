import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { useHistory } from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from './DashboardComponents/Navbar';
import LeftBar from './DashboardComponents/LeftBar';
import Home from './DashboardComponents/Home';
import Profile from './DashboardComponents/Profile';
import WorkCreator from './DashboardComponents/WorkCreator';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const useStyles = makeStyles(() => ({

    wrapper: {
        backgroundColor: '#f0e9e9',
        height: 'fit-content'
    }

}))

const Dashboard = () => {

    const username = useSelector(state => state.auth.username);
    const token = useSelector(state => state.auth.token);
    const [ready, setReady] = useState(false);
    const [res, setRes] = useState(null);
    const history = useHistory();
    const classes = useStyles();
    useEffect(() => {
        const data = { token: token };
        console.log(data);
        axios.post(`http://localhost:5000/user/${username}`, { data: data })
            .then(res => {
                if (res.data.message === 'sign in') history.push('/login');
                setReady(true);
                document.title = `${username} | Dashboard`;
            })
    }, [])

    return (!ready) ? <Loader /> : (
        <Router>
        <div className={classes.wrapper}>
            <Navbar />
            <LeftBar />
            <Switch>
                <Route path = {`/user/${username}/home`} component={Home} />
                <Route path = {`/user/${username}/profile`} component={Profile} />
                <Route path = {`/user/${username}/assign_public`} component={WorkCreator} />
            </Switch>
        </div>
        </Router>
    )

}
export default Dashboard;