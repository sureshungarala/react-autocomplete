import * as React from 'react';

import { MenuProps } from '../types';

import { useElementIds } from '../hooks/utils';

const Menu: React.ForwardRefExoticComponent<MenuProps> = React.forwardRef(
  ({ children, inputVal }, ref) => {
    const { menuId, getItemId } = useElementIds();
    console.log('menuId ', menuId, !!inputVal);

    const options = React.useMemo(() => {
      if (React.isValidElement(children) || Array.isArray(children)) {
        return React.Children.map(
          children,
          (child: React.ReactElement, index: number) =>
            React.cloneElement(child, {
              id: getItemId(index),
              key: getItemId(index),
              index,
            })
        );
      }
      return children;
    }, [children, getItemId]);

    return inputVal ? (
      <ul className='dropdown-menu' ref={ref} id={menuId}>
        {options}
      </ul>
    ) : (
      <></>
    );
  }
);
Menu.displayName = 'Menu';

export default Menu;
