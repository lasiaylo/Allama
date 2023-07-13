import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import '../styles/components/s_noise.scss';
import {
  animated,
  SpringConfig,
  SpringRef,
  to,
  useSpring,
  useSpringRef,
} from 'react-spring';
import classNames from 'classnames';
import { isEmpty } from '../util/StringUtils';

const empty = { brightness: 9000, contrast: 0, opacity: 50.5 };
const full = { brightness: 100000, contrast: 180, opacity: 95 };

const emptyConfig = {
  duration: 6000,
  progress: 0.3,
};

const fillConfig = {
  duration: 10000,
  progress: 0.6,
};

function NoiseItem({
  springRef,
  showing,
  className,
  children,
}: React.PropsWithChildren<{
  springRef: SpringRef;
  showing: boolean;
  config?: SpringConfig;
  invert?: boolean;
  className?: string;
}>) {
  const springConfig = showing ? fillConfig : emptyConfig;
  const { contrast, brightness, opacity } = useSpring({
    ref: springRef,
    from: empty,
    to: full,
    reverse: !showing,
    config: springConfig,
    reset: true,
  });

  return (
    <animated.div
      className={classNames('noise-item', className)}
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
  id,
  className,
  children,
}: React.PropsWithChildren<{
  id: string;
  isHoverable?: boolean;
  className?: string;
}>) {
  const [prev, setPrev] = useState<ReactNode>(null);
  const [curr, setCurr] = useState<ReactNode>(children);
  const [currID, setCurrID] = useState<string>(id);
  const ref = useSpringRef();

  useEffect(() => {
    ref.start();
  }, [id]);

  if (currID !== id) {
    if (!isEmpty(currID)) {
      setPrev(curr);
    }
    setCurrID(id);
    setCurr(children);
  }

  return (
    <div
      className="noise-transition"
    >
      {prev && (
        <NoiseItem
          springRef={ref}
          className={classNames('noise-prev', className)}
          showing={false}
        >
          {prev}
        </NoiseItem>
      )}
      <NoiseItem
        springRef={ref}
        className={classNames('noise-curr', className)}
        showing={true}
      >
        {curr}
      </NoiseItem>
    </div>
  );
}
