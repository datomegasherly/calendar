import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './app';
import { getByAttr } from '../../test/testUtil';
import hookAction from '../components/actions';

const mockEffectCall = jest.fn();

const setupShallow = () => {
    return shallow(<App  />);
}

const setup = () => {
    mockEffectCall.mockClear();
    hookAction.effectCall = mockEffectCall;
    return mount(<App  />);
}

describe('App Component :', () => {
    test('render App', () => {
        let wrapper = setupShallow();
        let AppComponent = getByAttr(wrapper, 'app-component');
        expect(AppComponent.length).toBe(1);
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