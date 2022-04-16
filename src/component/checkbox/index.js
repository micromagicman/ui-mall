import React, {useState} from 'react';
import classNames from 'classnames';

import {CheckInput} from '../input';
import Check from '../graphics/check';
import Label from '../text/label';

import './style.less';

export default ({label, children, checked, disabled, onChange, ...rest}) => {
    const [checkedState, onCheckToggle] = useState(!!checked);

    const onChangeHandler = () => {
        onCheckToggle(!checkedState);
        ('function' === typeof onChange) && onChange(!checkedState);
    };

    const className = classNames(
        'ui__checkbox',
        {
            'ui__checkbox--disabled': disabled,
            'ui__checkbox--checked': checkedState
        }
    );

    return (
        <div className={className}
             onClick={() => !disabled && onChangeHandler()}
             {...rest}>
            <CheckInput checked={checkedState} disabled={disabled}/>
            <Label>{label || children}</Label>
            {checkedState && <Check/>}
        </div>
    );
};
