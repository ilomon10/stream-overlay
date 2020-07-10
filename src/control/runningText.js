import React, { useMemo, useState, useEffect } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import styled from 'styled-components';
import { CompactPicker } from 'react-color';
import { Button, FormGroup, TextArea, NumericInput, Divider, H5, ButtonGroup, HTMLSelect } from '@blueprintjs/core';

const Component = ({ className }) => {
  const [text, setText] = useState(`Running Text`);
  const [isHide, setIsHide] = useState(false);
  const [options, setOptions] = useState({
    direction: 'left',
    speed: 0.03,
    paddingBottom: 36,
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
    channelState.postMessage(isHide);
  }, [isHide]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={className}>
      <FormGroup
        label="Text"
        labelFor="text-input">
        <TextArea id="text-input" value={text}
          growVertically fill
          onChange={e => {
            setText(e.target.value);
          }} />
      </FormGroup>
      <Button intent="primary" text="Publish"
        onClick={() => {
          channel.postMessage(text);
          channelOptions.postMessage(options);
          setIsHide(false);
        }} />
      <Button text={isHide ? "Show" : "Hide"}
        onClick={() => {
          setIsHide(!isHide);
        }} />
      <Divider />
      <H5>Options</H5>
      <FormGroup
        label="Direction">
        <ButtonGroup>
          <Button active={options.direction === 'right'} text="Right"
            onClick={() => {
              setOptions((opt) => ({
                ...opt, direction: 'right'
              }))
            }} />
          <Button active={options.direction === 'left'} text="Left"
            onClick={() => {
              setOptions((opt) => ({
                ...opt, direction: 'left'
              }))
            }} />
        </ButtonGroup>
      </FormGroup>
      <FormGroup
        label="Speed">
        <NumericInput fill
          onValueChange={(v) => {
            setOptions(opt => ({
              ...opt, speed: v
            }))
          }}
          minorStepSize={0.01}
          stepSize={0.01} min={0} max={0.15}
          value={options.speed} />
      </FormGroup>
      <FormGroup
        label="Padding Bottom">
        <NumericInput fill
          onValueChange={(v) => {
            setOptions((opt) => ({
              ...opt, paddingBottom: v
            }))
          }}
          min={0} max={50}
          value={options.paddingBottom} />
      </FormGroup>
      <FormGroup
        label="Text Size">
        <NumericInput fill
          onValueChange={(v) => {
            setOptions((opt) => ({
              ...opt, textSize: v
            }))
          }}
          min={14} max={40}
          value={options.textSize} />
      </FormGroup>
      <FormGroup
        label="Text Weight">
        <HTMLSelect fill
          options={[
            'normal',
            'bold'
          ]}
          value={options.textWeight}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            setOptions((opt) => ({
              ...opt,
              textWeight: value
            }))
          }} />
      </FormGroup>
      <FormGroup
        label="Text Stroke">
        <NumericInput fill
          onValueChange={(v) => {
            setOptions((opt) => ({
              ...opt, textStroke: v
            }))
          }}
          stepSize={0.1} min={0} max={5}
          value={options.textStroke} />
      </FormGroup>
      <FormGroup
        label="Text Color">
        <CompactPicker
          color={options.textColor}
          onChange={(e) => setOptions((opt) => ({
            ...opt,
            textColor: e.hex
          }))} />
      </FormGroup>
      <FormGroup
        label="Text Stroke Color">
        <CompactPicker
          color={options.textStrokeColor}
          onChange={(e) => setOptions((opt) => ({
            ...opt,
            textStrokeColor: e.hex
          }))} />
      </FormGroup>
    </div>
  )
}

const RunningTextControl = styled(Component)`

`

export default RunningTextControl;