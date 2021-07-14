import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Grid, useTheme } from '@material-ui/core';
import logo from '../../media/loader.png';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginAction from '../../actions/LoginAction';
import store from '../../store.js';

const useStyles = makeStyles((theme, flag) => ({


    wrapper: {
        background: 'white',
        paddingLeft: '20px',
        paddingRight: '20px',
    },

    logo: {
        height: '50px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    heading: {
        fontFamily: 'Varela Round',
        paddingLeft: '20px',
        color: 'gray',
        paddingTop: '12.5px',
        userSelect: 'none'
    },
    navbarLeft: {
        width: 'fit-content',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }
    },
    username: {
        position: 'absolute',
        right: 0,
        color: 'gray'
    },
    selectorWrapper: {
        dislpay: 'block',
        background: 'blue',
        margin: '0 auto'
    },
    icon: {

        color: 'gray',
        fontSize: '2.8rem',
        '&:hover': {
            cursor: 'pointer',
            color: '#a0a3a1'
        }
    },
    iconWrapper: {
        height: '100%',
        position: 'relative',
        top: '6px',
        padding: '0 20px',
    },
    iconBox: {
        display: 'flex',
        width: 'fit-content',

        margin: '0 300px',

        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    logout: {
        position: 'absolute',
        right: 0
    },
    logout_text: {
        fontFamily: 'Varela Round',
        paddingLeft: '20px',
        color: 'gray',
        '&:hover': {
            cursor: 'pointer'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }

}))

const Navbar = () => {
    const flag = true;
    const theme = useTheme();
    const classes = useStyles(theme, flag);
    const username = useSelector(state => state.auth.username);
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    useEffect(() => {
        document.getElementById('home').style = 'border-bottom: 4px solid blue';
    }, [])

    const handleWork = () => {
        document.getElementById('home').style = 'border-bottom: 0px solid blue';
        document.getElementById('work').style = 'border-bottom: 4px solid blue';
        document.getElementById('account').style = 'border-bottom: 0px solid blue';
        document.getElementById('stats').style = 'border-bottom: 0px solid blue';
    }
    const handleHome = () => {
        document.getElementById('home').style = 'border-bottom: 4px solid blue';
        document.getElementById('work').style = 'border-bottom: 0px solid blue';
        document.getElementById('account').style = 'border-bottom: 0px solid blue';
        document.getElementById('stats').style = 'border-bottom: 0px solid blue';
    }
    const handleAccount = () => {
        document.getElementById('home').style = 'border-bottom: 0px solid blue';
        document.getElementById('work').style = 'border-bottom: 0px solid blue';
        document.getElementById('account').style = 'border-bottom: 4px solid blue';
        document.getElementById('stats').style = 'border-bottom: 0px solid blue';
    }
    const handleStats = () => {
        document.getElementById('home').style = 'border-bottom: 0px solid blue';
        document.getElementById('work').style = 'border-bottom: 0px solid blue';
        document.getElementById('account').style = 'border-bottom: 0px solid blue';
        document.getElementById('stats').style = 'border-bottom: 4px solid blue';
    }
    const handleLogout = () => {
        const data = {username: null, token: null, email:  null, data: null};
        store.dispatch(LoginAction(data));
        window.location.href="/login";
    }

    return (
        <AppBar position="fixed" className={classes.wrapper}>
            <Toolbar>
                <Grid container className={classes.navbarLeft}>
                    <Grid item>
                        <img src={logo} className={classes.logo} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" className={classes.heading}>OWASP - SOCIAL</Typography>
                    </Grid>
                </Grid>
                <div className={classes.iconBox}>
                    <div className={classes.iconWrapper} id="home" onClick={handleHome}>
                        <Link to={`/user/${username}/home`}><HomeIcon className={classes.icon} /></Link>
                    </div>
                    <div className={classes.iconWrapper} id="work">
                        <Link to={`/user/${username}/assign_public`}><WorkIcon onClick={handleWork} className={classes.icon} /></Link>
                    </div>
                    <div className={classes.iconWrapper} id="account" onClick={handleAccount}>
                        <Link to={`/user/${username}/profile`}><AccountBoxIcon className={classes.icon} /></Link>
                    </div>
                    <div className={classes.iconWrapper} id="stats">
                        <EqualizerIcon className={classes.icon} onClick={handleStats} />
                    </div>
                </div>
                <div className={classes.logout}>
                    <Typography variant="h6" className={classes.logout_text} onClick={handleLogout}>Log Out</Typography>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;