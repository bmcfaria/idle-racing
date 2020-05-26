import React, { useEffect, useState } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { endRaceAction } from '../state/actions';
import styled from '@emotion/styled';
import { colors } from '../helpers/theme';

const CustomCircularProgress = styled(CircularProgress)`
  circle {
    color: transparent;
  }
  circle:nth-of-type(2) {
    color: ${colors.blue};
  }
`;

const CardProgressCircle = ({ race, textColor = 'black', ...props }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(race.duration);
  const progress = ((race.duration - value) * 100) / race.duration;

  useEffect(() => {
    const countDown = setInterval(() => {
      const nextValue = race.duration - (new Date().getTime() - race.start);
      if (nextValue <= 0) {
        clearInterval(countDown);
        dispatch(endRaceAction(race.id));
      }

      setValue(nextValue);
    }, 500);

    return () => {
      clearInterval(countDown);
    };
  }, [dispatch, race]);

  if (!race) {
    return null;
  }

  return (
    <CustomCircularProgress
      value={progress > 100 ? 100 : progress}
      trackColor="transparent"
      size="4rem"
      capIsRound
      {...props}
    >
      {
        <CircularProgressLabel color={textColor}>
          {Math.round(value / 1000)}s
        </CircularProgressLabel>
      }
    </CustomCircularProgress>
  );
};

export default CardProgressCircle;
