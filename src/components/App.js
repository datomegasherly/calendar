import React, { Component, useState } from 'react';
import MainContext from '../context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';

export function App(){
    const [test, setTest] = useState('123');
    let state = {
        test,
        setTest
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