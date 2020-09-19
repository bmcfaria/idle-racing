import React, { useEffect, useState } from 'react';
import { CircularProgressLabel, Box, Text } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { CustomCircularProgress } from './CustomCircularProgress';
import { formatDuration } from '../helpers/utils';

const CardProgressCircle = ({
  race,
  textColor = 'black',
  showSeconds,
  ...props
}) => {
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

  const normalizedValue = value < 0 ? 0 : value;

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
          <Box>
            <Text>{formatDuration(normalizedValue)}</Text>
            {showSeconds && normalizedValue > 60 * 1000 && (
              <Text fontSize="16px">({~~(normalizedValue / 1000)}s)</Text>
            )}
          </Box>
        </CircularProgressLabel>
      }
    </CustomCircularProgress>
  );
};

export default CardProgressCircle;
