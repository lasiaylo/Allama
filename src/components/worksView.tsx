import * as React from 'react';
import { IWork } from '../../gatsby-node';
import { GatsbyImage } from 'gatsby-plugin-image';

export default function WorksView({
  name,
  description,
  preview,
}: React.PropsWithChildren<IWork>) {
  return (
    <div className="works-view">
      <GatsbyImage
        className="preview"
        alt=""
        image={preview.image}
        // objectFit={'contain'}
      />
      <h2>{name}</h2>
      <div className={'stack'}>
        <p className={'test1'}>{description}</p>
        {/*<p className={'test2'}>{description}</p>*/}
      </div>
    </div>
  );
}
