import React from 'react';

import useSingleChoice from '../../hooks/single-choice';
import {RadioInput} from '../input';
import Label from '../text/label';

import './style.less';

export default ({values, activeId, onChange, ...rest}) => {
    const [active, changeActive] = useSingleChoice({activeId, onChange});
    console.log(active, values);
    return (
        <div className='ui__radio-group' {...rest}>
            {values.map((v) =>
                <RadioButton
                    {...v}
                    key={v.id}
                    active={v.id === active}
                    onClick={changeActive}/>
            )}
        </div>
    );
};

const RadioButton = ({text, id, active, onClick, ...rest}) => (
    <div className='ui__radio-button'
         onClick={() => onClick(id)}
         {...rest}>
        <RadioInput className='ui__input--radio'
                    readOnly
                    checked={active}/>
        <Label>{text}</Label>
    </div>
);
