import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { IWork } from '../util/page/IndexUtils';
import NoiseTransition from './noiseTransition';
import ReactPlayer from 'react-player';
import '../styles/components/s_worksView.scss';
import { animated, useTransition } from 'react-spring';

export default function WorksView(work: React.PropsWithChildren<IWork>) {
  const { link, previewVideo, previewImage, name, description, id } = work;

  const fallback = previewImage ? (
    <GatsbyImage className="preview" alt="" image={previewImage.image} />
  ) : (
    <></>
  );

  const transition = useTransition(previewVideo.file.url, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      mass: 2,
      tension: 100,
      friction: 60,
      clamp: true,
    },
  });

  const cardView = transition((style, item) => (
    <animated.a className="card-view" href={link} target="_blank" style={style}>
      {previewVideo ? (
        <ReactPlayer
          className="player"
          width="100%"
          height="100%"
          url={item}
          playing={true}
          volume={0}
          loop={true}
          fallback={fallback}
        />
      ) : (
        fallback
      )}
    </animated.a>
  ));

  return (
    <div className={'works-view'}>
      <div className={'card'}>{cardView}</div>
      <NoiseTransition id={id}>
        <h2>{name}</h2>
      </NoiseTransition>
      <NoiseTransition id={id}>
        <p>{description}</p>
      </NoiseTransition>
    </div>
  );
}
