import * as React from 'react';
import { useEffect, useState } from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import '../styles/pages/index.scss';
import Header, { IContact } from '../components/header';
import { Separator } from '@radix-ui/react-separator';
import Sidebar from '../components/sidebar';
import WorksView from '../components/worksView';
import { GatsbyImage } from 'gatsby-plugin-image';
import RoleSelector from '../components/roleSelector';
import mapWorks, { IWork } from '../util/page/IndexUtils';
import { startCase } from 'lodash';

export const query = graphql`
  query Index {
    infoResults: allContentfulPersonalInfo(limit: 1) {
      nodes {
        firstName
        lastName
        email
        phoneNumber
        blurb
        portrait {
          image: gatsbyImage(width: 140, height: 140)
        }
      }
    }

    workResults: allContentfulWork {
      nodes {
        roles
        name
        datePublished
        description
        preview {
          image: gatsbyImageData(layout: CONSTRAINED)
        }
        link
      }
    }
  }
`;

export default function IndexPage({ data: {infoResults, workResults}, location: {hash} }: PageProps<Queries.IndexQuery>) {
  const info: IContact = infoResults.nodes[0] as IContact;
  const works: IWork[] = workResults.nodes.filter((i): i is IWork => {
    return typeof i === 'object';
  });
  const rolesToWorks: Record<string, IWork[]> = mapWorks(works);
  const roles = Object.keys(rolesToWorks);
  const [activeRole, setActiveRole] = useState(roles[0]);
  const [activeWork, setActiveWork] = useState(rolesToWorks[activeRole][0]);

  useEffect(() => {
    const pageRole = startCase(hash.replace('#', ''));
    if (rolesToWorks.hasOwnProperty(pageRole)) {
      setActiveRole(pageRole);
      setActiveWork(rolesToWorks[pageRole][0])
    }
  }, [hash]);

  // TODO: url to active role/work
  return (
    <div className="site-container">
      <Header {...info}/>
      <Separator className="separator" />
      <RoleSelector roles={roles} active={activeRole}/>
      <div className="works-body">
        <Sidebar works={rolesToWorks[activeRole]} activeWork={activeWork} callback={setActiveWork} />
        <WorksView {...activeWork} />
      </div>
      <div className="footer">
        <GatsbyImage className="chatbox-image" alt="" image={info.portrait.image} />
        <p className="chatbox">
          How can I help?
          <br /> Let me know.{' '}
        </p>
      </div>
    </div>
  );
}
