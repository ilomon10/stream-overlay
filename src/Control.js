import React from 'react';
import LowerThirdControl from './control/lowerThird';
import RunningTextControl from './control/runningText';
import { Tabs, Tab } from '@blueprintjs/core';

function Control() {
  return (
    <div className="panel">
      <Tabs defaultSelectedTabId={"rtc"}>
        <Tab id="ltc" title="Lower Third" panel={<LowerThirdControl />} />
        <Tab id="rtc" title="Running Text" panel={<RunningTextControl />} />
      </Tabs>
    </div>
  );
}

export default Control;
