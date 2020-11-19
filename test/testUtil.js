import checkPropTypes from 'check-prop-types';

/**
 * @function getByAttr returns fined value in data-test
 * @param {shallowWrapper} wrapper - current wrapper who get from enzyme shallow wrapper
 * @param {String} name - name of data-test
 */
const getByAttr = (wrapper, name) => {
    return wrapper.find(`[data-test="${name}"]`);
}

const checkPropType = (component, customProp) => {
    const result = checkPropTypes(component.propTypes, customProp, 'prop', component.name);
    expect(result).toBe(undefined);
}

export {
    getByAttr,
    checkPropType
}