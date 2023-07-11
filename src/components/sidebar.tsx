import FunctionMenu from './util/functionMenu';
import * as React from 'react';
import { IWork } from '../util/page/IndexUtils';
import '../styles/components/s_sidebar.scss';

type PropTypes = {
  works: IWork[];
  callback: Function;
  activeWork: IWork;
};

export default function Sidebar({ works, callback, activeWork }: PropTypes) {
  const buttons = works.map((work) => ({
    label: work.name,
    active: work === activeWork,
    callback: () => {
      callback(work);
    },
  }));

  return (
    <div className="sidebar">
      <FunctionMenu orientation={'vertical'} buttons={buttons} />
    </div>
  );
}
