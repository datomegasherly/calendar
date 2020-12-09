import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './calendar';

import { getByAttr } from '../../test/testUtil';

const setup = () => {
    return shallow(<Calendar />);
}

describe('test switch between monthly / weekly / daily on change mode', () => {
    let realUseContext;
    beforeEach(() => {
        realUseContext = React.useContext;
    });
    afterEach(() => {
        React.useContext = realUseContext;
    });
    test('switch to monthly when context mode is 3', () => {
        React.useContext = jest.fn(() => ({state: {mode: 3}}));
        const wrapper = setup();
        const monthlyComponent = getByAttr(wrapper, 'monthly-component');
        expect(monthlyComponent.length).toBe(1);
    });
    test('switch to weekly when context mode is 2', () => {
        React.useContext = jest.fn(() => ({state: {mode: 2}}));
        const wrapper = setup();
        const weeklyComponent = getByAttr(wrapper, 'weekly-component');
        expect(weeklyComponent.length).toBe(1);
    });
    test('switch to daily when context mode is 1', () => {
        React.useContext = jest.fn(() => ({state: {mode: 1}}));
        const wrapper = setup();
        const dailyComponent = getByAttr(wrapper, 'daily-component');
        expect(dailyComponent.length).toBe(1);
    });
    test('switch to no view when context mode is not (1,2,3)', () => {
        React.useContext = jest.fn(() => ({state: {mode: 4}}));
        const wrapper = setup();
        const dailyComponent = getByAttr(wrapper, 'noview-component');
        expect(dailyComponent.length).toBe(1);
    });
});