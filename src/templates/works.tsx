import * as React from 'react';
import { memo } from 'react';

import { PageProps } from 'gatsby';
import { Separator } from '@radix-ui/react-separator';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as _ from 'lodash';
import Name from '../components/name';
import Contact from '../components/contact';
import '../styles/pages/works.scss';
import WorksView from '../components/worksView';
import { PageContextType } from '../../gatsby-node';
import NavMenu from '../components/navMenu';

const RoleSelector = memo(function RoleSelector({
  roles,
}: {
  roles: string[];
}) {
  return (
    <NavMenu
      className="role-selector"
      buttons={roles.map((role) => {
        return {
          label: role,
          to: role.toLowerCase(),
        };
      })}
    />
  );
},
_.isEqual);

export default function WorksPage({
  pageContext: {
    roles,
    works,
    personalInfo: {
      firstName,
      lastName,
      email,
      phoneNumber,
      portrait: { image },
    },
  },
}: PageProps<any, PageContextType>) {
  return (
    <div className="site-container">
      <div className="works-page">
        <div className="header">
          <Name firstName={firstName} lastName={lastName} />
          <Contact email={email} phoneNumber={phoneNumber} />
        </div>
        <Separator className="separator" />
        <RoleSelector roles={roles} />
        <div className="works-view">
          <WorksView
            title="The Server"
            description="I provided comprehensive design services for a women-only boxing gym, including branding strategy, business strategy, naming, visual design, interior design, installation and PR support, and website."
            preview="a"
          />
        </div>
        <div className="chatbox-container">
          <GatsbyImage alt="" image={image} />
          <div className="chatbox">How can I help? Let me know.</div>
        </div>
      </div>
    </div>
  );
}
