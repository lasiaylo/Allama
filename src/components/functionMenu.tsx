import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import '../styles/components/functionMenu.scss';

interface Button {
  label: string;
  active: boolean;
  callback: Function;
}

type PropTypes  = NavigationMenuProps & {
  buttons: Button[];
}

export default function FunctionMenu({
  buttons,
  orientation
}: PropTypes) {
  const items = buttons.map(({ label, active,  callback }, index) => (
    <NavigationMenu.Item className='menu-item' key={index}>
      <NavigationMenu.Link active={active} className='menu-link' onSelect={() => callback()} >
        {label}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  ));
  return (
      <NavigationMenu.Root className='menu' orientation={orientation}>
        <NavigationMenu.List className='menu-list'>{items}</NavigationMenu.List>
      </NavigationMenu.Root>
  );
}
