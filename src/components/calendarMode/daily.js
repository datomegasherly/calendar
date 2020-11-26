import React, { useContext } from 'react';
import MainContext from '../../context';
import { getLastDay, getCurrentDay, Days, getDate, useStyles } from '../../helper';
import { Grid, Paper, Typography, Hidden } from '@material-ui/core';
import classNames from 'classnames';
import { 
    Timeline, 
    TimelineConnector, 
    TimelineItem, 
    TimelineOppositeContent, 
    TimelineSeparator, 
    TimelineDot,
    TimelineContent } from '@material-ui/lab';
import FastfoodIcon from '@material-ui/icons/Fastfood';

function Monthly() {
    const context = useContext(MainContext);
    let { year, month, day, setDay, events } = context;
    let currentDate = getDate();
    let classes = useStyles();
    return (
        <Grid style={{marginTop: '15px'}} container>
            <Grid className={classNames(classes.boxMargin, classes.selectSize)} item>
                <Paper elevation={2} className={classes.cardBox}>
                    <Typography variant="h6">{day}{year == currentDate[0] && 
                    month == currentDate[1] && 
                    day == currentDate[2] ? ' ( Today )' : ''}</Typography>
                    <Typography className={classes.smallText}>
                        {Days[getCurrentDay(year, month, day)]}
                    </Typography>
                    <Typography>
                        { 
                            events && 
                            events[`${year}-${month}-${day}`] && 
                            events[`${year}-${month}-${day}`].length ?  
                            <Timeline align="alternate">
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography variant="body2" color="textSecondary">
                                            9:30 am
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot>
                                            <FastfoodIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Paper elevation={3} className={classes.paper}>
                                            <Typography variant="h6" component="h1">
                                            Eat
                                            </Typography>
                                            <Typography>Because you need strength</Typography>
                                        </Paper>
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                            : 'No Events'
                        }
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Monthly;