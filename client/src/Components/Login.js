import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bg from '../media/bg1.svg';
import Loader from './Loader';
import logo from '../media/loader.png';
import CircularLoader from './CircularLoader';
import Footer from './Footer';
import store from '../store.js';
import LoginAction from '../actions/LoginAction';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({   //Page styles
    pageWrapper: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover'
    },
    formWrapper: {
        background: 'transparent',
        height: '75vh',
        dislpay: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',

        borderRadius: '10px',
        '&:hover': {
            borderColor: 'yellow',
            transitionDuration: '0.5s'
        }
    },
    mainLabel: {
        marginTop: '10px',
        fontFamily: 'Varela Round',
        color: '#fff'
    },
    formInput: {
        margin: '10px',
    },
    formSubmit: {
        margin: '10px',
        width: '60%',
    },
    warning: {
        fontSize: '0.7rem',
        color: 'brown'
    },
}))

const Login = () => {

    const classes = useStyles();
    const [ready, setReady] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [registerError, setRegisterError] = useState(null);   //Setting initial states
    const [loader, setLoader] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.title = 'OWASP | Login';
        setTimeout(() => {
            setReady(true);
        }, 2000)

    }, [])      //Waiting two seconds before loading the page; show the preloader before that



    const handleUsername = (e) => {
        setUsername(e.target.value);
        if (e.target.value.length < 6) {      //Check length of username
            setErrorUsername(true);
        }
        else {
            setErrorUsername(false);
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 6) {      //Check length of password
            setErrorPassword(true);
        }
        else {
            setErrorPassword(false);
        }
    }

    const handleSubmit = () => {
        const data = { username: username, password: password };
        setRegisterError(null);
        setLoader(true);

        axios.post('/login', data)
            .then((res) => {
                setTimeout(() => {
                    setLoader(false);
                    setRegisterError(res.data.message)
                    if (res.data.message === 'Successfully Logged In') {
                        const data = {
                            username: res.data.userData.username,
                            email: res.data.userData.email,
                            token: res.data.token
                        }
                        store.dispatch(LoginAction(data));
                        setTimeout(() => {
                            history.push(`/user/${username}/home`);
                        }, 1500)

                    }
                }, 1000)


            })
    }

    return (!ready) ? <Loader /> :
        (

            <section className={classes.pageWrapper}>
                <Grid container className={classes.formWrapper}>
                    <Grid item>
                        <img src={logo} />
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h4" className={classes.mainLabel}>
                            Login Here
                    </Typography>
                    </Grid>
                    <Grid item className={classes.formInput}>
                        <TextField variant="outlined" label="Username" placeholder="johnsmith" onChange={handleUsername} />
                        {errorUsername ? <><br></br><span className={classes.warning}>Username must be of 6 letters</span></> : null}
                    </Grid>
                    <Grid item className={classes.formInput}>
                        <TextField variant="outlined" label="Password" type="password" autoComplete="off" placeholder="Password" onChange={handlePassword} />
                        {errorPassword ? <><br></br><span className={classes.warning}>Password must be of 6 letters</span></> : null}
                    </Grid>
                    <Grid item className={classes.formSubmit}>
                        {errorUsername || errorPassword ? <Button fullWidth variant="contained" disabled size="large" color="primary">Submit</Button> :
                            <Button fullWidth variant="contained" size="large" color="primary" onClick={handleSubmit}>Submit</Button>}
                    </Grid>
                    {loader ?
                        <Grid item >
                            <CircularLoader />
                        </Grid> : null
                    }
                    {registerError ?
                        <Grid item >
                            <span className={classes.warning}>{registerError}</span>
                        </Grid> : null
                    }
                </Grid>

                <Footer />
            </section>
        )
}
export default Login;