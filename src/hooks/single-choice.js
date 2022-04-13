import {useState} from 'react';

export default function ({activeId, onChange}) {
    const [active, changeActive] = useState(activeId);
    const change = (newActiveId) => {
        changeActive(newActiveId);
        'function' === typeof onChange && onChange(newActiveId);
    };
    return [active, change];
};
