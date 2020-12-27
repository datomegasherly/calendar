import React, { Fragment, useContext, useState } from 'react';
import MainContext from '../../context';
import { getCurrentDay, Days, getDate, useStyles, uri, toFormData, numToStr } from '../../helper';
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
    let { setEvents, setOpen } = context.dispatch;
    let [openCurrent, setOpenCurrent] = useState(false);
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
        if(events && events.find(r => r.id == id)){
            setOpenCurrent(true);
            setSelectedId(id);
        }
    }
    const removeCalendarSet = async() => {
        let id = selectedId;
        if(id && events && events.find(r => r.id == id)){
            let currentEvent = events.find(r => r.id == id);
            axios({
                method: 'DELETE',
                data: {},
                url: `${uri}/${currentEvent.full}/${currentEvent.id}`
                /**
                 * use async/await function because setEvents ( in context ) will reset eventMode function and it will remove state
                 */
            }).then(async res => {
                if(res.data.success){
                    events = events.filter(r => r.id != id);
                    setEvents(events);
                    setError(true);
                    setErrorSeverity('success');
                    setErrorTitle('selected event delete completed');
                    setOpenCurrent(false);
                }
            }).catch(err => {
                setOpenCurrent(false);
                setError(true);
                setErrorSeverity('error');
                setErrorTitle(err.message);
            });
        } else {
            setOpenCurrent(false);
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
                openCurrent ? 
                <Dialog
                open={openCurrent}
                onClose={() => setOpenCurrent(false)}
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
                    <Button onClick={() => setOpenCurrent(false)} color="primary">
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
                                events.map(event => {
                                    if(event.full == `${year}-${newMonth}-${newDay}`){
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
                                                                <Link to={`/edit/${event.id}`} onClick={() => setOpen(true)} className={classes.links}>
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
                                    }
                                })
                            }
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Daily;