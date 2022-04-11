import React from 'react';

export default ({children, ...rest}) => (
    <span className='ui__label'
          {...rest}>
        {children}
    </span>
);