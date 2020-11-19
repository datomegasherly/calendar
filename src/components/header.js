import React, { useContext } from 'react';
import MainContext from '../context';

function Header() {
    let context = useContext(MainContext);
    let { test, setTest } = context;
    return (
        <div>
            {test}
            <button onClick={() => setTest('name')}>TTT</button>
        </div>
    )
}

export default Header;