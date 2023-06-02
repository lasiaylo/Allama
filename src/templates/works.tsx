import * as React from 'react';
import { memo, useState } from 'react';

import { Link, navigate, PageProps } from 'gatsby';
import { Separator } from '@radix-ui/react-separator';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as _ from 'lodash';
import Name from '../components/name';
import Contact from '../components/contact';
import '../styles/pages/works.scss';
import WorksView from '../components/worksView';
import { IWork, PageContextType } from '../../gatsby-node';
import FunctionMenu from '../components/functionMenu';
import { DirectionProvider } from '@radix-ui/react-direction';

const RoleSelector = memo(function RoleSelector({
  roles,
}: {
  roles: string[];
}) {
  return (
    <div className="role-selector">
      <FunctionMenu
        orientation={'horizontal'}
        buttons={roles.map((role) => ({
          label: role,
          callback: () => navigate(`/${role.toLowerCase()}`),
        }))}
      />
    </div>
  );
},
_.isEqual);

function Sidebar({ works, callback }: { works: IWork[]; callback: Function }) {
  const yearToWork: Record<string, IWork[]> = {};
  works.forEach((work) => {
    const year = new Date(work.datePublished).getFullYear().toString();
    if (yearToWork[year] === undefined) {
      yearToWork[year] = [];
    }
    yearToWork[year].push(work);
  });

  const sidebar = Object.keys(yearToWork)
    .sort((a, b) => (+new Date(b) - +new Date(a)))
    .map((year) => {
      const section = yearToWork[year].map((work) => (
        <FunctionMenu
          orientation={'vertical'}
          buttons={Array(5).fill({
            label: work.name,
            callback: () => {
              callback(work);
            },
          })}
        />
      ));
      return (
        <div className={'year-container'} key={year}>
          <h3 className={'year'}>{year}</h3>
          {section}
        </div>
      );
    });

  return <div className="sidebar">{sidebar}</div>;
}

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
  const [selectedWork, setSelectedWork] = useState(works[0]);
  return (
    <DirectionProvider dir="rtl">
      <div className="site-container">
        <Link to={'/'}>
          <div className="header">
            <Name firstName={firstName} lastName={lastName} />
            <Name firstName={'.'} lastName={'.'} invisible={true} />
            <Contact email={email} phoneNumber={phoneNumber} />
          </div>
        </Link>
        <Separator className="separator" />
        <RoleSelector roles={roles} />
        <div className="works-body">
          <Sidebar works={works} callback={setSelectedWork} />
          <WorksView {...selectedWork} />
        </div>
        <div className="footer">
          <GatsbyImage alt="" image={image} />
          <div className="chatbox">How can I help? Let me know.</div>
        </div>
      </div>
    </DirectionProvider>
  );
}
