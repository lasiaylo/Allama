import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { IWork } from '../util/page/IndexUtils';
import NoiseTransition from './noiseTransition';
import ReactPlayer from 'react-player';
import '../styles/components/s_worksView.scss';

export default function WorksView(work: React.PropsWithChildren<IWork>) {
  const { link, previewVideo, previewImage, name, description, id } = work;

  const fallback = previewImage ? (
    <GatsbyImage className="preview" alt="" image={previewImage.image} />
  ) : (
    <></>
  );
  return (
    <div className={'works-view'}>
      <a className="card-view" href={link} target="_blank">
        {previewVideo ? (
          <ReactPlayer
            className="previewVideo"
            url={previewVideo.file.url}
            playing={true}
            volume={0}
            loop={true}
            // height={200}
            fallback={fallback}
          />
        ) : (
          fallback
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
