import React from 'react';

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

export { useElementIds };
