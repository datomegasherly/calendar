import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import { getByAttr } from '../../test/testUtil';
import { getDate } from '../helper';

const setup = () => {
    return shallow(<App />);
}

describe('App Component :', () => {
    test('render App', () => {
        let wrapper = setup();
        let Component = getByAttr(wrapper, 'app-component');
    });
});

describe('state control of useEffect', () => {
    test('update year, month and day when useEffect call', () => {
        const mockSetState = jest.fn();
        //let date = getDate();
        React.useState = jest.fn(() => ["", mockSetState]);
        jest.spyOn(React, 'useEffect').mockImplementation(f => jest.fn());
        const wrapper = setup();
    });
});