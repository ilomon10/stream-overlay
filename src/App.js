import React, { useState } from 'react';
import './flexbox.css';
import LowerThird from './components/LowerThird';
import { Colors } from '@blueprintjs/core';
import RunningText from './components/RunningText';

function App() {
  const [isDev] = useState(false);
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: isDev ? Colors.GRAY1 : 'transparent'
    }}>
      <div style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
        <RunningText />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}>
        <LowerThird />
      </div>
    </div>
  );
}

export default App;
