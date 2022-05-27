import {useEffect} from "react";

export default function useKeyboardEvent(targetKey, callback) {
    useEffect(() => {
        const handler = ({key}) => {
            if (targetKey === key) {
                callback();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);
}
