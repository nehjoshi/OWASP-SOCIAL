import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, useTheme, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Loader from '../Loader.js';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularLoader from '../CircularLoader';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        position: 'relative',
        top: '65px',
        width: '60%',
        margin: '0 auto',
        background: 'white',
        height: 'fit-content',
        padding: '100px 20px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    heading: {
        width: '100%',
        padding: '10px 0px',
        borderBottom: '1px solid black'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: '20px auto',
        width: '100%',
        justifyContent: 'space-between',
        padding: '5px 10px',
        alignItems: 'center',
        borderBottom: '1px solid gray',
        '&:hover': {
            background: '#ebebeb',
            borderRadius: '4px'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    formInput: {
        margin: '10px',
    },
    formSubmit: {
        margin: '10px',
        width: '27%',
    },
    warning: {
        fontSize: '0.7rem',
        color: 'brown'
    },

}))

const Profile = () => {

    const [ready, setReady] = useState(false);
    const theme = useTheme();
    const classes = useStyles();
    const username = useSelector(state => state.auth.username);
    const email = useSelector(state => state.auth.email);
    const [current, setCurrent] = useState(null);
    const [newPwd, setNewPwd] = useState(null);
    const [confNew, setConfNew] = useState(null);
    const [invalidNew, setInvalidNew] = useState(false);
    const [invalidConf, setInvalidConf] = useState(true);
    const [flag, setFlag] = useState(false);
    const [loader, setLoader] = useState(false);
    const [response, setResponse] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1500)
    }, []);

    const handleCurrent = (e) => {
        setCurrent(e.target.value);
    }
    const handleNew = (e) => {
        setNewPwd(e.target.value);
        setFlag(true);
        if (e.target.value.length < 6) {
            setInvalidNew(true);
        }
        else {
            setInvalidNew(false);
        }
    }
    const handleConfNew = (e) => {
        setConfNew(e.target.value);
        setFlag(true);
        if (e.target.value.length < 6 || e.target.value !== newPwd) {
            setInvalidConf(true);
        }
        else {
            setInvalidConf(false);
        }
    }
    const handleSubmit = () => {
        setLoader(true);
        const data = { username: username, password: current, newPassword: newPwd };
        axios.post(`/user/${username}/update`, data)
            .then(res => {
                setTimeout(() => {
                    setLoader(false);
                    setResponse(res.data.message);
                    if (res.data.message==='Password Updated Successfully'){
                        document.getElementById('input').value='';
                        document.getElementById('input2').value='';
                        document.getElementById('input3').value='';
                        setTimeout(() => {
                            history.push(`/user/${username}/home`);
                        }, 1000)
                    }
                }, 1500)
            })
    }



    return (!ready) ? <Loader /> : (
        <Grid container className={classes.wrapper}>
            <Grid item className={classes.heading}>
                <Typography variant="h3">Account Information</Typography>
            </Grid>
            <Grid item className={classes.row}>
                <Typography variant="h5">Email</Typography>
                <Typography variant="h6" style={{ color: 'gray' }}>{email}</Typography>
                <CheckCircleIcon />
            </Grid>
            <Grid item className={classes.row}>
                <Typography variant="h5">User</Typography>
                <Typography variant="h6" style={{ color: 'gray' }}>{username}</Typography>
                <CheckCircleIcon />
            </Grid>
            <Grid item className={classes.row}>
                <Typography variant="h5">Phone</Typography>
                <Typography variant="h6" style={{ color: 'gray' }}>+91 9664025398</Typography>
                <CheckCircleIcon />
            </Grid>
            <Grid item className={classes.form} container> {/*Form*/}
                <Typography variant="h5">Change your password</Typography>
                <Grid item className={classes.formInput}>
                    <TextField variant="outlined" id="input" onChange={handleCurrent} label="Current Password" type="password" placeholder="Current Password" />
                </Grid>
                <Grid item className={classes.formInput}>
                    <TextField variant="outlined" id="input2" onChange={handleNew} label="New Password" type="password" autoComplete="off" placeholder="Password" />
                    {invalidNew ? <><br></br><span className={classes.warning}>Password must be of 6 letters</span></> : null}
                </Grid>
                <Grid item className={classes.formInput}>
                    <TextField variant="outlined" id="input3" onChange={handleConfNew} label="Confirm Password" type="password" autoComplete="off" placeholder="Password" />
                    {invalidConf ? <><br></br><span className={classes.warning}>Passwords do not match</span></> : null}
                </Grid>
                <Grid item className={classes.formSubmit}>
                    {(!invalidNew && !invalidConf && flag) ? <Button fullWidth onClick={handleSubmit} variant="contained" size="large" color="primary" >Submit</Button>
                        :
                        <Button fullWidth disabled variant="contained" size="large" color="primary" >Submit</Button>
                    }

                </Grid>
                {loader ?
                    <Grid item >
                        <CircularLoader />
                    </Grid> : null
                }
                {response ?
                    <Grid item>
                        <span className={classes.warning}>{response}</span>
                    </Grid> : null}

            </Grid>
        </Grid>
    )
}
export default Profile;