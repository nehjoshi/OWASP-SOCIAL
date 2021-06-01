import React, { useEffect, useState } from 'react';
import Loader from '../Loader.js';
import { Typography, Grid, useTheme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import PublicWorkCard from './PublicWorkCard';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        top: '70px',
        margin: '0 auto',
        width: '60%',
        minHeight: '100vh',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },

    },
    headerWrapper: {
        margin: '20px auto',
        color: 'purple',
        textAlign: 'center',
        height: 'fit-content'
    },
    text: {
        fontFamily: 'Varela Round'
    }
}))

const Home = () => {
    const username = useSelector(state => state.auth.username);
    const [ready, setReady] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [dynamic, setDynamic] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    useEffect(() => {
        axios.get(`/user/${username}/public_posts`)
            .then(res => {
                setAllPosts(res.data.posts.reverse());
                RenderPosts(res.data.posts.reverse());
                setTimeout(() => {

                    setReady(true);
                }, 1500)

            })
    }, []);

    const handleClose = () => {
        setOpen(!open);
    }

    const RenderPosts = (posts) => {
        
        let newDynamic = [];
        axios.get(`/user/${username}/get_pending`)
            .then(res => {


                const pendingList = res.data.workPending;
                console.log(pendingList.length);
                if (pendingList.length === 0) {

                    posts.map(item => {
                        newDynamic.push(
                            <PublicWorkCard key={item.author} handleClose={handleClose} username={item.author} msg={item.post} deadline={item.deadline} points={item.points} />
                        );
                    })
                    setDynamic(newDynamic);
                }
                else {

                    for (let i = 0; i < posts.length; i++) {
                        for (let j = 0; j < pendingList.length; j++) {
                            if (posts[i].post === pendingList[j].post) {
                                console.log('matched!');
                            }
                            else {
                                console.log('Not matched');
                                newDynamic.push(
                                    <PublicWorkCard key={posts[i].author} handleClose={handleClose} username={posts[i].author} msg={posts[i].post} deadline={posts[i].deadline} points={posts[i].points} />
                                )

                            }
                        }
                    }
                    console.log(newDynamic);
                    setDynamic(newDynamic);
                }
            })
    }

    return (!ready) ? <Loader /> : (
        <Grid container className={classes.wrapper}>
            <Grid item className={classes.headerWrapper}>
                <Typography variant="h3" className={classes.text}>Welcome <br></br> {username}</Typography>
            </Grid>
            {dynamic}
            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Work Accepted!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        </Grid>
    )
}
export default Home;