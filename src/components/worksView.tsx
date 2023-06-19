import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import '../styles/components/worksView.scss';
import { IWork } from '../util/page/IndexUtils';
import NoiseTransition from './noiseTransition';

export default function WorksView(work: React.PropsWithChildren<IWork>) {
  const { link, preview, name, description, id } = work;
  return (
    <div className={'works-view'}>
      <a className="card-view" href={link} target="_blank">
        <GatsbyImage className="preview" alt="" image={preview.image} />
      </a>
      <NoiseTransition id={id}>
        <h2>{name}</h2>
      </NoiseTransition>
      <NoiseTransition id={id}>
        <p>{description}</p>
      </NoiseTransition>
    </div>
  );
}
