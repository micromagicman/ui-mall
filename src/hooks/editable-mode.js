import {useState} from 'react';

export default function ({editableText, onSave}) {
    const [text, changeText] = useState(editableText);
    const [editMode, toggleEditMode] = useState(false);

    const save = () => {
        toggleEditMode(false);
        'function' === typeof onSave && onSave(editableText);
    };

    const cancel = () => {
        toggleEditMode(false);
        changeText(editableText);
    };

    return [
        {text, editMode},
        {save, cancel, changeText, toggleEditMode}
    ];
};
