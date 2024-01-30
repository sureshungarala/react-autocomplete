import { useId, useRef } from "react";

const useElementIds = () => {
  const id = `ac-${useId()}`;
  const elementIdsRef = useRef({
    labelId: `${id}-label`,
    inputId: `${id}-input`,
    menuId: `${id}-menu`,
    getItemId: (index: number) => `${id}-item-${index}`,
  });
  return elementIdsRef.current;
};

export { useElementIds };
