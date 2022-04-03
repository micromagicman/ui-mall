import React from 'react';
import classNames from 'classnames';

import './style.less';

export const BUTTON_TYPES = ['normal', 'warning', 'error', 'success'];

const handleType = (type) => ~BUTTON_TYPES.indexOf(type) ? type : 'normal';

export default ({onClick, text, disabled, children, type, ...rest}) => {
    const className = classNames(
        'ui__button',
        `ui__button--${handleType(type)}`,
        {'ui__button--disabled': disabled},
    );
    return (
        <button
            className={className}
            onClick={() => !disabled && onClick()}
            {...rest}>
            {text || children}
        </button>
    );
};
