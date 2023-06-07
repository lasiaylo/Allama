import * as React from 'react';
import { useEffect } from 'react';
import type { PageProps } from 'gatsby';
import { graphql, navigate } from 'gatsby';

import '../styles/pages/index.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import Name from '../components/name';
import Contact from '../components/contact';
import { ToNonbreakHyphen } from '../util/StringUtils';
import { isNonNull } from '../util/TypeUtils';

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
    works: allContentfulWork {
      nodes {
        roles
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

  const to = () =>
    navigate(
      `/${new Set(
        data.works.nodes
          .map((n) => n.roles)
          .flat()
          .filter(isNonNull) as string[]
      )
        .values()
        .next()
        .value.toLowerCase()}`
    );

  const page = (
    <div className="landing-page">
      <Name firstName={firstName} lastName={lastName} />
      <GatsbyImage className="portrait" image={image} alt="" />
      <Contact email={email} phoneNumber={phoneNumber} />
      <p className="blurb">{ToNonbreakHyphen(blurb ?? '')}</p>
    </div>
  );


  useEffect(() => {
    window.addEventListener('wheel', to);
    return () => {
      window.removeEventListener('wheel', to);
    };
  }, []);

  return(
    <div className="site-container" onClick={to} onScroll={to}>
      {page}
    </div>
  );
}
