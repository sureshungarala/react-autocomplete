import React from 'react';

const MenuContext = React.createContext<
  | {
      itemIndexRef: React.MutableRefObject<number>;
    }
  | undefined
>(undefined);

const useMenuContext = () => {
  const menuContext = React.useContext(MenuContext);
  if (!menuContext) {
    throw new Error('Error: this component must be rendered within <Menu />');
  }
  return menuContext;
};

export { MenuContext, useMenuContext };
