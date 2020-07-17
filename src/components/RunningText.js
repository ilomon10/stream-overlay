import React, { useMemo, useEffect, useState } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import styled from 'styled-components';
import Marquee from 'react-double-marquee';
import EXPTime from './exp.Time';

const Component = ({ className }) => {
  const [text, setText] = useState("Running Text");
  const [isHide, setIsHide] = useState(false);
  const [options, setOptions] = useState({
    direction: 'left',
    speed: 0.03,
    paddingBottom: 36,
    childMargin: 100,
    textSize: 24,
    textWeight: 'normal',
    textStroke: 0,
    textColor: '#000',
    textStrokeColor: '#000',
  });
  const channel = useMemo(() => new BroadcastChannel('runningText'), []);
  const channelState = useMemo(() => new BroadcastChannel('runningTextState'), []);
  const channelOptions = useMemo(() => new BroadcastChannel('runningTextOption'), []);
  useEffect(() => {
    channel.onmessage = msg => {
      setText(msg);
    }
    channelState.onmessage = msg => {
      setIsHide(msg);
    }
    channelOptions.onmessage = msg => {
      setOptions(msg);
    }
    return () => {
      channel.close();
      channelState.close();
      channelOptions.close();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={className} style={{
      paddingBottom: options.paddingBottom,
      fontSize: options.textSize,
      fontWeight: options.textWeight,
      color: options.textColor,
      lineHeight: `${options.textSize + 10}px`,
      WebkitTextStrokeWidth: options.textStroke,
      WebkitTextStrokeColor: options.textStrokeColor
    }}>
      {!isHide &&
        <>
          <Marquee
            direction={options.direction}
            speed={options.speed}
            delay={1000}
            childMargin={options.childMargin}>{text}</Marquee>
          <EXPTime />
        </>}
    </div>
  )
}

const RunningText = styled(Component)`
  position: relative;
  white-space: nowrap;
  width: 100%;
  > div {
    overflow-y: hidden;
  }
  > ${EXPTime} {
    -webkit-text-stroke: 0;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 75%; 
    color: white;
    padding: 2px 16px;
    padding-right: 64px;
    background-color: #7B64FF;
    border-radius: 0 0 0 25px;
  }
`

export default RunningText;