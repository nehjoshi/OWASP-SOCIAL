import React, { useState, useEffect } from 'react';
import { Typography, Grid, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        position: 'fixed',
        top: '70px',
        left: 0,
        height: '100vh',
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        padding: '100px 0px'
    },
    boxWrapper: {
        background: 'transparent',
        width: '90%',
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        padding: '0px 10px',
        justifyContent: 'space-around',
        height: '50px',

        '&:hover': {
            background: '#e3dcdc',

            cursor: 'pointer'
        }
    },
    icon: {
        color: '#4ecfc8'
    }
}))

const LeftBar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const username = useSelector(state => state.auth.username);
    return (
        <Grid container className={classes.wrapper}>
            <Grid item className={classes.boxWrapper}>
                <AssignmentIcon style={{ color: '#fc9219' }} />
                <Typography variant="h6" style={{ fontFamily: 'Varela Round', userSelect: 'none' }}>Work Pending</Typography>
            </Grid>
            <Grid item className={classes.boxWrapper}>
                <AssignmentTurnedInIcon style={{ color: '#18d674' }} />
                <Typography variant="h6" style={{ fontFamily: 'Varela Round', userSelect: 'none' }}>Work Completed</Typography>
            </Grid>
            <Grid item className={classes.boxWrapper}>
                <AssignmentIndIcon className={classes.icon} />
                <Typography variant="h6" style={{ fontFamily: 'Varela Round', userSelect: 'none' }}>Work Assigned</Typography>
            </Grid>
            <Grid item className={classes.boxWrapper}>
                <EqualizerIcon style={{ color: '#cfc400' }} />
                <Typography variant="h6" style={{ fontFamily: 'Varela Round', userSelect: 'none' }}>Leaderboards</Typography>
            </Grid>
            <Link to={`/user/${username}/profile`} style={{textDecoration: 'none', color: 'inherit'}}>
                <Grid item className={classes.boxWrapper}>
                    <AccountCircleIcon style={{ color: 'black' }} />
                    <Typography variant="h6" style={{ fontFamily: 'Varela Round', userSelect: 'none' }}>Profile Security</Typography>
                </Grid></Link>
        </Grid>
    )
}
export default LeftBar;