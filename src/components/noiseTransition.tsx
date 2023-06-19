import * as React from 'react';
import { ReactNode, useState } from 'react';
import '../styles/components/noise.scss';
import { animated, SpringRef, to, useSpring } from 'react-spring';
import { easings } from '@react-spring/web';
import { isEmpty } from '../util/StringUtils';

interface INoise {
  springRef: SpringRef;
  component: ReactNode;
}

function NoiseItem({
  className,
  children,
  showing,
  id
}: React.PropsWithChildren<{
  className?: string;
  showing: boolean;
  id: string;
}>) {
  const fillConfig = {
    duration: 8000,
    progress: 0.6,
  };
  const emptyConfig = {
    duration: 2000,
    progress: 0.55,
    easing: easings.easeInCubic,
  };

  const [{contrast, brightness, opacity}] = useSpring(() => ({
    from:  { brightness: 9000, contrast: 0, opacity: 50.5 },
    to: { brightness: 100000, contrast: 180, opacity: 100 },
    reverse: !showing,
    config: showing ? fillConfig : emptyConfig,
    reset: true,
  }), [id]);

  return (
    <animated.div
      className={'noise-item'}
      style={{
        filter: to(
          [contrast, brightness, opacity],
          (c, b, o) => `contrast(${c}%) brightness(${b}%) opacity(${o}%)`
        ),
      }}
    >
      {children}
    </animated.div>
  );
}

export default function NoiseTransition({
  children,
  className,
  id,
}: React.PropsWithChildren<{ className?: string; id: string }>) {
  const [prev, setPrev] = useState<ReactNode>(null);
  const [curr, setCurr] = useState<ReactNode>(null);
  const [prevID, setPrevID] = useState<string>('');
  const [currID, setCurrID] = useState<string>('');

  if (currID !== id) {
    if (!isEmpty(currID)) {
      setPrev(curr);
      setPrevID(currID);
    }
    setCurrID(id);
    setCurr(children);
  }
  return (
    <div className='noise-transition'>
      {prev && (
        <NoiseItem
          className={className}
          showing={false}
          id={prevID}
        >
          {prev}
        </NoiseItem>
      )}
      <NoiseItem
        className={'curr start'}
        showing={true}
        id={currID}
      >
        {curr}
      </NoiseItem>
    </div>
  );
}
