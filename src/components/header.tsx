import { IGatsbyImageData } from 'gatsby-plugin-image';
import Name from './name';
import Contact from './contact';
import * as React from 'react';
import Noise from './noise';

export interface IContact {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly blurb: string;
  readonly portrait: { image: IGatsbyImageData };
  readonly portraitVideo: { file: { url: string } };
}

export default function Header({
  info: { firstName, lastName, email, phoneNumber },
}: {
  info: IContact;
}) {
  return (
    <div className="header">
      <Noise>
        <Name firstName={firstName} lastName={lastName} />
      </Noise>
      <Noise>
        <Contact email={email} phoneNumber={phoneNumber} />
      </Noise>
    </div>
  );
}
