import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex,
} from '@chakra-ui/core';

const CardProgressOverlay = ({ race, label, big, ...props }) => {
  const [value, setValue] = useState(race.duration);
  const progress = ((race.duration - value) * 100) / race.duration;
  console.log(progress);

  useEffect(() => {
    const countDown = setInterval(() => {
      const nextValue = race.duration - (new Date().getTime() - race.start);
      if (nextValue <= 0) {
        clearInterval(countDown);
      }

      setValue(nextValue);
    }, 500);

    return () => {
      clearInterval(countDown);
    };
  }, [race]);

  if (!race) {
    return null;
  }

  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      bg="blackAlpha.800"
      flexDirection="column"
      {...props}
    >
      <Box margin="auto">
        <CircularProgress
          value={progress > 100 ? 100 : progress}
          color="blue"
          trackColor="blackAlpha"
          size={big ? '10rem' : '4rem'}
        >
          {
            <CircularProgressLabel color="white">
              {Math.round(value / 1000)}s
            </CircularProgressLabel>
          }
        </CircularProgress>
        {label && (
          <Text color="white" ontSize="sm">
            ({label})
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default CardProgressOverlay;
