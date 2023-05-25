import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import MenuLink from './menuLink';

interface Button {
  label: string;
  to: string;
}

interface PropTypes {
  buttons: Button[];
}

const Menu: React.ForwardRefExoticComponent<
  Prop & React.RefAttributes<HTMLUListElement>
>;
function getMenuLinks(buttons: Button[]) {
  return buttons.map(({ label, to }) => {
    return (
      <MenuLink to={`/${to}`} isActive key={label}>
        {label}
      </MenuLink>
    );
  });
}

export default function TriggerMenu({
  buttons,
}: React.PropsWithChildren<PropTypes>) {
  const items = getMenuLinks(buttons);
  return (
    <div className="nav-menu">
      <NavigationMenu.Root>
        <NavigationMenu.Trigger>{items}</NavigationMenu.Trigger>
        <NavigationMenu.Indicator />
      </NavigationMenu.Root>
    </div>
  );
}
