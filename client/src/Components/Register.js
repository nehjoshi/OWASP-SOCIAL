import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bg from '../media/bg1.svg';
import Loader from './Loader';
import logo from '../media/loader.png';
import Footer from './Footer';

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
    }
}))

const Register = () => {

    const classes = useStyles();
    const [ready, setReady] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [registerError, setRegisterError] = useState(null);   //Setting initial states

    useEffect(() => {

        setTimeout(() => {
            setReady(true);
            document.title = 'OWASP | Register';
        }, 2000)
    }, [])      //Waiting two seconds before loading the page; show the preloader before that

    const handleEmail = (e) => {    
        setEmail(e.target.value);
    }

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
        
        if (e.target.value.length < 6) {      //Check length of password
            setErrorPassword(true);
        }
        else {
            setErrorPassword(false);
        }
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        const data = { email: email, username: username, password: password };

        axios.post('/register', data)
            .then((res) => {
                    setRegisterError(res.data.message);
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
                            Register Here
                    </Typography>
                    </Grid>
                    <Grid item className={classes.formInput} >
                        <TextField variant="outlined" label="Email" placeholder="johnsmith@email.com" onChange={handleEmail} />
                    </Grid>
                    <Grid item className={classes.formInput}>
                        <TextField variant="outlined" label="Username" placeholder="johnsmith" onChange={handleUsername} />
                        {errorUsername ? <><br></br><span className={classes.warning}>Username must be of 6 letters</span></> : null}
                    </Grid>
                    <Grid item className={classes.formInput}>
                        <TextField variant="outlined" label="Password" type="password" placeholder="johnsmith@email.com" onChange={handlePassword} />
                        {errorPassword ? <><br></br><span className={classes.warning}>Password must be of 6 letters</span></> : null}
                    </Grid>
                    <Grid item className={classes.formSubmit}>
                        {errorUsername || errorPassword ? <Button fullWidth variant="contained" disabled size="large" color="primary">Submit</Button> :
                            <Button fullWidth variant="contained" size="large" color="primary" onClick={handleSubmit}>Submit</Button>}
                    </Grid>
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
export default Register;