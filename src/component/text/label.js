import React from 'react';
import classNames from 'classnames';

export default ({children, className, ...rest}) => (
    <span className={classNames('ui__label', className)}
          {...rest}>
        {children}
    </span>
);