import React, { useContext } from 'react';
import MainContext from '../../context';
import { getLastDay, getCurrentDay, Days, getDate, useStyles } from '../../helper';
import { Grid, Paper, Typography, Hidden } from '@material-ui/core';
import classNames from 'classnames';

function Monthly() {
    const context = useContext(MainContext);
    let { year, month, day, setDay, events } = context;
    let currentDate = getDate();
    let classes = useStyles();
    return (
        <Grid style={{marginTop: '15px'}} container>
            <Grid className={classNames(classes.boxMargin, classes.selectSize)} item>
                <Paper elevation={2} className={classNames(classes.cardBox, 
                    year == currentDate[0] && 
                    month == currentDate[1] && 
                    day == currentDate[2] ? 'current' : '')}
                >
                    <Typography variant="h6">{day}</Typography>
                    <Typography className={classes.smallText}>
                        {Days[getCurrentDay(year, month, day)]}
                    </Typography>
                    <Typography>
                        { 
                            events && 
                            events[`${year}-${month}-${day}`] && 
                            events[`${year}-${month}-${day}`].length ?  
                                `${events[`${year}-${month}-${day}`].length} Events` : 'No Events'
                        }
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Monthly;