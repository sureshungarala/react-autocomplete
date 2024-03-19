import React from 'react';
import {
  ComboboxReducerAction,
  ComboboxStateType,
} from '../reducers/ComboboxReducer';

const useElementIds = () => {
  const id = `ac-${React.useId()}`;
  const elementIdsRef = React.useRef({
    labelId: `${id}-label`,
    inputId: `${id}-input`,
    menuId: `${id}-menu`,
    getItemId: (index: number) => `${id}-item-${index}`,
  });
  return elementIdsRef.current;
};

const useCombobox = (
  prevState: ComboboxStateType,
  dispatch: React.Dispatch<ComboboxReducerAction>
) => {
  console.log('prevState:', prevState, dispatch);
};

export { useElementIds, useCombobox };
