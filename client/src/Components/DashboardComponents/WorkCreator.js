import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, useTheme, TextField, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Loader from '../Loader.js';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({

    wrapper: {
        position: 'relative',
        top: '65px',
        width: '60%',
        margin: '0 auto',
        background: 'white',
        height: 'fit-content',
        padding: '75px 20px',
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
        marginTop: '10px',
        marginLeft: '5px',
    },
    text: {
        color: 'gray',
        fontSize: '1.2rem'
    },
    formWrapper: {
        width: '100%',
        marginTop: '20px'
    },
    formContainer: {
        margin: '0 auto',
        height: 'fit-content',
        width: '70%',
        background: '#f7f7f7',
        padding: '10px 10px'
    },
    submit: {
        display: 'block',
        margin: '15px auto'
    }

}))

const WorkCreator = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [ready, setReady] = useState(false);
    const [tick, setTick] = useState(false);
    const [tickP, setTickP] = useState(false);
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [points, setPoints] = useState('');
    const username = useSelector(state => state.auth.username);

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1500)
    }, []);

    const handleTick = () => {
        setTick(!tick);
        document.getElementById('date_id').value = '';
    }
    const handleTickP = () => {
        setTickP(!tickP);
        document.getElementById('points_id').value = '';
    }
    const handleMessage = (e) => {
        setMessage(e.target.value);
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const handlePoints = (e) => {
        setPoints(e.target.value);
    }
    const handleSubmit = () => {
        const data = {
            post: message,
            deadline: date,
            points: points
        }
        axios.post(`/user/${username}/assign_public`, data)
        .then(res => {
            console.log(res.data.message);
        })
    }

    return (!ready) ? <Loader /> : (
        <Grid container className={classes.wrapper}>
            <Grid item className={classes.heading}>
                <Typography variant="h4">Assign Work Publicly</Typography>
            </Grid>
            <Grid item className={classes.row}>
                <Typography className={classes.text}>Here you can add a post to let people know you're offering this task. Make sure to clearly mention what
                you want, and the number of points you are offering.</Typography>
            </Grid>
            <Grid item className={classes.formWrapper}>
                <Paper className={classes.formContainer}>
                    <TextField onChange={handleMessage} style={{ marginBottom: '10px' }} multiline rows={6}  autoComplete="off" variant="outlined" label="Insert Message Here" placeholder="Message..." fullWidth />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tick}
                                onChange={handleTick}
                                color="primary"
                            />
                        }
                        label="Deadline"
                    />
                    {tick ?
                        <TextField color="primary" autoComplete="off" onChange={handleDate} id="date_id" variant="outlined" label="Deadline" placeholder="XX/XX/20XX" />
                        :
                        <TextField color="primary" id="date_id" disabled variant="outlined" label="Deadline" placeholder="XX/XX/20XX" />}
                    <br></br>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tickP}
                                onChange={handleTickP}
                                color="primary"
                            />
                        }
                        style={{ marginTop: '10px', marginRight: '35px' }}


                        label="Points"
                    />
                    {tickP ?
                        <TextField color="primary" autoComplete="off"  onChange={handlePoints} id="points_id" style={{ marginTop: '10px' }} variant="outlined" label="Points" placeholder="10" />
                        :
                        <TextField color="primary" id="points_id" style={{ marginTop: '10px' }} disabled variant="outlined" label="Points" placeholder="10" />}
                    <Button variant="contained" onClick={handleSubmit} className={classes.submit} color="primary" size="large">Add post</Button>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default WorkCreator;