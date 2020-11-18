import React, { Component } from 'react';
import MainContext from '../context';

class Header extends Component {
    static contextType = MainContext;
    constructor(props){
        super(props);
    }
    render() {
        let { test, setTest } = this.context;
        return (
            <div>
                {test}
                <button onClick={() => setTest('name')}>TTT</button>
            </div>
        )
    }
}

export default Header;