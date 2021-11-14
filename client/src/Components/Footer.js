import React from 'react';
import { Typography, Grid, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

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
        fontFamily: 'Varela Round',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem'
        }
    }

}))

const Footer = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <section className={classes.wrapper}>
            <span className={classes.text}>OWASP VITCC | All logos have been trademarked</span>
        </section>
    )
}
export default Footer;