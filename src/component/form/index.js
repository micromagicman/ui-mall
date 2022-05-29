import classNames           from 'classnames';
import React                from 'react';
import { pass }             from '../../util/function';
import Button               from '../button';
import { FilteredLoadable } from '../loadable';

import Label from '../text/label';

import './style.less';

export default ({
                    disabled,
                    onSubmit = pass,
                    onDelete = null,
                    loading,
                    children,
                    saveText = 'Сохранить',
                    deleteText = 'Удалить',
                    className,
                    ...rest
                }) => (
    <FilteredLoadable loading={loading}>
        <div className={classNames('ui__form', className)} {...rest}>
            {children}
            <div className="ui__form__controls">
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
    <div className={classNames('ui__form__line', className)}>
        <div className="ui__form__line__level">
            <Label>{caption}</Label>
        </div>
        <div className="ui__form__line__level">
            {children}
        </div>
    </div>
);