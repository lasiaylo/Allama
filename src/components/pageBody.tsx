import { IWork } from '../util/page/IndexUtils';
import React, { useState } from 'react';
import Sidebar from './sidebar';
import WorksView from './worksView';
import '../styles/components/s_pagebody.scss';

export default function PageBody({ works }: { works: IWork[] }) {
  const [prevWorks, setPrevWorks] = useState(works);
  const [activeWork, setActiveWork] = useState(works[0]);

  if (works !== prevWorks) {
    setPrevWorks(works);
    setActiveWork(works[0]);
  }
  return (
    <div className="page-body">
      <Sidebar works={works} activeWork={activeWork} callback={setActiveWork} />
      <WorksView {...activeWork} />
    </div>
  );
}
