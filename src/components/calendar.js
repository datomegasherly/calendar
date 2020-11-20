import React, { useContext } from 'react';
import MainContext from '../context';
import { getLastDay, getDate, useStyles } from '../helper';
import { Grid, Card } from '@material-ui/core';
import classNames from 'classnames';

function Calendar() {
    const context = useContext(MainContext);
    let { year, month, day, setDay } = context;
    let currentDate = getDate();
    let lastDay = getLastDay(year, month);
    let days = [];
    for(let i = 1;i <= lastDay;i++){
        days.push(i);
    }
    let classes = useStyles();
    return (
        <Grid style={{marginTop: '15px'}} container>
            {
                days.map(d => {
                    return (
                        <Grid key={d} className={classes.boxMargin} container item xs={6} sm={4} md={3} lg={2}>
                            <Card className={classNames(classes.cardBox, 
                                year == currentDate[0] && 
                                month == currentDate[1] && 
                                d == currentDate[2] ? 'current' : d == day ? 'selected' : '')}

                                onClick={() => setDay(d)}
                            >
                                <div>{d}</div>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default Calendar;