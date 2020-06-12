import React, { useState, useEffect, useMemo } from 'react';
import { InputGroup, ButtonGroup, Menu, FormGroup, MenuDivider, Button } from '@blueprintjs/core';
import { BroadcastChannel } from 'broadcast-channel';

function Control() {
  const [list, setList] = useState([
    { title: "Lorem Ipsum 1", subtitle: "Narasumber" },
    { title: "Lorem Ipsum 2", subtitle: "Narasumber" }
  ]);
  const [isHide, setIsHide] = useState(true);
  const [input, setInput] = useState({ title: "", subtitle: "" });
  const channel = useMemo(() => new BroadcastChannel('lowerThird', []));
  const channelLTState = useMemo(() => new BroadcastChannel('lowerThirdState', []));

  useEffect(() => {
    if (list.length >= 10)
      setList(() => {
        const ret = [...list];
        ret.pop();
        return ret;
      });
  }, [list]);
  return (
    <div className="panel">
      <div>
        <FormGroup
          label="Title"
          labelFor="title-input">
          <InputGroup id="title-input" value={input.title} onChange={e => {
            setInput({ ...input, title: e.target.value });
          }} />
        </FormGroup>
        <FormGroup
          label="Subtitle"
          labelFor="subtitle-input">
          <InputGroup id="subtitle-input" value={input.subtitle} onChange={e => {
            setInput({ ...input, subtitle: e.target.value });
          }} />
        </FormGroup>
        <Button intent="primary" text="Publish" onClick={() => {
          channel.postMessage(input);
          if(isHide) {
            channelLTState.postMessage(!isHide);
            setIsHide(!isHide);
          }
          if (list[0] === input) return;
          setList([input, ...list])
        }} />
        <Button text={isHide ? "Show" : "Hide"} onClick={
          () => {
            channelLTState.postMessage(!isHide);
            setIsHide(!isHide);
          }
        } />
      </div>
      <div>
        <Menu>
          <MenuDivider title="History" />
          {list.map((v, i) => (
            <Menu.Item key={i}
              onClick={() => { setInput(v) }}
              text={`${v.title} - ${v.subtitle}`} />
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default Control;
