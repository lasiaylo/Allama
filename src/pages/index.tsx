import * as React from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import LandingPage from './landing';

import '../styles/pages/index.scss';

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
  const { info } = data;
  return (
    <div className="site-container">
      <LandingPage info={info} />
    </div>
  );
}
