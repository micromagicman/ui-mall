import { faAngleDown }                                   from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }                               from '@fortawesome/react-fontawesome';
import React, { useRef }                                 from 'react';
import { useExpanded, useSingleChoice, useOutsideClick } from '../../hooks';
import { pass }                                          from '../../util/function';

import Label from '../text/label';

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

export default ({
                    options,
                    activeId,
                    onChange = pass,
                    optionComponent: OptionComponent,
                    className,
                    ...rest
                }) => {
    const rootRef = useRef(null);
    const [selectedId, changeSelected] = useSingleChoice(activeId, onChange);
    const [{classAttr, isExpanded}, toggleExpand] = useExpanded({
        expanded: false,
        mainClassName: 'ui__select',
        className
    });
    const [selectedItem, ...selectOptions] = shiftSelectedItem(options, selectedId);
    OptionComponent = OptionComponent || DefaultOptionComponent;
    useOutsideClick([rootRef, isExpanded], () => isExpanded && toggleExpand());
    return (
        <div className={classAttr} onClick={toggleExpand}
             ref={rootRef} {...rest}>
            <div className="ui__select__head">
                <div className="ui__select__selected-option">
                    <SelectedOption
                        value={selectedItem}
                        onClick={() => changeSelected(selectedItem.id)}
                        optionComponent={OptionComponent}/>
                </div>
                <FontAwesomeIcon className="ui__select__arrow"
                                 icon={faAngleDown}/>
            </div>
            <div className="ui__select__options">
                {selectOptions.map((v) => (
                    <div
                        className="ui__select__option"
                        onClick={() => changeSelected(v.id)}
                        key={v.id}>
                        <OptionComponent {...v} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const SelectedOption = ({
                            value,
                            onClick,
                            optionComponent: OptionComponent
                        }) => (
    <OptionComponent {...value} onClick={onClick}/>
);

const DefaultOptionComponent = ({id, text}) => (
    <Label data-id={id}>{text}</Label>
);
