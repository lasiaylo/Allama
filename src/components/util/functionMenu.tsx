import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import '../../styles/components/functionMenu.scss';
import { animated, useTrail } from 'react-spring';

export interface IButton {
  label: string;
  active: boolean;
  callback?: Function;
}

type PropTypes = NavigationMenuProps & {
  buttons: IButton[];
};

export default function FunctionMenu({ buttons, orientation }: PropTypes) {
  const trails = useTrail(buttons.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 100,
  });

  const items = trails.map((style, i) => {
    const { label, active, callback } = buttons[i];

    return callback ? (
      <NavigationMenu.Item className="menu-item" key={i}>
        <NavigationMenu.Link
          active={active}
          className="menu-link"
          onSelect={callback ? () => callback() : undefined}
        >
          <animated.div style={style}>{label}</animated.div>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    ) : <animated.h3 style={style} className='menu-header'>{label}</animated.h3>;
  });
  return (
    <NavigationMenu.Root className="menu" orientation={orientation}>
      <NavigationMenu.List className="menu-list">{items}</NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
