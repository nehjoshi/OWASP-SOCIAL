import React from 'react';
import { Typography, Grid, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#2f2442',
        height: '10vh',
        width: '100%',
        alignSelf: 'baseline',
        position: 'absolute',
        bottom: 0,
        
    },
    text: {
        color: 'white',
        fontFamily: 'Varela Round'
    }

}))

const Footer = () => {
    const classes = useStyles();
    return (
        <section className={classes.wrapper}>
            <span className={classes.text}>OWASP VITCC | All logos have been trademarked</span>
        </section>
    )
}
export default Footer;