import React, { Fragment, useContext, useState } from 'react';
import MainContext from '../../context';
import { getCurrentDay, Days, getDate, useStyles, url, toFormData, numToStr } from '../../helper';
import { 
    Grid, 
    Paper, 
    Typography, 
    Hidden, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Snackbar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import { 
    Timeline, 
    TimelineConnector, 
    TimelineItem, 
    TimelineOppositeContent, 
    TimelineSeparator, 
    TimelineDot,
    TimelineContent, 
    Alert} from '@material-ui/lab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Daily() {
    const context = useContext(MainContext);
    let { year, month, day, events } = context.state;
    let { setEvents } = context.dispatch;
    let [open, setOpen] = useState(false);
    let [ selectedId, setSelectedId ] = useState(false);
    let [ error, setError ] = useState(false);
    let [ errorSeverity, setErrorSeverity ] = useState('error');
    let [ errorTitle, setErrorTitle ] = useState('');
    let full = `${year}-${numToStr(month)}-${numToStr(day)}`;
    let currentDate = getDate();
    let classes = useStyles();
    let newDay = numToStr(day);
    let newMonth = numToStr(month);
    const removeCalendar = (id) => {
        if(events[full] && events[full].find(r => r.id == id)){
            setOpen(true);
            setSelectedId(id);
        }
    }
    const removeCalendarSet = async() => {
        let id = selectedId;
        if(id && events[full] && events[full].find(r => r.id == id)){
            let currentEvent = events[full].find(r => r.id == id);
            axios({
                method: 'DELETE',
                data: {},
                url: `${url}/${currentEvent.full}/${currentEvent.id}`
                /**
                 * use async/await function because setEvents ( in context ) will reset eventMode function and it will remove state
                 */
            }).then(async res => {
                if(res.data.success){
                    let newEvents = events[full].filter(r => r.id != id);
                    setEvents({...events, [full] : newEvents});
                    setError(true);
                    setErrorSeverity('success');
                    setErrorTitle('selected event delete completed');
                    setOpen(false);
                }
            }).catch(err => {
                setOpen(false);
                setError(true);
                setErrorSeverity('error');
                setErrorTitle(err.message);
            });
        } else {
            setOpen(false);
            setSelectedId(false);
        }
    }
    return (
        <Fragment>
            {
                <Snackbar open={error} onClick={() => setError(false)}>
                    <Alert severity={errorSeverity}>{errorTitle}</Alert>
                </Snackbar>
            }
            {
                open ? 
                <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete Event</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete selected Event ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={removeCalendarSet} color="secondary" autoFocus>
                        Confirm Delete
                    </Button>
                    </DialogActions>
                </Dialog> : ''
            }
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
                                                            <Button className={classes.marginRight} onClick={() => removeCalendar(event.id)} variant="outlined" color="secondary">
                                                                <EditIcon /><Hidden only={['xs', 'sm']}> Delete</Hidden>
                                                            </Button>
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
        </Fragment>
    )
}

export default Daily;