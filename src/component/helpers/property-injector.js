import { Children, cloneElement } from 'react';
import classNames from 'classnames';

export default ({ children, className, ...props }) =>
    Children.map(children, (child) =>
        cloneElement(child, {
            ...props,
            className: classNames(child.props.className, className)
        })
    );
