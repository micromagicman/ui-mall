import classNames        from 'classnames';
import React, { useRef } from 'react';

import './style.less';

export default ({onClick, label, disabled, children, className, ...rest}) => {
    const textReference = useRef(null);
    const classAttr = classNames(
        'ui__button',
        {'ui__button--disabled': disabled},
        className
    );

    return (
        <button
            className={classAttr}
            onClick={() => !disabled && onClick()}
            {...rest}>
            <span ref={textReference}>{label || children}</span>
        </button>
    );
};
