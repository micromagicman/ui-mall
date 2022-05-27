import React from 'react';

import Arrow from '../graphics/arrow';
import Label from '../text/label';
import useExpanded from '../../hooks/expanded';

import './style.less';

export default ({title, children, expanded, className, ...rest}) => {
    const [{classAttr, isExpanded}, toggleExpand] = useExpanded({
        expanded,
        mainClassName: 'ui__accordion',
        className
    });
    return (
        <details open={expanded}
                 className={classAttr}
                 {...rest}>
            <summary className='ui__accordion__header' onClick={toggleExpand}>
                <Arrow direction={isExpanded ? 'down' : 'right'} color='white'/>
                {title && <Label>{title}</Label>}
            </summary>
            <div className='ui__accordion__content'>{children}</div>
        </details>
    );
};
