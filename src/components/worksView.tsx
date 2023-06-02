import * as React from 'react';
import { IWork } from '../../gatsby-node';
import { GatsbyImage } from 'gatsby-plugin-image';
import '../styles/components/worksView.scss';

export default function WorksView({
  name,
  description,
  preview,
  link,
}: React.PropsWithChildren<IWork>) {
  return (
    <div className="works-view">
      <a href={link}>
        <GatsbyImage className="preview" alt="" image={preview.image} />
      </a>
      <h2>{name}</h2>
      <div className={'stack'}>
        <p className={'test1'}>{description}</p>
        {/*<p className={'test2'}>{description}</p>*/}
      </div>
    </div>
  );
}
