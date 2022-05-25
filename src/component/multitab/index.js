import React, {Children} from 'react';

import classNames from 'classnames';
import useSingleChoice from '../../hooks/single-choice';

import './style.less';

export default ({activeTab, onTabChange, children, ...rest}) => {
    const [activeTabName, changeTab] = useSingleChoice(activeTab, onTabChange);
    const isActiveTab = (tabName) => activeTabName === tabName;
    const propertyMapper = (propName) => (child) => child.props[propName];
    const tabNames = Children.map(children, propertyMapper('tabname'));
    return (
        <div className='ui__multitab' {...rest}>
            <MultitabHeader
                activeTabChecker={isActiveTab}
                onTabClick={changeTab}
                tabNames={tabNames}/>
            <TabPane activeTabChecker={isActiveTab}>{children}</TabPane>
        </div>
    );
};

const TabPane = ({activeTabChecker, children, ...rest}) => (
    <div className='ui__miltitab__tab__pane' {...rest}>
        {Children.map(children, (child, i) => (
            <Tab active={activeTabChecker(child.props['tabName'])} key={i}>
                {child}
            </Tab>
        ))}
    </div>
);

const MultitabHeader = ({activeTabChecker, tabNames, onTabClick, ...rest}) => (
    <div className='ui__multitab__header'>
        {tabNames.map((tn, i) => (
            <div
                className={
                    classNames(
                        'ui__multitab__tab',
                        {'ui__multitab__tab--active': activeTabChecker(tn)}
                    )
                }
                onClick={() => onTabClick(tn)}
                key={i}
                {...rest}>
                {tn}
            </div>
        ))}
    </div>
);

const Tab = ({active, children, ...rest}) => (
    <div
        className={
            classNames(
                'ui__multitab__tab__content',
                {'ui__multitab__tab__content--active': active}
            )
        }
        {...rest}>
        {children}
    </div>
);
