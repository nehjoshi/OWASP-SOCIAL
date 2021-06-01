import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PanToolIcon from '@material-ui/icons/PanTool';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useSelector} from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles(() => ({

    wrapper: {
        background: 'white',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',    
        width: '60%',
        margin: '30px auto',
        padding: '5px 5px',
        border: '2px solid transparent',
        borderRadius: '10px',
        boxShadow: '0 0 2px 2px #828282'
    },
    topBar: {
        width: '100%'
    },
    message: {
        borderBottom: '1px solid gray',
    },
    bottomBar: {
        display: 'flex',
        marginTop: '10px',
        flexDirection: 'row'
    },
    raiseHand: {
        color: 'gray',
        marginLeft: '20px',
        '&:hover': {
            cursor: 'pointer',
            color: 'black'
        }
    },
    question: {
        color: '#4e5c6b'
    },
    author: {
        color: 'gray',
        fontSize: '1rem'
    }

}))

const PublicWorkCard = (props) => {
    const classes = useStyles();
    const username = useSelector(state => state.auth.username);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleAccept = () => {
        setOpen(false);
        props.handleClose();
        const data = {post: props.msg, author: props.username, deadline: props.deadline, points: props.points};

        axios.post(`/user/${username}/accept_work`, data)
        .then(res => {
            console.log(res.data.message);
        })
      }

    return (
        <Grid container className={classes.wrapper}>
            <Grid item className={classes.topBar} >
                <Typography variant="h6" className={classes.author}>{props.username} posted: </Typography>
            </Grid>
            <Grid item className={classes.message}>
                <Typography style={{ fontSize: '1.2rem' }}>{props.msg}</Typography>
            </Grid>
            <Grid item className={classes.message}>
                <Typography style={{ fontSize: '1.2rem', color: 'red', marginTop: '7.5px', paddingBottom: '7.5px' }} >Deadline: {props.deadline}</Typography>
            </Grid>
            <Grid item className={classes.message}>
                <Typography style={{ fontSize: '1.2rem', color: 'green', marginTop: '7.5px', paddingBottom: '7.5px' }} >Points: {props.points}</Typography>
            </Grid>
            <Grid item className={classes.bottomBar}>
                <Typography className={classes.question}>Up for the task?</Typography>
                <PanToolIcon className={classes.raiseHand} onClick={handleClickOpen}/>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Important Notice"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By agreeing to volunteer, you are expected to finish the work assigned within the given time frame.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No, I'll pass
          </Button>
                    <Button onClick={handleAccept} color="primary" autoFocus>
                        Let's Go!
          </Button>
                </DialogActions>
            </Dialog>

        </Grid>
    )
}
export default PublicWorkCard;