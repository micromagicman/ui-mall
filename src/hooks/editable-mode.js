import { useState } from 'react';
import { pass }     from '../util/function';

export default function useEditableMode({editableText, onSave = pass}) {
    const [text, changeText] = useState(editableText);
    const [history, setHistory] = useState([editableText]);
    const [editMode, toggleEditMode] = useState(false);

    const save = () => {
        toggleEditMode(false);
        onSave(text);
        setHistory([...history, text]);
    };

    const cancel = () => {
        toggleEditMode(false);
        changeText(lastSavedText());
    };

    const lastSavedText = () => history[history.length - 1];

    return [
        {text, editMode},
        {save, cancel, changeText, toggleEditMode}
    ];
};