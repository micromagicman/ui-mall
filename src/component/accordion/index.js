import React from 'react';

import Arrow from '../graphics/arrow';
import Label from '../text/label';
import useExpandStyle from '../../hooks/expanded';

import './style.less';

export default ({title, children, expanded, className, ...rest}) => {
    const [{classAttr, isExpanded}, toggleExpand] = useExpandStyle({
        expanded,
        mainClassName: 'ui__accordion',
        className
    });
    return (
        <div className={classAttr} {...rest}>
            <div className='ui__accordion-header' onClick={toggleExpand}>
                <Arrow direction={isExpanded ? 'down' : 'right'} color='white'/>
                {title && <Label>{title}</Label>}
            </div>
            <div className='ui__accordion-content'>{children}</div>
        </div>
    );
};
