import React from 'react';

import defaultLoadingIcon from '../../img/loaders/puff.svg';

import './style.less';

const Spinner = ({loader, ...rest}) => (
    <img src={loader ? loader : defaultLoadingIcon}
         alt="loading" {...rest}/>
);

/**
 * @param LoadingComponent - uppercase требует REACT!
 */
const ComponentLoadable = ({
                               loading,
                               LoadingComponent = Spinner,
                               children,
                               ...rest
                           }) => (
    loading ? <LoadingComponent {...rest}/> : children
);

const FilteredLoadable = ({loading, children, ...rest}) => (
    <div className="ui__loader__filter" {...rest}>
        {loading && <div className="ui__loader__filter__layer">
            <Spinner/>
        </div>}
        {children}
    </div>
);

export {
    Spinner,
    ComponentLoadable,
    FilteredLoadable
};