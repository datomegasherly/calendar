import React, { useContext } from 'react';
import MainContext from '../../context';
import { getCurrentDay, Days, getDate, useStyles, numToStr } from '../../helper';
import { Grid, Paper, Typography, Hidden, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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
import { Link } from 'react-router-dom';

function Daily() {
    const context = useContext(MainContext);
    let { year, month, day, setDay, events } = context;
    let currentDate = getDate();
    let classes = useStyles();
    let newDay = numToStr(day);
    let newMonth = numToStr(month);
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
                            events[`${year}-${newMonth}-${newDay}`] && 
                            events[`${year}-${newMonth}-${newDay}`].length ?  
                            events[`${year}-${newMonth}-${newDay}`].map(event => {
                                let startTime = `${numToStr(event.start_time.hour)}:${numToStr(event.start_time.minute)}`;
                                let endTime = `${numToStr(event.end_time.hour)}:${numToStr(event.end_time.minute)}`;
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
                                                <Typography>
                                                    <Grid className={classes.floatright}>
                                                        <Link to={`/edit/${event.id}`} className={classes.links}>
                                                            <Button variant="outlined" color="primary">
                                                                <EditIcon /><Hidden only={['xs', 'sm']}> Edit</Hidden>
                                                            </Button>
                                                        </Link>    
                                                    </Grid>
                                                    <Grid>{event.event}</Grid>
                                                </Typography>
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

export default Daily;