import React, { useState, useEffect, useMemo } from 'react';
import { InputGroup, ButtonGroup, FormGroup, H5, Button } from '@blueprintjs/core';
import { BroadcastChannel } from 'broadcast-channel';
import _findIndex from 'lodash.findindex';

function Control() {
  const [list, setList] = useState([
    { title: "Lorem Ipsum 1", subtitle: "Narasumber" },
    { title: "Lorem Ipsum 2", subtitle: "Narasumber" }
  ]);
  const [bookmark, setBookmark] = useState([]);
  const [isHide, setIsHide] = useState(true);
  const [input, setInput] = useState({ title: "", subtitle: "" });
  const channel = useMemo(() => new BroadcastChannel('lowerThird'), []);
  const channelLTState = useMemo(() => new BroadcastChannel('lowerThirdState'), []);

  useEffect(() => {
    if (localStorage.getItem('SO-lowerThirdBookmark') === null) localStorage.setItem('SO-lowerThirdBookmark', JSON.stringify([]));
    let bm = localStorage.getItem('SO-lowerThirdBookmark');
    setBookmark(JSON.parse(bm));
  }, []);

  useEffect(() => {
    localStorage.setItem('SO-lowerThirdBookmark', JSON.stringify(bookmark));
  }, [bookmark])

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
          if (isHide) {
            channelLTState.postMessage(!isHide);
            setIsHide(!isHide);
          }
          if (_findIndex(list, input) !== -1) return;
          setList([input, ...list])
        }} />
        <Button text={isHide ? "Show" : "Hide"} onClick={() => {
          channelLTState.postMessage(!isHide);
          setIsHide(!isHide);
        }} />
        <Button text={"Save"} onClick={() => {
          if (!input.title || !input.subtitle) return;
          if (_findIndex(bookmark, input) !== -1) return;
          setBookmark([...bookmark, input]);
        }} />
      </div>
      <div>
        <H5>Bookmark</H5>
        {bookmark.map((v, i) => (
          <ButtonGroup key={i} fill>
            <Button text={`${v.title} - ${v.subtitle}`}
              onClick={() => { setInput(v) }} />
            <Button intent="danger" icon="trash" onClick={() => {
              let bm = [...bookmark];
              bm.splice(i, 1);
              setBookmark(bm);
            }} />
          </ButtonGroup>
        ))}
        <H5>History</H5>
        {list.map((v, i) => (
          <ButtonGroup key={i} fill>
            <Button
              onClick={() => { setInput(v) }}
              text={`${v.title} - ${v.subtitle}`} />
            <Button icon="bookmark" intent="success" onClick={() => {
              if (_findIndex(bookmark, v) !== -1) return;
              setBookmark([...bookmark, v])
            }} />
          </ButtonGroup>
        ))}
      </div>
    </div>
  );
}

export default Control;
