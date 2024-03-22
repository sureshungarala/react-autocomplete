import * as React from 'react';
import { OptionValue, onChangeType } from '../types';

const ComboboxContext = React.createContext<
  | {
      isCompact: boolean;
      selectedValue: OptionValue | OptionValue[] | null;
      onSelect?: onChangeType;
      itemIndexRef: React.MutableRefObject<number>;
      highlightedIndex: number;
    }
  | undefined
>(undefined);

const useComboboxContext = () => {
  const comboboxContext = React.useContext(ComboboxContext);
  if (!comboboxContext) {
    throw new Error(
      'Error: this component must be rendered within <Combobox />'
    );
  }
  return comboboxContext;
};

export { ComboboxContext, useComboboxContext };
