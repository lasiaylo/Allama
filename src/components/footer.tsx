import ReactPlayer from 'react-player';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

export default function Footer({ url }: { url: string }) {
  const videoRef = useRef();
  const [play, setPlay] = useState(false);
  let timer = setTimeout(() => setPlay(false), 200);
  useEffect(() => {
    addEventListener('mousemove', (event) => {
      setPlay(true);
      clearTimeout(timer);
      timer = setTimeout(() => setPlay(false), 200);
    });
  });
  return (
    <div className="footer">
      <ReactPlayer
        // @ts-ignore
        ref={videoRef}
        className="chatbox-video"
        url={url}
        playing={play}
        playbackRate={2}
        volume={0}
        width={140}
        height={140}
      />
    </div>
  );
}
