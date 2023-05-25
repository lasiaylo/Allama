import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import MenuLink from './menuLink';

interface Button {
  label: string;
  to: string;
}

type PropTypes = React.PropsWithChildren<{
  buttons: Button[];
  className: string;
}>;

function getMenuLinks(buttons: Button[]) {
  return buttons.map(({ label, to }) => {
    return (
      <MenuLink to={`/${to}`} isActive key={label}>
        {label}
      </MenuLink>
    );
  });
}

function NavMenu({ buttons, className }: PropTypes) {
  const items = getMenuLinks(buttons);
  return (
    <NavigationMenu.Root className={className}>
      <NavigationMenu.List>{items}</NavigationMenu.List>
      <NavigationMenu.Indicator />
    </NavigationMenu.Root>
  );
  return <div />;
}

// export default function NavMenu({ buttons, className }: PropTypes) {}

export default NavMenu;
