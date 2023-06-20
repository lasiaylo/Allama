import { IWork } from '../util/page/IndexUtils';
import React, { useState } from 'react';
import Sidebar from './sidebar';
import WorksView from './worksView';

export default function WorksBody({ works }: { works: IWork[] }) {
  const [activeWork, setActiveWork] = useState(works[0]);
  return (
    <div className="works-body">
      <Sidebar works={works} activeWork={activeWork} callback={setActiveWork} />
      <WorksView {...activeWork} />
    </div>
  );
}
