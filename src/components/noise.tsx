import * as React from 'react';
import '../styles/components/noise.scss';

export default function Noise({ children }: React.PropsWithChildren) {
  return (
    <div className="isolate">
      <div className="noise"></div>
      <div className="children">{children}</div>
    </div>
  );
}
