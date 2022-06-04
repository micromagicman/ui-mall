import {faCheck}         from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classNames        from 'classnames';

import React, {createContext, useContext, useState, useCallback} from 'react';
import {pass}                                                    from '../../util/function';
import Label                                                     from '../text/label';

import './style.less';

const RadioGroupContext = createContext(null);

function RadioGroup({activeValue, disabled, onChange, children, ...rest}) {
  const [active, setActive] = useState(activeValue);
  const contextValue = {active, setActive, onChange, disabled};
  return (
      <div className="ui__radio__group"
           {...rest}>
        <RadioGroupContext.Provider value={contextValue}>
          {children}
        </RadioGroupContext.Provider>
      </div>
  );
}

function RadioButton({value, label, children, ...rest}) {
  const {active, setActive, onChange, disabled} = useContext(RadioGroupContext);
  const onClickHandler = useCallback(
      () => {
        if (!disabled) {
          setActive(value);
          onChange(value);
        }
      },
      [value, disabled],
  );
  const checked = active === value;
  const className = classNames(
      'ui__radio__button',
      {
        'ui__radio__button--checked': checked,
        'ui__radio__button--disabled': disabled,
      },
  );
  return (
      <div className={className}
           onClick={onClickHandler}
           {...rest}>
        <span className="ui__radio__check">
          {checked && <FontAwesomeIcon icon={faCheck} />}
        </span>
        <Label>{label || children}</Label>
      </div>
  );
}

RadioGroup.defaultProps = {
  activeId: 1,
  onChange: pass,
};

RadioButton.defaultProps = {
  label: '',
  value: null,
  disabled: false,
};

export {
  RadioGroup,
  RadioButton,
};