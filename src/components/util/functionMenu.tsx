import * as React from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import '../../styles/components/s_functionMenu.scss';
import Noise from '../noise';
import NoiseHover from '../noiseHover';

export interface IButton {
  label: string;
  active: boolean;
  callback?: Function;
}

type PropTypes = NavigationMenuProps & {
  buttons: IButton[];
};

export default function FunctionMenu({
  buttons,
  orientation,
}: PropTypes) {
  // TODO: Refactor into separate component
  const items = buttons.map(({ active, callback, label }) => {
    return callback ? (
      <NavigationMenu.Item className="menu-item">
        <NavigationMenu.Link
          active={active}
          className="menu-link"
          onSelect={callback ? () => callback() : undefined}
        >
          <NoiseHover id={label} isActive={active} isHoverable={true}>{label}</NoiseHover>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    ) : (
      <Noise>
        <h3 className="menu-header">{label}</h3>
      </Noise>
    );
  });
  return (
    <NavigationMenu.Root className="menu" orientation={orientation}>
      <NavigationMenu.List className="menu-list">{items}</NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
