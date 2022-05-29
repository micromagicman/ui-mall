import React from 'react';

import { emptyIfAbsent } from '../../util/string';

import './style.less';

const onTextInputValueChange = (name, onChange) => {
    return ({target}) => onChange(name, target.value);
};

const Input = ({value, onChange, name, type, ...rest}) => (
    <input type={type}
           onChange={onTextInputValueChange(name, onChange)}
           value={emptyIfAbsent(value)}
           className={`ui__input ui__input--${type}`}
           {...rest}/>
);

const TextInput = ({...props}) => <Input type="text" {...props}/>;

const PasswordInput = ({value, onChange, ...rest}) => <Input
    type="password" {...rest}/>;

const CheckInput = ({checked, ...rest}) => (
    <input type="checkbox"
           checked={checked}
           readOnly={true}
           {...rest}/>
);

const RadioInput = ({checked, ...rest}) => (
    <Input type="radio"
           checked={checked}
           {...rest}/>
);

const TextArea = ({value, onChange, name, ...rest}) => (
    <textarea value={value}
              className={`ui__input ui__input--textarea`}
              onChange={onTextInputValueChange(name, onChange)}
              {...rest}/>
);

export { TextInput, PasswordInput, CheckInput, RadioInput, TextArea };
