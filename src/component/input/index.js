import React from 'react';

import './style.less';

const onTextInputValueChange = (name, onChange) => {
    return ({target}) => onChange(name, target.value);
};

const Input = ({value, onChange, name, type, ...rest}) => (
    <input type={type}
           onChange={onTextInputValueChange(name, onChange)}
           value={value}
           className={`ui__input ui__input--${type}`}
           {...rest}/>
);

export const TextInput = ({...props}) => <Input type='text' {...props}/>;

export const PasswordInput = ({value, onChange, ...rest}) => <Input type='password' {...rest}/>;

export const CheckInput = ({checked, ...rest}) => (
    <input type='checkbox'
           checked={checked}
           {...rest}/>
);

export const TextArea = ({value, onChange, name, ...rest}) => (
    <textarea value={value}
              className={`ui__input ui__input--textarea`}
              onChange={onTextInputValueChange(name, onChange)}
              {...rest}/>
);
