import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';

import {TextInput} from '../input';
import Label from './label';
import Button from '../button';
import useEditableMode from '../../hooks/editable-mode';

import './style.less';

export default ({children, onSave, ...rest}) => {
    const [
        {text, editMode},
        {save, cancel, changeText, toggleEditMode}
    ] = useEditableMode({editableText: children, onSave});

    if (!editMode) {
        return (
            <Label
                className='ui__editable__label'
                onClick={() => toggleEditMode(true)}
                {...rest}>
                {text}
            </Label>
        );
    }

    return (
        <div className='ui__editable__input' {...rest}>
            <TextInput
                autoFocus
                value={text}
                onChange={(_, newText) => changeText(newText)}/>
            <div className='ui__editable__controls'>
                <Button onClick={save}>
                    <FontAwesomeIcon icon={faCheck}/>
                </Button>
                <Button onClick={cancel}>
                    <FontAwesomeIcon icon={faXmark}/>
                </Button>
            </div>
        </div>
    );
};