import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import MenuLink from './menuLink';

const url = 'works';

function getMenuLinks(titles: string[]) {
  return titles.map((title) => {
    const to = `${url}#${title}`;
    return (
      <MenuLink to="/" isActive>
        {title}
      </MenuLink>
    );
  });
}

interface PropTypes {
  titles: string[];
}

export default function Sidebar({
  titles,
}: React.PropsWithChildren<PropTypes>) {
  const t = ['a', 'b', 'c'];
  const items = getMenuLinks(t);
  return (
    <div className="sidebar">
      <NavigationMenu.Root>
        <NavigationMenu.List>
          {items}
          <NavigationMenu.Item>
            <NavigationMenu.Link className="menu-link" active>
              beep boop
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <NavigationMenu.Indicator />
      </NavigationMenu.Root>
    </div>
  );
}
