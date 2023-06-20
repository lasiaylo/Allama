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
import _ from 'lodash';

const empty = { brightness: 9000, contrast: 0, opacity: 50.5 };
const full = { brightness: 100000, contrast: 180, opacity: 100 };

const hoverConfig = {
  duration: 1000,
  progress: 0.6,
};

const hoverEmptyConfig = {
  duration: 1000,
  progress: 0,
};


const textHoverConfig = {
  duration: 3000,
  progress: 0.5,
};

const emptyConfig = {
  duration: 2000,
  progress: 0.3,
};

const fullConfig = {
  duration: 6000,
  progress: 0.6,
};


function NoiseItem({
  springRef,
  showing,
  active,
  config,
  invert,
  className,
  children,
}: React.PropsWithChildren<{
  springRef: SpringRef;
  showing: boolean;
  active?: boolean;
  config?: SpringConfig;
  invert?: boolean;
  className?: string;
}>) {
  const springConfig = config ?? (showing ? fullConfig : emptyConfig);
  const { contrast, brightness, opacity } = useSpring({
    ref: springRef,
    from: empty,
    to: full,
    reverse: !showing,
    config: springConfig,
    onStart: () => {
      if (_.isEqual(config, hoverEmptyConfig)) {
        console.log(showing)
      }
    },
    reset: true,
  });

  return (
    <animated.div
      className={classNames('noise-item', className)}
      style={{
        filter: to(
          [contrast, brightness, opacity],
          (c, b, o) =>
            `contrast(${c}%) brightness(${b}%) opacity(${o}%) invert(${
              invert ? 1 : 0
            }`
        ),
      }}
    >
      {children}
    </animated.div>
  );
}

export default function NoiseTransition({
  id,
  isActive,
  isHoverable,
  className,
  children,
}: React.PropsWithChildren<{
  id: string;
  isActive?: boolean;
  isHoverable?: boolean;
  className?: string;
}>) {
  const [active, setActive] = useState<boolean>(isActive ?? false);
  const [prev, setPrev] = useState<ReactNode>(null);
  const [curr, setCurr] = useState<ReactNode>(null);
  const [currID, setCurrID] = useState<string>('');
  const ref = useSpringRef();

  const setHover = (a: boolean) => {
    if (isHoverable) {
      setActive(a);
    }
  };

  useEffect(() => {
    ref.start();
  }, [id, active]);

  if (isActive && isActive !== active) {
    setActive(isActive);
  }

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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {(prev || !active) && (
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
        config={active ? textHoverConfig : undefined}
        active={active}
        showing={true}
        invert={active}
      >
        {curr}
      </NoiseItem>
      <NoiseItem
        springRef={ref}
        className={'noise-indicator'}
        config={active ? hoverConfig : hoverEmptyConfig}
        active={active}
        showing={active}
      />
    </div>
  );
}
