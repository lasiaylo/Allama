import * as React from 'react';
import { Link } from 'gatsby';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

interface PropTypes {
  to: string;
  isActive: boolean;
}

export default function MenuLink({
  to,
  isActive,
  children,
}: React.PropsWithChildren<PropTypes>) {
  return (
    <NavigationMenu.Item>
      <Link to={to}>
        <NavigationMenu.Link className="menu-link" active={isActive} />
        {children}
      </Link>
    </NavigationMenu.Item>
  );
}
