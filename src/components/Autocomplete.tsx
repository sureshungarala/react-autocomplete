/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Menu from './Menu';
import { ComboboxContext } from '../context/ComboboxContext';
import {
  ComboboxReducer,
  ComboboxReducerActionType,
} from '../reducers/ComboboxReducer';
import { AutocompleteProps, OptionValue } from '../types';

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
  const [state, dispatch] = React.useReducer(ComboboxReducer, {
    highlightedIndex: -1,
    inputVal: '',
  });
  console.log('new state ', state);
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<
    OptionValue | OptionValue[] | null
  >(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    onChange?.(state.inputVal);
    return () => {
      onChange?.cancel?.();
    };
  }, [onChange, state.inputVal]);
  // console.log('children ', children, showMenu);

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

    return () => {
      document.removeEventListener('click', documentClickHandler);
    };
  }, []);

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
    setShowMenu(true);
  }, []);

  const onInputBlur = React.useCallback(() => {
    setIsFocused(false);
  }, []);

  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key, target } = event;
        const value = (target as HTMLInputElement).value;
        console.log('key ', key, value, typeof value, value.length);
        if (key === 'Escape') {
          setShowMenu(false);
        }
        // else if (key === 'Space' || key === ' ') {
        //   // console.log('space key pressed');
        //   dispatch({
        //     type: ComboboxReducerActionType.SetInputVal,
        //     payload: value,
        //   });
        // }
        else if (key === 'ArrowDown') {
          const menuItems =
            menuRef.current?.querySelectorAll('li')?.length ?? 0;
          console.log('arrow down pressed ', state.highlightedIndex);
          dispatch({
            type: ComboboxReducerActionType.SetHighlightedIndex,
            payload:
              state.highlightedIndex + 1 > menuItems - 1
                ? 0
                : state.highlightedIndex + 1,
          });
        } else if (key === 'ArrowUp') {
          const menuItems =
            menuRef.current?.querySelectorAll('li')?.length ?? 0;
          // console.log('arrow up pressed');
          dispatch({
            type: ComboboxReducerActionType.SetHighlightedIndex,
            payload:
              state.highlightedIndex - 1 < 0
                ? menuItems - 1
                : state.highlightedIndex - 1,
          });
        }
      },
      [state.highlightedIndex]
    );

  const onInputValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      console.log('onChange value ', value, value.length);
      dispatch({
        type: ComboboxReducerActionType.SetInputVal,
        payload: value,
      });
      setShowMenu(true);
    },
    []
  );

  return (
    <ComboboxContext.Provider
      value={{
        isCompact: isCompact ?? false,
        activeValue: selectedValue,
        selectedValue,
        onSelect: selectOption,
        itemIndexRef: { current: 0 },
        highlightedIndex: state.highlightedIndex,
      }}
    >
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
              onKeyDown={keyDownHandler}
              onChange={onInputValueChange}
              ref={inputRef}
              autoComplete='off'
            />
          </>
        </div>
        {showMenu && React.Children.toArray(children).length > 0 && (
          <Menu isOpen={state.inputVal.length > 0} ref={menuRef}>
            {children}
          </Menu>
        )}
      </div>
    </ComboboxContext.Provider>
  );
};

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
