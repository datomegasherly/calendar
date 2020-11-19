import React, { Component, useState } from 'react';
import MainContext from '../context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getDate } from '../helper';
import Header from './header';

export function App(){
    let date = getDate();
    const [year, setYear] = useState(date[0]);
    const [month, setMonth] = useState(date[1]);
    const [day, setDay] = useState(date[2]);
    let state = {
        year, setYear,
        month, setMonth,
        day, setDay
    }
    return (
        <MainContext.Provider value={state} data-test="app-component">
            <Router>
                <Switch>
                    <Route exact path="/" component={Header} />
                </Switch>
            </Router>
        </MainContext.Provider>
    )
}

export default App;