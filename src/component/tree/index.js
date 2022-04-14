import classNames from 'classnames';
import React from 'react';
import useExpanded from '../../hooks/expanded';

import './style.less';

export default ({nodes = [], nodeComponent = DefaultNodeComponent}) => (
    <div className='ui__tree'>
        {nodes.map((n, i) => (
            <TreeNode nodeComponent={nodeComponent} key={i} {...n} />
        ))}
    </div>
);

const TreeNode = ({data, children, expanded, nodeComponent: NodeComponent}) => {
    const [{classAttr, isExpanded}, toggleExpand] = useExpanded({
        expanded,
        mainClassName: 'ui__tree-node'
    });

    const onNodeClick = (event) => {
        event.stopPropagation();
        toggleExpand();
    };

    const nodeComponentClassAttr = classNames(
        'ui__tree-node-component',
        {'ui__tree-node-component--expand': isExpanded}
    );

    return (
        <div className={classAttr} onClick={onNodeClick}>
            <NodeComponent
                className={nodeComponentClassAttr}
                expanded={isExpanded}
                {...data}/>
            {isExpanded && (
                <div className='ui__tree-subnodes'>
                    {children && children.map((n, i) => (
                        <TreeNode nodeComponent={NodeComponent} key={i} {...n} />
                    ))}
                </div>
            )}
        </div>
    );
};

const DefaultNodeComponent = ({className, text, expanded, ...rest}) => (
    <span className={className} {...rest}>
        {text}
    </span>
);
