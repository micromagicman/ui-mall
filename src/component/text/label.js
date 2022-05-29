import classNames from 'classnames';
import React      from 'react';

export default ({children, className, ...rest}) => (
    <span className={classNames('ui__label', className)}
          {...rest}>
        {children}
    </span>
);