import React, { useEffect, useState } from 'react';
import { CircularProgressLabel, Box, Text } from '@chakra-ui/core';
import { CustomCircularProgress } from './CustomCircularProgress';
import { formatDuration } from '../helpers/utils';
import { useRaceDurationWithDiscount } from '../helpers/hooks';

const CardProgressCircle = ({
  race,
  textColor = 'black',
  showSeconds,
  ...props
}) => {
  const calculatedDuration = useRaceDurationWithDiscount(race.duration);
  const [value, setValue] = useState(calculatedDuration);
  const progress = ((calculatedDuration - value) * 100) / calculatedDuration;

  useEffect(() => {
    const countDown = setInterval(() => {
      const nextValue =
        calculatedDuration - (new Date().getTime() - race.start);
      if (nextValue <= 0) {
        clearInterval(countDown);
      }

      setValue(nextValue);
    }, 250);

    return () => {
      clearInterval(countDown);
    };
  }, [calculatedDuration, race]);

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
