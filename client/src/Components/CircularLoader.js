import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

    loader: {
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: '$spin 2s linear infinite'
    } ,
    '@keyframes spin': {
        '0%' : { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    }

}))

const CircularLoader = () => {
    const classes = useStyles();
    return(
        <div className = {classes.loader}>

        </div>
    )
}
export default CircularLoader;