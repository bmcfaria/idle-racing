import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  raceSelector,
  garageCarSelector,
  trackSelector,
} from '../state/selectors';
import CardProgressCircle from './CardProgressCircle';

const NotificationsActiveRace = ({ race, onClose }) => {
  const location = useLocation();
  const history = useHistory();

  const currentRace = useSelector(raceSelector(race));
  const car = useSelector(garageCarSelector(currentRace.car));
  const track = useSelector(trackSelector(currentRace.track));

  const onClick = () => {
    history.push({
      pathname: '/race',
      state: {
        ...(location.state || {}),
        track: track.id,
        car: car.id,
      },
    });

    onClose();
  };

  return (
    <Flex
      borderBottom="solid 1px black"
      onClick={onClick}
      w="100%"
      h="48px"
      border="1px solid black"
      borderRadius="4px"
      paddingLeft="8px"
      marginTop="4px"
    >
      <CardProgressCircle
        margin="auto 0"
        size="40px"
        color="black"
        race={currentRace}
      />
      <Box flexGrow="1" textAlign="center" fontSize="14px">
        <Text h="24px">{car.name}</Text>
        <Text h="24px">{track.name}</Text>
      </Box>
    </Flex>
  );
};

export default NotificationsActiveRace;
