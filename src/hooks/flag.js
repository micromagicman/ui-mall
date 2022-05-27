import { useState } from "react";

export default function useFlag(initialValue = false) {
    const [flag, changeFlag] = useState(!!initialValue);
    const getFlag = () => flag;
    const enable = () => changeFlag(true);
    const disable = () => changeFlag(false);
    const toggle = () => changeFlag(!flag);
    return [getFlag, enable, disable, toggle];
}
