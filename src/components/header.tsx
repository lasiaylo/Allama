import { IGatsbyImageData } from 'gatsby-plugin-image';
import Name from './name';
import Contact from './contact';
import * as React from 'react';

export interface IContact {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly blurb: string;
  readonly portrait: { image: IGatsbyImageData };
}

export default function Header({
  info: { firstName, lastName, email, phoneNumber },
}: {
  info: IContact;
}) {
  return (
    <div className="header">
      <Name firstName={firstName} lastName={lastName} />
      <Contact email={email} phoneNumber={phoneNumber} />
    </div>
  );
}
