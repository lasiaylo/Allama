import * as React from 'react';
import { memo, useEffect, useState } from 'react';

import { Link, navigate, PageProps } from 'gatsby';
import { Separator } from '@radix-ui/react-separator';
import * as _ from 'lodash';
import Name from '../components/name';
import Contact from '../components/contact';
import '../styles/pages/works.scss';
import WorksView from '../components/worksView';
import { IWork, PageContextType } from '../../gatsby-node';
import FunctionMenu from '../components/functionMenu';
import { DirectionProvider } from '@radix-ui/react-direction';
import { GatsbyImage } from 'gatsby-plugin-image';
import slugify from 'slugify';

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
            callback: () => navigate(`/${role.toLowerCase()}`),
          };
        })}
      />
    </div>
  );
},
_.isEqual);

function Sidebar({
  works,
  callback,
  activeWork,
}: {
  works: IWork[];
  callback: Function;
  activeWork: IWork;
}) {
  const yearToWork: Record<string, IWork[]> = {};
  works.forEach((work) => {
    const year = new Date(work.datePublished).getFullYear().toString();
    if (yearToWork[year] === undefined) {
      yearToWork[year] = [];
    }
    yearToWork[year].push(work);
  });

  const sidebar = Object.keys(yearToWork)
    .sort((a, b) => +new Date(b) - +new Date(a))
    .map((year) => {
      const section = yearToWork[year].map((work) => {
        return (
          <FunctionMenu
            orientation={'vertical'}
            buttons={Array(5).fill({
              label: work.name,
              active: work === activeWork,
              callback: () => {
                callback(work);
              },
            })}
          />
        );
      });
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
  location: { pathname, hash },
}: PageProps<any, PageContextType>) {
  const pageRole = pathname.replace(/^\/|\/$/g, '');
  const pageWork = hash.replace('#', '');
  const nameToSlug = works.reduce<Record<string, IWork>>((acc, work) => {
    return { ...acc, [slugify(work.name)]: work };
  }, {});

  const [activeWork, setActiveWork] = useState(works[0]);
  const navToWork = (work: IWork) => navigate(`#${slugify(work.name)}`);

  useEffect(() => {
    if (!_.isEmpty(pageWork)) {
      setActiveWork(nameToSlug[pageWork]);
    }
  }, [pageWork]);

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
        <RoleSelector roles={roles} active={pageRole} />
        <div className="works-body">
          <Sidebar works={works} activeWork={activeWork} callback={navToWork} />
          <WorksView {...activeWork} />
        </div>
        <div className="footer">
          <GatsbyImage className="chatbox-image" alt="" image={image} />
          <p className="chatbox">
            How can I help?
            <br /> Let me know.{' '}
          </p>
        </div>
      </div>
    </DirectionProvider>
  );
}
