import * as React from 'react';

import { useComboboxContext } from '../context/ComboboxContext';
import { MenuContext } from '../context/MenuContext';

import { MenuProps } from '../types';

import { useElementIds } from '../hooks/utils';

const Menu: React.ForwardRefExoticComponent<MenuProps> = React.forwardRef(
  ({ children, isOpen }, ref) => {
    const { menuId, getItemId } = useElementIds();
    const { itemIndexRef } = useComboboxContext();

    const options = React.useMemo(() => {
      if (React.isValidElement(children) || Array.isArray(children)) {
        return React.Children.map(
          children,
          (child: React.ReactElement, index: number) =>
            React.cloneElement(child, {
              id: getItemId(index),
              // key: getItemId(index),
              index,
            })
        );
      }
      return children;
    }, [children, getItemId]);

    itemIndexRef.current = 0;

    return isOpen ? (
      <MenuContext.Provider value={{ itemIndexRef }}>
        <ul className='dropdown-menu' ref={ref} id={menuId}>
          {options}
        </ul>
      </MenuContext.Provider>
    ) : (
      <></>
    );
  }
);
Menu.displayName = 'Menu';

export default Menu;
