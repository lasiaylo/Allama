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
      <p>{description}</p>
      {/*<h4 className={'test'}>{description}</h4>*/}
    </div>
  );
}
