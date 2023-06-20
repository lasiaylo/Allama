import * as React from 'react';
import '../styles/components/s_contact.scss';

type Props = {
  email: string | null;
  phoneNumber: string | null;
};
export default function Contact({ email, phoneNumber }: Props) {
  return (
    <div className="contact-container">
      <p className="email">{email}</p>
      <p className="phone-number">{phoneNumber}</p>
    </div>
  );
}
