import { useState } from 'react';
import classNames from 'classnames';

export default function useExpanded({ expanded, mainClassName, className }) {
    const [isExpanded, toggleExpand] = useState(!!expanded);
    const classAttr = classNames(
        mainClassName,
        { [`${mainClassName}--expanded`]: isExpanded },
        className
    );
    const toggle = () => toggleExpand(!isExpanded);
    return [{ classAttr, isExpanded }, toggle];
};
