import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './app';
import { getByAttr } from '../../test/testUtil';
import hookAction from '../components/actions';

const mockEffectCall = jest.fn();

const setup = () => {
    mockEffectCall.mockClear();
    hookAction.effectCall = mockEffectCall;

    const mockUseReducer = jest.fn().mockReturnValue([
        { },
        jest.fn()
    ]);
    React.useReducer = mockUseReducer;
    return mount(<App  />);
}

describe('App Component :', () => {
    test('render App', () => {
        let wrapper = setup();
        const appComponent = getByAttr(wrapper, 'app-component');
        expect(appComponent.exists()).toBe(true);
    });
});

describe('state control of useEffect', () => {
    test('call effectCall on useEffect', () => { 
        setup();
        expect(mockEffectCall).toHaveBeenCalled();
    });
    test('effectCall should not called again in app update', () => {
        const wrapper = setup();
        mockEffectCall.mockClear();
        wrapper.update(); // it change , because update is called in enzyme current version ( previously was not call )
        expect(mockEffectCall).not.toHaveBeenCalled();
    });
});