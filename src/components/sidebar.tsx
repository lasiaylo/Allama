import FunctionMenu from './util/functionMenu';
import * as React from 'react';
import { useEffect } from 'react';
import { useSpringRef } from 'react-spring';
import { IWork } from '../util/page/IndexUtils';

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

  // const transition = useTransition(yearToWork, {
  //   from: { opacity: 1 },
  //   to: { opacity: 1 },
  //   leave: { opacity: 0 },
  // });

  const sidebar = Object.keys(yearToWork)
    .sort((a, b) => +new Date(b) - +new Date(a))
    .map((year) => {
      const section = yearToWork[year].map((work) => {
        return (
          <FunctionMenu
            orientation={'vertical'}
            buttons={Array(5).fill({
              label: work.name,
              active: work === activeWork,
              callback: () => {
                callback(work);
              },
            })}
          />
        );
      });
      return (
        <div className={'year-container'} key={year}>
          <h3 className={'year'}>{year}</h3>
          {section}
        </div>
      );
    });

  // return transition((style, data) => {
  return <div className="sidebar">{sidebar}</div>;
}
