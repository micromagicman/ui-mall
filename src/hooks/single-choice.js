import { useState } from 'react';

export default function useSingleChoice(activeId, onChange) {
    const [active, changeActive] = useState(activeId);
    const change = (newActiveId) => {
        changeActive(newActiveId);
        'function' === typeof onChange && onChange(newActiveId);
    };
    return [active, change];
};
