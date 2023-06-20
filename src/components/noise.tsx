import * as React from 'react';
import '../styles/components/s_noise.scss';

export default function Noise({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={className}>
      <div className="isolate">
        <div className="noise">{children}</div>
      </div>
    </div>
  );
}
