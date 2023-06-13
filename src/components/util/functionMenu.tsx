import * as React from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import '../../styles/components/functionMenu.scss';
import { animated, SpringRef, useTrail, useTransition } from 'react-spring';
import Noise from '../noise';

export interface IButton {
  label: string;
  active: boolean;
  callback?: Function;
}

type PropTypes = NavigationMenuProps & {
  buttons: IButton[];
  springRef?: SpringRef;
};

export default function FunctionMenu({
  buttons,
  orientation,
  springRef,
}: PropTypes) {
  const delay = 50;
  const trails = useTrail(buttons.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: delay / 2,
  });

  const transition = useTransition(buttons, {
    ref: springRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    // leave: { opacity: 0 },
    exitBeforeEnter: true,
    trail: delay,
  });

  // TODO: Refactor into separate component
  const items = springRef
    ? transition((style, button) => {
        const { active, callback, label } = button;
        return callback ? (
          <NavigationMenu.Item className="menu-item" key={crypto.randomUUID()}>
            <NavigationMenu.Link
              active={active}
              className="menu-link"
              onSelect={callback ? () => callback() : undefined}
            >
              <Noise>
              <animated.div style={style}>{label}</animated.div>
              </Noise>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ) : (
          // <Noise>
          <animated.h3 style={style} className="menu-header">
            {label}
          </animated.h3>
          // </Noise>
        );
      })
    : trails.map((style, i) => {
        const { active, callback, label } = buttons[i];
        return callback ? (
          <NavigationMenu.Item className="menu-item" key={crypto.randomUUID()}>
            <NavigationMenu.Link
              active={active}
              className="menu-link"
              onSelect={callback ? () => callback() : undefined}
            >
              <animated.div style={style}>{label}</animated.div>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ) : (
          <animated.h3 style={style} className="menu-header">
            {label}
          </animated.h3>
        );
      });
  return (
    <NavigationMenu.Root className="menu" orientation={orientation}>
      <NavigationMenu.List className="menu-list">{items}</NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
