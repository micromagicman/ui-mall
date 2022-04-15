import {useEffect} from 'react';

export default function ([elementRef, isExpanded], outsideClickHandler) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                outsideClickHandler();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [elementRef, isExpanded]);
};