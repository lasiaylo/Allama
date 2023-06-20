import * as React from 'react';
import { useEffect, useState } from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import '../styles/pages/index.scss';
import Header, { IContact } from '../components/header';
import { Separator } from '@radix-ui/react-separator';
import mapWorks, { IWork } from '../util/page/IndexUtils';
import { startCase } from 'lodash';
import RoleSelector from '../components/roleSelector';
import { useSpringRef } from 'react-spring';
import Footer from '../components/footer';
import Noise from '../components/noise';
import Sidebar from '../components/sidebar';
import WorksView from '../components/worksView';

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
        portraitVideo {
          file {
            url
          }
        }
      }
    }

    workResults: allContentfulWork {
      nodes {
        id
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

export default function IndexPage({
  data: { infoResults, workResults },
  location: { hash },
}: PageProps<Queries.IndexQuery>) {
  const info: IContact = infoResults.nodes[0] as IContact;
  const works: IWork[] = workResults.nodes.filter((i): i is IWork => {
    return typeof i === 'object';
  });
  const rolesToWorks: Record<string, IWork[]> = mapWorks(works);
  const roles = Object.keys(rolesToWorks);

  const pageRole = startCase(hash.replace('#', ''));
  const [activeRole, setActiveRole] = useState(rolesToWorks.hasOwnProperty(pageRole) ? pageRole : roles[0]);
  const [activeWork, setActiveWork] = useState(rolesToWorks[activeRole][0]);
  const springRef = useSpringRef();

  useEffect(() => {
    if (rolesToWorks.hasOwnProperty(pageRole)) {
      setActiveRole(pageRole);
      setActiveWork(rolesToWorks[pageRole][0]);
    }
  }, [hash]);

  useEffect(() => {
    springRef.start();
  }, [activeRole, activeWork]);

  return (
    <div className="site-container">
      <Header info={info} />
      <Separator className="separator" />
      <RoleSelector roles={roles} active={activeRole} />
      <div className="works-body">
        <Sidebar
          works={rolesToWorks[activeRole]}
          activeWork={activeWork}
          callback={setActiveWork}
          springRef={springRef}
        />
        <WorksView {...activeWork} />
      </div>
      <div className="footer">
        <Footer url={info.portraitVideo.file.url} />
        <Noise className={'chatbox'}>
        <p>
          How can I help?
          <br /> Let me know.{' '}
        </p>
        </Noise>
      </div>
    </div>
  );
}
