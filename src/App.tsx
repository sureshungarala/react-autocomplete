import { useCallback, useRef, useState } from 'react';
import Autocomplete from './components/Autocomplete';
import Option from './components/Option';

import { debounceType } from './utils/helpers';

import { debounce } from './utils/helpers';
import mockOptions from './utils/constants';
import './styles.css';
import { OptionValue, onChangeType } from './types';

export default function App() {
  const [options, setOptions] = useState<string[]>(mockOptions);
  const [filtering, isFiltering] = useState<boolean>(false);

  const debouncedFunc = useRef<debounceType>(
    debounce((searchVal: string) => {
      if (!searchVal) {
        debouncedFunc.current.cancel();
        setOptions(mockOptions);
      } else {
        const filteredOptions = mockOptions.filter(
          (option) => option.toLowerCase().indexOf(searchVal.toLowerCase()) > -1
        );
        setOptions(filteredOptions);
      }
      isFiltering(false);
    }, 300)
  );

  const filterOptions: onChangeType = useCallback((inputVal: OptionValue) => {
    isFiltering(true);
    debouncedFunc.current(inputVal);
  }, []);
  // filterOptions.cancel = debouncedFunc.current.cancel;

  const renderMenuOptions = useCallback(() => {
    if (filtering) {
      return <Option isDisabled>Filtering...</Option>;
    } else if (options.length > 0) {
      return options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ));
    } else {
      return <Option isDisabled>No matching options.</Option>;
    }
  }, [filtering, options]);

  const onValueChange = (selectedValue: OptionValue | OptionValue[] | null) => {
    console.info('selectedValue ', selectedValue);
  };

  return (
    <div className='App'>
      <Autocomplete
        onInputValChange={filterOptions}
        isMultiselectable
        onChange={onValueChange}
        initialSelectedValue={[mockOptions[0], mockOptions[2], mockOptions[5]]}
      >
        {renderMenuOptions()}
      </Autocomplete>
    </div>
  );
}
