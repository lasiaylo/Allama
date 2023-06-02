import * as React from 'react';
import '../styles/components/name.scss';
import classNames from 'classnames';

type Props = {
  firstName: string | null;
  lastName: string | null;
  invisible?: boolean;
};
export default function Name({ firstName, lastName, invisible = false}: Props) {
  console.log(invisible);
  return (
    <div className={"name-container"}>
      <h1 className={classNames("firstname", {invisible: invisible})}>{firstName}</h1>
      <h1 className={classNames("lastname" ,{invisible: invisible})}>{lastName}</h1>
    </div>
  );
}
