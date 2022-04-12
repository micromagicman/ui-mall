import React from 'react';

import Arrow from '../graphics/arrow';
import Label from '../text/label';
import useExpandStyle from '../../hooks/expanded';
import useSingleChoice from '../../hooks/single-choice';

import './style.less';

const shiftSelectedItem = (values, searchId) => {
    let [selectedItem, others] = [null, []];
    for (let i = 0; i < values.length; i++) {
        if (searchId === values[i].id) {
            selectedItem = values[i];
        } else {
            others.push(values[i]);
        }
    }
    return [selectedItem, ...others];
};

export default ({values, activeId, onChange, selectiveComponent, className, ...rest}) => {
    const [selectedId, changeSelected] = useSingleChoice({activeId, onChange});
    const [{classAttr, isExpanded}, toggleExpand] = useExpandStyle({
        expanded: false,
        mainClassName: 'ui__select',
        className
    });
    const OptionComponent = selectiveComponent || DefaultOptionComponent;
    const [selectedItem, ...options] = shiftSelectedItem(values, selectedId);
    return (
        <div className={classAttr} {...rest} onClick={toggleExpand}>
            <div className='ui__select-head'>
                <Arrow color='#343434' direction={isExpanded ? 'up' : 'down'}/>
                <OptionComponent {...selectedItem}
                                 onClick={() => changeSelected(selectedItem.id)}/>
            </div>
            <div className='ui__select-options'>
                {options.map((v) =>
                    <div className='ui__select-option'
                         onClick={() => changeSelected(v.id)}
                         key={v.id}>
                        <OptionComponent {...v} />
                    </div>
                )}
            </div>
        </div>
    );
};

const DefaultOptionComponent = ({id, text}) => <Label data-id={id}>{text}</Label>;
