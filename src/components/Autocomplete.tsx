/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Menu from './Menu';
import { ComboboxContext } from '../context/ComboboxContext';
import { AutocompleteProps, OptionValue } from '../types';

import useCombobox from '../hooks/useCombobox';
import { useElementIds } from '../hooks/utils';

const Autocomplete: React.FunctionComponent<AutocompleteProps> = ({
  children = <></>,
  isCompact = false,
  isMultiselectable = false,
  // isDisabled = false,
  onChange,
  selectedValue = null,
}): React.ReactElement => {
  const elementIds = useElementIds();
  const { keyDownHandler } = useCombobox();
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [inputVal, setInputVal] = React.useState<string>('');
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const [selectedOption, setSelectedOption] = React.useState<
    OptionValue | OptionValue[] | null
  >(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    onChange?.(inputVal);
    return () => {
      onChange?.cancel?.();
    };
  }, [onChange, inputVal]);

  React.useEffect(() => {
    const documentClickHandler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !event.composedPath()?.includes(dropdownRef.current)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keyup', keyUpHandler as any);

    return () => {
      document.removeEventListener('click', documentClickHandler);
      document.removeEventListener('keyup', keyUpHandler as any);
    };
  });

  const focusInput = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const selectOption = React.useCallback(
    (optionVal: OptionValue) => {
      if (isMultiselectable) {
        setSelectedOption((oldOptions: OptionValue[]) => {
          const options = [...oldOptions];
          const optionIndex = options.indexOf(optionVal);
          if (optionIndex > -1) {
            options.splice(optionIndex, 1);
          } else {
            options.push(optionVal);
          }
          return options;
        });
      } else {
        setSelectedOption(optionVal);
        setShowMenu(false);
      }
    },
    [isMultiselectable]
  );

  const onInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const onInputBlur = React.useCallback(() => {
    setIsFocused(false);
  }, []);

  const keyUpHandler: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      // console.log("KeyUp event ", event.key, event.key?.length);
      const target = event.target;
      const value = (target as HTMLInputElement).value;
      const { key } = event;

      if (key === 'Escape') {
        setShowMenu(false);
      } else if (key === 'Space' || key === ' ') {
        // console.log('space key pressed');
      } else if (key === 'ArrowDown') {
        // console.log('arrow down pressed');
      } else if (key === 'ArrowUp') {
        // console.log('arrow up pressed');
      } else {
        console.log('key ', key, value);
        setInputVal(value);
        setShowMenu(true);
      }
    }, []);

  console.log('Autocomplete rendering, inputVal ', inputVal, showMenu);
  return (
    // <ComboboxContext.Provider
    //   value={{
    //     isCompact: isCompact ?? false,
    //     activeValue: selectedValue,
    //     selectedValue,
    //     onSelect: selectOption,
    //   }}
    // >
    <div className='dropdown' ref={dropdownRef}>
      <label htmlFor={elementIds.inputId}>Autocomplete Dropdown</label>
      <div className='dd-input-container' onClick={focusInput}>
        <>
          {!isFocused && (
            <div className='dd-value'>
              {selectedOption
                ? Array.isArray(selectedOption)
                  ? selectedOption.join(', ')
                  : selectedOption.toString()
                : ''}
            </div>
          )}
          <input
            id={elementIds.inputId}
            className={isFocused ? 'expand' : ''}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onKeyUp={keyUpHandler}
            onKeyDown={keyDownHandler}
            ref={inputRef}
            autoComplete='off'
          />
        </>
      </div>
      {showMenu && React.Children.toArray(children).length > 0 && (
        <Menu inputVal={inputVal} ref={menuRef}>
          {children}
        </Menu>
      )}
    </div>
    // </ComboboxContext.Provider>
  );
};

export default Autocomplete;
