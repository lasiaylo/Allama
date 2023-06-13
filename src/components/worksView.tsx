import * as React from 'react';
import { useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import '../styles/components/worksView.scss';
import { animated, useSpringRef, useTransition } from 'react-spring';
import { IWork } from '../util/page/IndexUtils';
import Noise from './noise';

export default function WorksView(work: React.PropsWithChildren<IWork>) {
  const transRef = useSpringRef();
  useEffect(() => {
    transRef.start();
  }, [work.name]);
  const transition = useTransition(work, {
    ref: transRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition((style, item) => (
    <animated.div className={'works-view'} style={style}>
      <a className="card-view" href={item.link} target="_blank">
        <GatsbyImage className="preview" alt="" image={item.preview.image} />
      </a>
      <Noise>
        <h2>{item.name}</h2>
      </Noise>
      <Noise>
        <p>{item.description}</p>
      </Noise>
    </animated.div>
  ));
}
