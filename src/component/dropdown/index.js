import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import Label from '../text/label';
import PropertyInjector from '../helpers/property-injector';

import './style.less';
import useOutsideClick from '../../hooks/outside-click';

export default ({
    labelText,
    options = [],
    showOptionsWhenHover = false,
    closeWhenOptionClicked = false,
    onOptionClick = () => {},
    optionComponent,
    ...rest
}) => {
    const [optionsShown, setOptionsShown] = useState(false);
    const labelRef = useRef(null);
    const rootRef = useRef(null);

    const toggleOptions = () => setOptionsShown(!optionsShown);
    const hideOptions = () => setOptionsShown(false);
    const showOptions = () => setOptionsShown(true);
    const onOptionClickHandler = (option) => {
        onOptionClick(option);
        closeWhenOptionClicked && hideOptions();
    };

    useOutsideClick([rootRef, optionsShown], hideOptions);
    const OptionComponent = optionComponent || DefaultDropdownOption;

    const needToShowOptions = () => optionsShown && options.length;
    return (
        <div
            className='ui__dropdown'
            ref={rootRef}
            onMouseEnter={showOptionsWhenHover ? showOptions : null}
            onMouseLeave={showOptionsWhenHover ? hideOptions : null}
            {...rest}>
            <div
                onClick={toggleOptions}
                className='ui__dropdown__label'
                ref={labelRef}>
                <Label>{labelText}</Label>
                <FontAwesomeIcon className='ui__dropdown__icon' icon={faAngleDown} />
            </div>

            {needToShowOptions() && (
                <div
                    className='ui__dropdown__options'
                    style={calculateDropdownOptionsPosition(labelRef)}>
                    <PropertyInjector className='ui__dropdown__option'>
                        {options.map((o, index) => (
                            <OptionComponent
                                key={index}
                                onClick={() => onOptionClickHandler(o)}
                                {...o}/>
                        ))}
                    </PropertyInjector>
                </div>
            )}
        </div>
    );
};

const DefaultDropdownOption = ({ text, ...rest }) => (
    <div className='ui__dropdown__option--default' {...rest}>
        <Label>{text}</Label>
    </div>
);

const calculateDropdownOptionsPosition = ({ current }) => {
    const { top, height, left } = current.getBoundingClientRect();
    return {
        top: `calc(${top}px + ${height}px + 0.5rem)`,
        left: `${left}px`
    };
};
