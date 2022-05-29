import classNames                 from 'classnames';
import { Children, cloneElement } from 'react';

export default ({children, className, ...props}) =>
    Children.map(children, (child) =>
        cloneElement(child, {
            ...props,
            className: classNames(child.props.className, className)
        })
    );
