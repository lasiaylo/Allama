import FunctionMenu, { IButton } from './util/functionMenu';
import * as React from 'react';
import { IWork } from '../util/page/IndexUtils';
import '../styles/components/s_sidebar.scss';

type PropTypes = {
  works: IWork[];
  callback: Function;
  activeWork: IWork;
};

export default function Sidebar({
  works,
  callback,
  activeWork,
}: PropTypes) {
  const yearToWork: Record<string, IWork[]> = {};
  // TODO: Convert to reduce
  works.forEach((work) => {
    const year = new Date(work.datePublished).getFullYear().toString();
    if (yearToWork[year] === undefined) {
      yearToWork[year] = [];
    }
    yearToWork[year].push(work);
  });

  const buttons = Object.keys(yearToWork)
    .sort((a, b) => +new Date(b) - +new Date(a))
    .reduce<IButton[]>((acc, year) => {
      return [
        ...acc,
        {
          label: year,
          active: false,
        },
        ...yearToWork[year].map((work) => ({
          label: work.name,
          active: work === activeWork,
          callback: () => {
            callback(work);
          },
        })),
      ];
    }, []);

  return (
    <div className="sidebar">
      <FunctionMenu
        orientation={'vertical'}
        buttons={buttons}
      />
    </div>
  );
}
