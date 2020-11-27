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
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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
                            events[`${year}-${month}-${day}`].map(event => {
                                let startTime = `${event.start_time.hour < 10 ? `0${event.start_time.hour}` : event.start_time.hour}:${event.start_time.minute < 10 ? `0${event.start_time.minute}` : event.start_time.minute}`;
                                let endTime = `${event.end_time.hour < 10 ? `0${event.end_time.hour}` : event.end_time.hour}:${event.end_time.minute < 10 ? `0${event.end_time.minute}` : event.end_time.minute}`;
                                return (
                                    <Timeline align="alternate">
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary" className={classes.padding10}>
                                                    {startTime} - {endTime}
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot>
                                                    <AccessTimeIcon />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Paper elevation={3} className={classes.padding10}>
                                                <Typography>{event.event}</Typography>
                                                </Paper>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                )
                            })
                            : 'No Events'
                        }
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Monthly;