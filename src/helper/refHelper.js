import React from 'react';
import { Box } from '@material-ui/core';

let Global = {
    ref: [],
    state: [],
    index: -1,
}

const handleClickOutside = (ev) => {
    if (Global.ref[Global.index] && Global.ref[Global.index].current){
        let current = Global.ref[Global.index].current;
        let name = current.getAttribute('index');
        if(name && !ev.target.closest('[index="'+Global.index+'"]')){
            Global.state[Global.index][1](false);
        } else {
            Global.state.map((r, i) => {
                if(i !== Global.index){
                    r[1](false);
                }
            });
        }
    }
}

const handleClickBox = (index) => {
    Global.state.map(ref => { ref[0] = false });
    Global.index = index;
    Global.state[index][1](true);
}

const createObjectFromProps = (props, extendedBypassProps) => {
    let display = 'flex',
        newProps = {},
        bypassProps = ['children', 'name', 'display', 'defaultDisplay', 'ref'];
    if(extendedBypassProps && extendedBypassProps.length){
        bypassProps = [...bypassProps, ...extendedBypassProps];
    }
    Object.keys(props).map(prop => {
        if(bypassProps.indexOf(prop) < 0){
            newProps[prop] = props[prop];
        }
        if(prop == 'defaultDisplay'){
            display = props[prop];
        }
    });
    return {newProps, display};
}

const initRef = ({useState, useRef, useEffect, document, index}) => {
    if(index == 0){
        useEffect(() => {
            document.addEventListener("click", handleClickOutside, false);
            return () => {
                document.removeEventListener("click", handleClickOutside, false);
            };
        }, []);
    }
    Global.ref[index] = useRef(null);
    Global.state[index] = useState(false);

    const RefBox = (props) => {
        let { newProps, display } = createObjectFromProps(props);
        return (
            <Box
                {...newProps}
                ref={Global.ref[index]}
                index={index}
                display={Global.state[index][0] ? display : 'none'}
            >
                {props.children}
            </Box>
        )
    }
    
    const OrigBox = (props) => {
        let { newProps } = createObjectFromProps(props, ['onClick']);
        return (
            <Box
                {...newProps}
                index={index}
                onClick={() => handleClickBox(index)}
            >
                {props.children}
            </Box>
        )
    }

    return [ RefBox, OrigBox, Global.state[index][1] ];
}

export default initRef;