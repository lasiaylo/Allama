import * as React from 'react';

import '../styles/pages/landing.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import Name from '../components/name';
import Contact from '../components/contact';
// eslint-disable-next-line import/extensions
import { ToNonbreakHyphen } from '../util/StringUtils';

export default function LandingPage({ info: { nodes } }: Queries.IndexQuery) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    blurb,
    // @ts-ignore Fix another day
    portrait: { image },
  } = nodes[0];

  return (
    <div className="landing-page">
      <Name firstName={firstName} lastName={lastName} />
      <GatsbyImage className="portrait" image={image} alt="" />
      <Contact email={email} phoneNumber={phoneNumber} />
      <div className="blurb">{ToNonbreakHyphen(blurb ?? '')}</div>
    </div>
  );
}
