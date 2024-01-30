import React from 'react';

import StyledOption from './Styled/StyledOption';

import { useComboboxContext } from '../context/ComboboxContext';
import useCombobox from '../hooks/useCombobox';
import { OptionProps } from '../types';

const Option: React.ForwardRefExoticComponent<OptionProps> = React.forwardRef<
  HTMLLIElement,
  OptionProps
>(function Option({ children, value, isDisabled = false, index, id }, ref) {
  // console.log("id in Option ", id);
  const { activeElemIndex } = useCombobox();
  // const { isCompact, activeValue, onSelect } = useComboboxContext();
  // const isActive = value && value === activeValue;
  console.log('Option rendering, activeElemIndex ', activeElemIndex);
  React.useEffect(() => {
    console.log('updated activeElemIndex ', activeElemIndex);
  }, [activeElemIndex]);

  // const isSelected = Array.isArray(selectedValue)
  //   ? selectedValue.includes(value)
  //   : selectedValue === value;
  // console.log('option value ', value, index, activeElemIndex);
  // console.log("isSelected ", isSelected);
  return (
    <StyledOption
      ref={ref}
      $isActive={activeElemIndex === index}
      $isCompact={false}
      onClick={() => value}
      disabled={isDisabled}
      id={id}
    >
      {children}
    </StyledOption>
  );
});
Option.displayName = 'Option';

export default Option;
