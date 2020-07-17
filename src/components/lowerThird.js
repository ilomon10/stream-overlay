import React, { useState, useMemo, useEffect } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import styled from 'styled-components';
import LowerThirdTemplate from './template/Two';

const Component = ({ className }) => {
  const [input, setInput] = useState({ title: "Lower Third", subtitle: "Narasumber" });
  const [isHide, setIsHide] = useState(false);
  const [options, setOptions] = useState({
    paddingBottom: 36
  })
  const channel = useMemo(() => new BroadcastChannel('lowerThird'), []);
  const channelState = useMemo(() => new BroadcastChannel('lowerThirdState'), []);
  const channelOptions = useMemo(() => new BroadcastChannel('lowerThirdOptions'), []);
  useEffect(() => {
    channel.onmessage = msg => {
      setInput(msg);
    }
    channelState.onmessage = msg => {
      setIsHide(msg);
    }
    channelOptions.onmessage = msg => {
      setOptions(msg);
    }
    return () => {
      channelOptions.close();
      channelState.close();
      channel.close();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <LowerThirdTemplate input={input} isHide={isHide} options={options} />
  )
}

const LowerThird = styled(Component)`

`

export default LowerThird;