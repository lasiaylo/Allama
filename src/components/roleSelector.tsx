import * as React from 'react';
import { memo } from 'react';
import FunctionMenu from './util/functionMenu';
import { navigate } from 'gatsby';
import * as _ from 'lodash';

const RoleSelector = memo(function RoleSelector({
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
},
_.isEqual);

export default RoleSelector;
