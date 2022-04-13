import React, { Children } from 'react';

import classNames from 'classnames';
import useSingleChoice from '../../hooks/single-choice';

import './style.less';

export default ({ activeTab, onTabChange, children, ...rest }) => {
    const [activeTabName, changeTab] = useSingleChoice(activeTab, onTabChange);
    const isActiveTab = (tabName) => activeTabName === tabName;
    const propertyMapper = (propName) => (child) => child.props[propName];
    const tabNames = Children.map(children, propertyMapper('tabname'));
    return (
        <div className='ui__multitab'>
            <MultitabHeader
                activeTabChecker={isActiveTab}
                onTabClick={changeTab}
                tabNames={tabNames}
            />
            <TabPane activeTabChecker={isActiveTab}>{children}</TabPane>
        </div>
    );
};

const TabPane = ({ activeTabChecker, children, ...rest }) => (
    <div className='ui__miltitab-tab-pane'>
        {Children.map(children, (child, i) => (
            <Tab active={activeTabChecker(child.props['tabName'])} key={i}>
                {child}
            </Tab>
        ))}
    </div>
);

const MultitabHeader = ({
                            activeTabChecker,
                            tabNames,
                            onTabClick,
                            ...rest
                        }) => (
    <div className='ui__multitab-header'>
        {tabNames.map((tn, i) => (
            <div
                className={classNames('ui__multitab-tab', {
                    'ui__multitab-tab--active': activeTabChecker(tn)
                })}
                onClick={() => onTabClick(tn)}
                key={i}
            >
                {tn}
            </div>
        ))}
    </div>
);

const Tab = ({ active, children, ...rest }) => (
    <div
        className={classNames('ui__multitab-tab-content', {
            'ui__multitab-tab-content--active': active
        })}
    >
        {children}
    </div>
);
