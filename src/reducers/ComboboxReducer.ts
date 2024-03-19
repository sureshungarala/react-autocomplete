import React from 'react';

type ComboboxStateType = {
  highlightedIndex: number;
  inputVal: string;
};

enum ComboboxReducerActionType {
  SetHighlightedIndex = 'setHighlightedIndex',
  SetInputVal = 'setInputVal',
}

type ComboboxReducerAction = {
  type: ComboboxReducerActionType;
  payload: number | string;
};

const ComboboxReducer: React.Reducer<
  ComboboxStateType,
  ComboboxReducerAction
> = (state: ComboboxStateType, action: ComboboxReducerAction) => {
  switch (action.type) {
    case ComboboxReducerActionType.SetHighlightedIndex:
      console.log('action.payload ', action.payload);
      return {
        ...state,
        highlightedIndex: action.payload as number,
      };
    case ComboboxReducerActionType.SetInputVal:
      return {
        ...state,
        inputVal: action.payload as string,
      };
    default:
      return state;
  }
};

export { ComboboxReducer, ComboboxReducerActionType };
export type { ComboboxStateType, ComboboxReducerAction };
