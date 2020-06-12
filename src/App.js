import React, { useState, useEffect, useMemo } from 'react';
import './flexbox.css';
import LowerThird from './components/lowerThird';
import { Colors, Button } from '@blueprintjs/core';

function App() {
  const [isDev] = useState(true);
  const [isHide, setIsHide] = useState(true);
  const channel = useMemo(() => new BroadcastChannel('lowerThirdState', []));
  useEffect(() => {
    channel.onmessage = msg => {
      setIsHide(msg.data.data);
    }
    return channel.close;
  }, []);
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: isDev ? Colors.DARK_GRAY3 : 'transparent'
    }}>
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <Button text={isHide ? "show" : "hide"} onClick={() => setIsHide(!isHide)} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}>
        <LowerThird hide={isHide} />
      </div>
    </div>
  );
}

export default App;
