import FunctionMenu, { IButton } from './util/functionMenu';
import * as React from 'react';
import { useEffect } from 'react';
import { useSpringRef } from 'react-spring';
import { IWork } from '../util/page/IndexUtils';
import '../styles/components/sidebar.scss';

export default function Sidebar({
  works,
  callback,
  activeWork,
}: {
  works: IWork[];
  callback: Function;
  activeWork: IWork;
}) {
  const transRef = useSpringRef();
  useEffect(() => {
    transRef.start();
  }, [works]);
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
      <FunctionMenu orientation={'vertical'} buttons={buttons} />
    </div>
  );
}
