import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Component = ({ ...props }) => {
  const [time, setTime] = useState();
  const thick = useCallback(() => {
    setTime(moment().format('h:mm:ss a'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    thick();
    const thickInterval = setInterval(
      () => {
        thick();
      }, 1000);
    return () => {
      clearInterval(thickInterval);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div {...props}>{time}</div>
  )
}

const EXPTime = styled(Component)`

`

export default EXPTime;