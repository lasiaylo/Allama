import * as React from 'react';

import { graphql, PageProps } from 'gatsby';
import { Separator } from '@radix-ui/react-separator';
import Name from '../components/name';
import Contact from '../components/contact';
import '../styles/pages/works.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import WorksView from '../components/worksView';
import Sidebar from '../components/sidebar';

export const query = graphql`
  query Index {
    info: allContentfulPersonalInfo(limit: 1) {
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

    works: allContentfulWork(filter: { roles: { in: "Acting" } }) {
      nodes {
        roles
        datePublished
        name
      }
    }
  }
`;

interface Work {
  name: string;
  datePublished: string;
  roles: string[];
}

export default function WorksPage({ data }: PageProps<Queries.IndexQuery>) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    // @ts-ignore Fix another day
    portrait: { image },
  } = data.info.nodes[0];

  const titles = data.works.nodes.map((node) => node.name).filter(isNonNull);

  return (
    <div className="site-container">
      <div className="works-page">
        <div className="header">
          <Name firstName={firstName} lastName={lastName} />
          <Contact email={email} phoneNumber={phoneNumber} />
        </div>
        <Separator className="separator" />
        <div className="role-selector">
          <div>Writer</div>
          <div>Producer</div>
          <div>Director</div>
          <div>Editor</div>
          <div>Actor</div>
        </div>
        <Sidebar titles={titles} />
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
