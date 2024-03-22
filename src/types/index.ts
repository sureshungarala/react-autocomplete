/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForwardedRef, ReactNode } from 'react';

type OptionValue = string | object;

type onChangeType = {
  (inputVal: OptionValue, valueIndex?: number): void;
  cancel?: () => void;
};

type AutocompleteProps = {
  children: ReactNode;
  isCompact?: boolean;
  isMultiselectable?: boolean;
  isDisabled?: boolean;
  onChange: (selectedValue: OptionValue | OptionValue[] | null) => unknown;
  onInputValChange?: onChangeType;
  // onInputValChange?: onChangeType;
  initialSelectedValue?: OptionValue | OptionValue[] | null;
};

type MenuProps = {
  children: ReactNode;
  isOpen: boolean;
  ref?: ForwardedRef<HTMLUListElement>;
};

type OptionProps = {
  id?: string;
  index?: number;
  children: ReactNode;
  value?: OptionValue;
  isDisabled?: boolean;
};

type StyledOptionProps = {
  $isCompact?: boolean;
  $isActive?: boolean;
  $isSelected?: boolean;
  disabled?: boolean;
};

type debounceType = {
  (...args: any[]): void;
  cancel: () => void;
};

export type {
  AutocompleteProps,
  MenuProps,
  OptionProps,
  OptionValue,
  StyledOptionProps,
  onChangeType,
  debounceType,
};
