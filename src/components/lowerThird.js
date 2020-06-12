import React, { useState, useMemo, useEffect } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import styled, { keyframes } from 'styled-components';
import { Colors } from '@blueprintjs/core';

const Component = ({ className, hide }) => {
  const [input, setInput] = useState({ title: "Lower Third", subtitle: "Narasumber" });
  const channel = useMemo(() => new BroadcastChannel('lowerThird', []));
  useEffect(() => {
    channel.onmessage = msg => {
      setInput(msg);
    }
    return channel.close;
  }, []);
  return (
    <div className={`${className} flex flex--i-center ${hide ? 'hide' : ''}`}>
      <div className="logo">

      </div>
      <div className="wrapper">
        <div className="wrapper">
          <div className="title">
            <div className="text">{input.title}</div>
          </div>
        </div>
        <div className="wrapper">
          <div className="subtitle">
            <div className="text">{input.subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


const logoInKeyframe = keyframes`
  0% {
    transform: translateY(150%);
  }
  30% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
`

const titleInKeyframe = keyframes`
  0% {
    transform: translateX(-200%);
  }
  20% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0%);
  }
`
const subtitleInKeyframe = keyframes`
  0% {
    transform: translateX(-250%);
  }
  20% {
    transform: translateX(-250%);
  }
  100% {
    transform: translateX(0%);
  }
`

const logoOutKeyframe = keyframes`
  0% {
    transform: translateY(0%);
  }
  80% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(150%);
  }
`
const titleOutKeyframe = keyframes`
  0% {
    transform: translateX(0%);
  }
  80% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(-200%);
  }
`
const subtitleOutKeyframe = keyframes`
  0% {
    transform: translateX(0%);
  }
  80% {
    transform: translateX(-250%);
  }
  100% {
    transform: translateX(-250%);
  }
`

const LowerThird = styled(Component)`
  padding-left: 23px;
  padding-bottom: 24px;
  overflow: hidden;
  &.hide {
    .logo {
      animation: ${logoOutKeyframe} 1s;
      transition-delay: transform 1s;
      transform: translateY(150%);
    }
    .title {
      animation: ${titleOutKeyframe} 1s;
      transition-delay: transform 1s;
      transform: translateX(-200%);
    }
    .subtitle {
      animation: ${subtitleOutKeyframe} 1s;
      transition-delay: transform 1s;
      transform: translateX(-250%);
    }
  }
  & .logo {
    width: 130px;
    height: 130px;
    background-color: white;
    border-radius: 50%;
    animation: ${logoInKeyframe} 1s;
  }
  & .title {
    margin-left: -45px;
    font-size: 36px;
    min-width: 250px;
    padding-left: 24px;
    background-color: white;
    border-radius: 36px;
    color: ${Colors.DARK_GRAY5};
    animation: ${titleInKeyframe} 1s;
    > .text {
      padding: 8px 36px;
    }
  }
  & .subtitle {
    min-width: 135px;
    display: inline-block;
    text-align: center;
    font-size: 16px;
    margin-left: -16px;
    margin-top: -4px;
    background-color: ${Colors.VIOLET3};
    border-radius: 24px;
    color: ${Colors.WHITE};
    font-weight: bold;
    animation: ${subtitleInKeyframe} 1s;
    > .text {
      padding: 4px 16px;
    }
  }
`

export default LowerThird;