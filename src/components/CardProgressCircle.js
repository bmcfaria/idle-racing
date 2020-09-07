import React, { useEffect, useState } from 'react';
import { CircularProgressLabel } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { CustomCircularProgress } from './CustomCircularProgress';
import { formatDuration } from '../helpers/utils';

const CardProgressCircle = ({ race, textColor = 'black', ...props }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(race.duration);
  const progress = ((race.duration - value) * 100) / race.duration;

  useEffect(() => {
    const countDown = setInterval(() => {
      const nextValue = race.duration - (new Date().getTime() - race.start);
      if (nextValue <= 0) {
        clearInterval(countDown);
      }

      setValue(nextValue);
    }, 250);

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
          {formatDuration(value, value / 1000 / 60 > 1 ? 1 : 0)}
        </CircularProgressLabel>
      }
    </CustomCircularProgress>
  );
};

export default CardProgressCircle;
