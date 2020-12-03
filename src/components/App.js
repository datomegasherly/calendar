import React, { Component, useState, useEffect } from 'react';
import MainContext from '../context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getDate, url, configUrl } from '../helper';
import Home from './home';
import EventMode from './eventMode';
import axios from 'axios';

export function App(){
    let date = getDate();
    const [year, setYear] = useState(date[0]);
    const [month, setMonth] = useState(date[1]);
    const [day, setDay] = useState(date[2]);
    const [mode, setMode] = useState(3); // 1=>daily , 2=>weekly, 3=>monthly
    const [events, setEvents] = useState([]);
    let state = {
        year, setYear,
        month, setMonth,
        day, setDay,
        events, setEvents,
        mode, setMode
    }
    useEffect(() => {
        axios.get(url).then(function (res) {
            setEvents(res.data);
        }).catch(function (error) {
            throw error;
        });
        axios.get(configUrl).then(function (res) {
            let date = new Date(res.data.date);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            setYear(y);
            setMonth(m);
            setDay(d);
        }).catch(function (error) {
            throw error;
        });
    }, []);
    return (
        <MainContext.Provider value={state} data-test="app-component">
            <Router>
                <Switch>
                    <Route path="/add" component={() => EventMode('add')} />
                    <Route path="/edit/:id" component={(prop) => EventMode('edit', prop)} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </MainContext.Provider>
    )
}

export default App;