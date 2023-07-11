import * as React from 'react';
import { ReactNode, useEffect, useRef, useState } from 'react';
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

const hoverConfig = {
  duration: 4000,
  progress: 0.6,
};

const hoverEmptyConfig = {
  duration: 1250,
  progress: 0,
};

const textHoverConfig = {
  duration: 3000,
  progress: 0.5,
};

const emptyConfig = {
  duration: 4000,
  progress: 0.3,
};

const fullConfig = {
  duration: 12000,
  progress: 0.6,
};

function NoiseItem({
  springRef,
  showing,
  config,
  invert,
  className,
  children,
}: React.PropsWithChildren<{
  springRef: SpringRef;
  showing: boolean;
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
  isActive = false,
  isHoverable = false,
  className,
  children,
}: React.PropsWithChildren<{
  id: string;
  isActive?: boolean;
  isHoverable?: boolean;
  className?: string;
}>) {
  const showHover = useRef<boolean>(isActive);
  const [active, setActive] = useState<boolean>(isActive ?? false);
  const [prev, setPrev] = useState<ReactNode>(null);
  const [curr, setCurr] = useState<ReactNode>(children);
  const [currID, setCurrID] = useState<string>(id);
  const ref = useSpringRef();
  const hoverRef = useSpringRef();
  const setHover = (a: boolean) => {
    if (isHoverable) {
      setActive(a || isActive);
    }
  };

  useEffect(() => {
    ref.start();

    // Play the hover transition only after the first render
    if (active) {
      showHover.current = true;
    }
    if (showHover.current) {
      hoverRef.start();
    }
  }, [id, active]);

  useEffect(() => {
    if (isActive != undefined && isActive !== active) {
      setActive(isActive);
    }
  }, [isActive]);

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
      {prev && !active && (
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
        showing={true}
        invert={active}
      >
        {curr}
      </NoiseItem>
      <NoiseItem
        springRef={hoverRef}
        className={'noise-indicator'}
        config={active ? hoverConfig : hoverEmptyConfig}
        showing={showHover.current ? active : true}
      />
    </div>
  );
}
