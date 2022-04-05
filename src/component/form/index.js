import React from 'react';
import Label from '../text/label';
import Button from '../button';
import {FilteredLoadable} from '../loadable';

export default ({
                    disabled, onSubmit, onDelete, loading, children,
                    saveText = 'Сохранить', deleteText = 'Удалить',
                    ...rest
                }) => (
    <FilteredLoadable loading={loading}>
        <div className='ui__form' {...rest}>
            {children}
            <Button disabled={disabled}
                    onClick={onSubmit}>
                {saveText}
            </Button>
            {
                onDelete
                    ? (
                        <Button onClick={onDelete}>
                            {deleteText}
                        </Button>
                    )
                    : null
            }
        </div>
    </FilteredLoadable>
);

export const FormLine = ({caption, children}) => (
    <div className='ui__form__line'>
        <Label>{caption}</Label>
        {children}
    </div>
);