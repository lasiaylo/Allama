import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import '../styles/components/s_worksView.scss';
import { IWork } from '../util/page/IndexUtils';
import NoiseTransition from './noiseTransition';
import ReactPlayer from 'react-player';

export default function WorksView(work: React.PropsWithChildren<IWork>) {
  const { link, previewVideo, preview, name, description, id } = work;

  const previewImage = preview ? (
    <GatsbyImage className="preview" alt="" image={preview.image} />
  ) : (
    <></>
  );
  return (
    <div className={'works-view'}>
      <a className="card-view" href={link} target="_blank">
        {false ? (
          <ReactPlayer
            className="previewVideo"
            url={previewVideo.file.url}
            playing={true}
            volume={0}
            // height={200}
            fallback={previewImage}
          />
        ) : (
          previewImage
        )}
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
