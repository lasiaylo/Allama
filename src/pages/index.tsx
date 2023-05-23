import * as React from 'react';
import type { PageProps } from 'gatsby';
import { graphql, Link } from 'gatsby';

import '../styles/pages/index.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import Name from '../components/name';
import Contact from '../components/contact';
import { ToNonbreakHyphen } from '../util/StringUtils';

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
  }
`;

export default function IndexPage({ data }: PageProps<Queries.IndexQuery>) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    blurb,
    // @ts-ignore Fix another day
    portrait: { image },
  } = data.info.nodes[0];
  return (
    <div className="site-container">
      <div className="landing-page">
        <Link to="works">Beep boop</Link>
        <Name firstName={firstName} lastName={lastName} />
        <GatsbyImage className="portrait" image={image} alt="" />
        <Contact email={email} phoneNumber={phoneNumber} />
        <div className="blurb">{ToNonbreakHyphen(blurb ?? '')}</div>
      </div>
    </div>
  );
}
