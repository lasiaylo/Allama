import * as React from 'react';
import '../styles/components/contact.scss';

type Props = {
  email: string | null;
  phoneNumber: string | null;
};
export default function Contact({ email, phoneNumber }: Props) {
  return (
    <div className="contact-container">
      <div className="email">{email}</div>
      <div className="phone-number">{phoneNumber}</div>
    </div>
  );
}