import React from 'react';

import {TextInput} from '../input';
import Button from '../button';
import useEditableMode from '../../hooks/editable-mode';

import './style.less';

export default ({children, onSave, ...rest}) => {
    const [
        {text, editMode},
        {save, cancel, changeText, toggleEditMode}
    ] = useEditableMode({editableText: children, onSave});

    if (editMode) {
        return (
            <div className='ui__editable-input' {...rest}>
                <TextInput autoFocus
                           value={text}
                           onBlur={save}
                           onChange={changeText}/>
                <div className='ui__editable-controls'>
                    <Button onClick={save}>OK</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </div>
            </div>
        );
    }

    return (
        <span className='ui__editable-label'
              onClick={() => toggleEditMode(true)}
              {...rest}>
          {children}
        </span>
    );
};
