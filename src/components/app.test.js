import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import { getByAttr } from '../../test/testUtil';

const setup = () => {
    return shallow(<App />);
}

describe('App Component :', () => {
    test('render App', () => {
        let wrapper = setup();
        let Component = getByAttr(wrapper, 'app-component');
    });
})