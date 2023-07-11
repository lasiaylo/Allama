import * as React from 'react';
import { useEffect, useState } from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import '../styles/pages/s_index.scss';
import Header, { IContact } from '../components/header';
import { Separator } from '@radix-ui/react-separator';
import mapWorks, { IWork } from '../util/page/IndexUtils';
import { startCase } from 'lodash';
import Footer from '../components/footer';
import PageBody from '../components/pageBody';
import RoleSelector from '../components/roleSelector';

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

    workResults: allContentfulWork(sort: { datePublished: DESC }) {
      nodes {
        id
        roles
        name
        datePublished
        description
        previewVideo {
          file {
            url
          }
        }
        previewImage {
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
  const [activeRole, setActiveRole] = useState(
    rolesToWorks.hasOwnProperty(pageRole) ? pageRole : roles[0]
  );

  useEffect(() => {
    if (rolesToWorks.hasOwnProperty(pageRole)) {
      setActiveRole(pageRole);
    }
  }, [hash]);

  const pageWorks = rolesToWorks[activeRole];

  return (
    <div className="site-container">
      <title>{`${info.firstName} portfolio`}</title>
      <Header info={info} />
      <Separator className="separator" />
      <RoleSelector roles={roles} active={activeRole} />
      <PageBody works={pageWorks} />
      <div className="footer">
        <Footer url={info.portraitVideo.file.url} />
      </div>
    </div>
  );
}
