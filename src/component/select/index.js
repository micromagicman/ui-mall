import React, {useRef} from 'react';

import Arrow from '../graphics/arrow';
import Label from '../text/label';
import useExpanded from '../../hooks/expanded';
import useSingleChoice from '../../hooks/single-choice';
import useOutsideClick from '../../hooks/outside-click';

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

export default ({values, activeId, onChange, optionComponent, className, ...rest}) => {
    const rootRef = useRef(null);
    const [selectedId, changeSelected] = useSingleChoice(activeId, onChange);
    const [{classAttr, isExpanded}, toggleExpand] = useExpanded({expanded: false, mainClassName: 'ui__select', className});
    const OptionComponent = optionComponent || DefaultOptionComponent;
    const [selectedItem, ...options] = shiftSelectedItem(values, selectedId);
    useOutsideClick([rootRef, isExpanded], () => isExpanded && toggleExpand());
    return (
        <div className={classAttr}
             onClick={toggleExpand}
             ref={rootRef}
             {...rest}>
            <div className='ui__select__head'>
                <Arrow color='#343434' direction={isExpanded ? 'up' : 'down'}/>
                <OptionComponent {...selectedItem}
                                 onClick={() => changeSelected(selectedItem.id)}/>
            </div>
            <div className='ui__select__options'>
                {options.map((v) =>
                    <div className='ui__select__option'
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
