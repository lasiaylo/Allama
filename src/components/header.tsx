import * as React from 'react';
import '../styles/components/header.scss';

export interface IContactInfo {
  firstName: Queries.Maybe<string>;
  lastName: Queries.Maybe<string>;
  email: Queries.Maybe<string>;
  phoneNumber: Queries.Maybe<string>;
}

export default function Header({ contactInfo }: { contactInfo: IContactInfo }) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
  } = contactInfo;
  return (
    <div className="header">
      <div className="name-container">
        <div className="firstName">{firstName}</div>
        <div className="lastName">{lastName}</div>
      </div>
      <div className="contact-container">
        <div className="email">{email}</div>
        <div className="phonenumber">{phoneNumber}</div>
      </div>
    </div>
  );
}
