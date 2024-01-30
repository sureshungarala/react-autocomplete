import {
  useState,
  KeyboardEventHandler,
  KeyboardEvent,
  useCallback,
} from 'react';

const useCombobox = () => {
  const [activeElemIndex, setActiveElemIndex] = useState<number>(-1);
  console.log('activeElemIndex in useCombobox ', activeElemIndex);

  // console.log("activeElemIndex ", activeElemIndex);
  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // console.log("KeyDown event ", event.key, event.key?.length);
      const { key } = event;
      if (key === 'ArrowDown') {
        event.preventDefault();
        setActiveElemIndex((oldIndex) => {
          return oldIndex + 1;
        });
      } else if (key === 'ArrowUp') {
        event.preventDefault();
        setActiveElemIndex((oldIndex) => oldIndex - 1);
      } else {
        // setActiveElemIndex(-1);
      }
    },
    [setActiveElemIndex]
  );

  return { activeElemIndex, keyDownHandler };
};

export default useCombobox;
