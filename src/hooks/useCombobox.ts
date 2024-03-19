import React from 'react';
import { useComboboxContext } from '../context/ComboboxContext';

const useCombobox = () => {
  const { highlightedIndex } = useComboboxContext();
};

export default useCombobox;
