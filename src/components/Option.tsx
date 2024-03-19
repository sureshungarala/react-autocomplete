import React from 'react';
import mergeRefs from 'merge-refs';
import StyledOption from './Styled/StyledOption';

import { useComboboxContext } from '../context/ComboboxContext';
import { OptionProps } from '../types';
import { useMenuContext } from '../context/MenuContext';

const Option: React.ForwardRefExoticComponent<OptionProps> = React.forwardRef<
  HTMLLIElement,
  OptionProps
>(function Option({ children, value, isDisabled = false, id }, ref) {
  const currentOptionRef = React.useRef<HTMLLIElement>(null);
  const { isCompact, onSelect, highlightedIndex } = useComboboxContext();
  const { itemIndexRef } = useMenuContext();

  const onClick = React.useCallback(() => {
    value && onSelect && onSelect(value);
  }, [onSelect, value]);

  const isActive = itemIndexRef.current === highlightedIndex;
  if (isActive) {
    currentOptionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
  // console.log(highlightedIndex, itemIndexRef.current);
  if (!isDisabled) itemIndexRef.current++;
  // const isSelected = Array.isArray(selectedValue)
  //   ? selectedValue.includes(value)
  //   : selectedValue === value;
  return (
    <StyledOption
      ref={mergeRefs(ref, currentOptionRef)}
      $isActive={isActive}
      $isCompact={isCompact}
      onClick={onClick}
      disabled={isDisabled}
      id={id}
      aria-disabled={isDisabled}
    >
      {children}
    </StyledOption>
  );
});
Option.displayName = 'Option';

export default Option;
