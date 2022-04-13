import React from 'react';

import './style.less';

export default ({direction, color, ...rest}) => (
    <svg className={`ui__arrow ui__arrow--${direction}`}
         fill={color}
         {...rest}
         viewBox='0 0 5 9'>
        <path d='M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z'/>
    </svg>
);
