import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import '../styles/components/s_noise.scss';
import { animated, SpringRef, to, useSpring, useSpringRef } from 'react-spring';
import classNames from 'classnames';
import { isEmpty } from '../util/StringUtils';

export const empty = { brightness: 9000, contrast: 0, opacity: 50.5 };
export const full = { brightness: 100000, contrast: 180, opacity: 100 };

export const emptyConfig = {
  duration: 2000,
  progress: 0.3,
};

export const fullConfig = {
  duration: 6000,
  progress: 0.6,
};

export const hoverConfig ={

}

function NoiseItem({
  children,
  showing,
  springRef,
  active,
  invert,
  className,
}: React.PropsWithChildren<{
  showing: boolean;
  springRef: SpringRef;
  active?: boolean;
  invert?: boolean;
  className?: string;
}>) {
  const { contrast, brightness, opacity } = useSpring({
    ref: springRef,
    from: empty,
    to: full,
    reverse: !showing,
    config: showing ? fullConfig : emptyConfig,
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
      data-active={active}
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
  const hoverRef = useSpringRef();

  const setHover = (a: boolean) => {
    if (isHoverable) {
      setActive(a)
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
          className={classNames('noise-prev', className)}
          showing={false}
          springRef={ref}
        >
          {prev}
        </NoiseItem>
      )}
      <NoiseItem
        className={classNames('noise-curr', className)}
        showing={true}
        springRef={ref}
        active={active}
        invert={active}
      >
        {curr}
      </NoiseItem>
      <NoiseItem
        className={'beep-boop'}
        showing={active}
        springRef={ref}
        active={active}
      />
    </div>
  );
}
