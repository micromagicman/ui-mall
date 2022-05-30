import { faAngleRight }    from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React               from 'react';
import useExpanded         from '../../hooks/expanded';
import Label               from '../text/label';

import './style.less';

export default ({label, children, expanded, className, ...rest}) => {
    const [{classAttr, isExpanded}, toggleExpand] = useExpanded({
        expanded,
        mainClassName: 'ui__accordion',
        className
    });
    return (
        <details open={expanded}
                 className={classAttr}
                 {...rest}>
            <summary className="ui__accordion__header" onClick={toggleExpand}>
                <FontAwesomeIcon icon={faAngleRight} />
                {label && <Label>{label}</Label>}
            </summary>
            <div className="ui__accordion__content">{children}</div>
        </details>
    );
};
