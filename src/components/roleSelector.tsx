import * as React from 'react';
import FunctionMenu from './util/functionMenu';
import { navigate } from 'gatsby';
import '../styles/components/s_roleSelector.scss';

const RoleSelector = function RoleSelector({
  roles,
  active,
}: {
  roles: string[];
  active: string;
}) {
  return (
    <div className="role-selector">
      <FunctionMenu
        orientation={'horizontal'}
        buttons={roles.map((role) => {
          return {
            label: role,
            active: role.toLowerCase() == active.toLowerCase(),
            callback: () => navigate(`#${role.toLowerCase()}`),
          };
        })}
      />
    </div>
  );
};
export default RoleSelector;
