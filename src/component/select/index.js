import {faAngleDown}                from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon}            from '@fortawesome/react-fontawesome';
import React, {
  createContext,
  useCallback,
  useRef,
  Children,
  useContext,
  useState,
}                                   from 'react';
import {
  useExpanded,
  useOutsideClick,
}                                   from '../../hooks';
import {pass}                       from '../../util/function';
import {validateComponentChildType} from '../../util/react';

import Label from '../text/label';

import './style.less';

const SelectContext = createContext(null);

function Select({
  selectedValue,
  disabled,
  onChange,
  children,
  ...rest
}) {
  const rootRef = useRef(null);
  const [selected, select] = useState(selectedValue);
  const [{classAttr, isExpanded}, toggleExpand] = useExpanded(false, 'ui__select');

  const shiftSelectedItem = useCallback(
      () =>
          Children.toArray(children).reduce(
              (acc, child) => {
                validateComponentChildType(Select, child, SelectOption);
                if (selected === child.props.value) {
                  acc.head = child;
                } else {
                  acc.options.push(child);
                }
                return acc;
              },
              {head: null, options: []},
          ),
      [selected],
  );

  useOutsideClick(
      [rootRef, isExpanded],
      () => isExpanded && toggleExpand(),
  );

  const {head, options} = shiftSelectedItem();

  return (
      <div className={classAttr}
           onClick={toggleExpand}
           ref={rootRef}
           {...rest}>
        <div className="ui__select__head">
          <div className="ui__select__selected-option">
            {head.props.label || head.props.children}
          </div>
          <FontAwesomeIcon className="ui__select__arrow"
                           icon={faAngleDown}/>
        </div>
        <div className="ui__select__options">
          <SelectContext.Provider value={{select, onChange}}>
            {options}
          </SelectContext.Provider>
        </div>
      </div>
  );
}

function SelectOption({
  value,
  label,
  optionComponent: OptionComponent,
  children,
  ...rest
}) {
  OptionComponent = OptionComponent || DefaultOptionComponent;
  const {select, onChange} = useContext(SelectContext);

  const onClickHandler = useCallback(
      () => {
        select(value);
        onChange(value);
      },
      [value],
  );

  return (
      <div className="ui__select__option"
           onClick={onClickHandler}>
        <OptionComponent {...rest}>{label || children}</OptionComponent>
      </div>
  );
}

function DefaultOptionComponent({value, children, ...rest}) {
  return <Label{...rest}>{children}</Label>;
}

Select.defaultProps = {
  selectedValue: 1,
  onChange: pass,
};

export {
  Select,
  SelectOption,
};