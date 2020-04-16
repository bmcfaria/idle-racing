import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex,
} from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { endRaceAction } from '../state/actions';

const CardProgressOverlay = ({ race, label, big, ...props }) => {
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
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      bg="blackAlpha.800"
      flexDirection="column"
      {...props}
    >
      <Flex direction="column" margin="auto">
        <CircularProgress
          value={progress > 100 ? 100 : progress}
          color="blue"
          trackColor="blackAlpha"
          marginLeft="auto"
          marginRight="auto"
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
            ({race.name})
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default CardProgressOverlay;
