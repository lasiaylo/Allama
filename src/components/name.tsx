import * as React from 'react';
import '../styles/components/name.scss';

type Props = {
  firstName: string | null;
  lastName: string | null;
};
export default function Name({ firstName, lastName }: Props) {
  return (
    <div className="name-container">
      <div className="firstname">{firstName}</div>
      <div className="lastname">{lastName}</div>
    </div>
  );
}
