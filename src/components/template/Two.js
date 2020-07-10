import React, { useState, useMemo, useEffect } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import styled, { keyframes } from 'styled-components';
import { Colors } from '@blueprintjs/core';
import logo from '../../asset/logo_wki.png';

const Component = ({ className, input, isHide, options }) => {
  return (
    <div className={`${className} flex flex--i-center ${isHide ? 'hide' : ''}`}
      style={{
        paddingBottom: options.paddingBottom
      }}>
      <div className="logo">
        <img alt="Logo" src={logo} />
      </div>
      <div className="wrapper">
        <div className="title-wrapper">
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

const LowerThird = styled(Component)`
  padding-left: 64px;
  position: relative;
  opacity: 1;
  transition: opacity 500ms ease;
  &.hide {
    opacity: 0;
  }
  > .logo {
    position: relative;
    z-index: 5;
    height: 100px;
    width: 100px;
    padding: 5px;
    background-color: white;
    border-radius: 50%;
    > img {
      height: 100%;
    }
  }
  > .wrapper {
    height: 100px;
    position: relative;
    z-index: 1;
    margin-left: -50px;
    display: flex;
    flex-direction: column;
    > .title-wrapper {
      flex-grow: 1;
    }
  }
  & .title {
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 250px;
    background-color: white;
    border-radius: 0 0 25px 0;
    > .text {
      padding-left: 12px;
      padding-right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }
  }
  & .subtitle {
    display: inline-block;
    background-color: #2c3e50;
    border-radius: 0 0 25px 0;
    > .text {
      padding-left: 12px;
      padding-right: 25px;
      margin-left: 50px;
      color: white;
      line-height: 34px;
      font-size: 18px;
      font-weight: bold;
    }
  }
`

export default LowerThird;