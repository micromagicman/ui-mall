import React from 'react';
import classNames from 'classnames';

import Label from '../text/label';
import Button from '../button';
import {FilteredLoadable} from '../loadable';

import './style.less';

export default ({
                    disabled, onSubmit, onDelete, loading, children,
                    saveText = 'Сохранить', deleteText = 'Удалить',
                    className, ...rest
                }) => (
    <FilteredLoadable loading={loading}>
        <div className={classNames('ui__form', className)} {...rest}>
            {children}
            <div className='ui__form-controls'>
                <Button disabled={disabled}
                        onClick={onSubmit}>
                    {saveText}
                </Button>
                {onDelete && (
                    <Button onClick={onDelete}>
                        {deleteText}
                    </Button>
                )}
            </div>
        </div>
    </FilteredLoadable>
);

export const FormLine = ({caption, children, className, ...rest}) => (
    <div className={classNames('ui__form-line', className)}>
        <div className='ui__form-line-level'>
            <Label>{caption}</Label>
        </div>
        <div className='ui__form-line-level'>
            {children}
        </div>
    </div>
);