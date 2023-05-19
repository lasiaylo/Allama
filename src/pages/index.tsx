import * as React from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import Header, { IContactInfo } from '../components/header';

import '../styles/index.scss';

export const query = graphql`
  query Index {
    contact: allContentfulContactInfo(limit: 1) {
      nodes {
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;

export default function IndexPage({ data }: PageProps<Queries.IndexQuery>) {
  const contactInfo: IContactInfo = data.contact.nodes[0];
  return (
    <div className="site-container">
      <Header contactInfo={contactInfo} />
      <div className="portrait" />
      <div className="blurb">Allamaprabhu is a NY-based director and the co–founder of 52films</div>
    </div>
  );
}
