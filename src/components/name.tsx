import * as React from 'react';
import '../styles/components/name.scss';

type Props = {
  firstName: string | null;
  lastName: string | null;
};
export default function Name({ firstName, lastName }: Props) {
  return (
    <div className="name-container">
      <h1 className="firstname">{firstName}</h1>
      <h1 className="lastname">{lastName}</h1>
    </div>
  );
}
