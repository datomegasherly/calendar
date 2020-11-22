import React, { Component, useState } from 'react';
import MainContext from '../context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getDate } from '../helper';
import Home from './home';

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
    return (
        <MainContext.Provider value={state} data-test="app-component">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </MainContext.Provider>
    )
}

export default App;