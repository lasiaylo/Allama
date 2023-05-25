import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from 'gatsby';

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
