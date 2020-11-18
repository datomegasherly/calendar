import React, { Component } from 'react';
import MainContext from '../context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';

class App extends Component {
    state = {
        test: '123',
        setTest: test => this.setState({test}),
    }
    render(){
        return (
            <MainContext.Provider value={this.state}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Header} />
                    </Switch>
                </Router>
            </MainContext.Provider>
        )
    }
}

export default App;