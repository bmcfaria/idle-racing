import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  raceSelector,
  garageCarSelector,
  trackSelector,
} from '../state/selectors';
import CardProgressCircle from './CardProgressCircle';
import { colors } from '../helpers/theme';
import Button from './Button';

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
    <Button
      borderBottom="solid 1px black"
      onClick={onClick}
      w="100%"
      h="48px"
      border={`2px solid ${colors.orange}`}
      borderRadius="4px"
      marginTop="4px"
      padding="0"
      bg={colors.white}
    >
      <CardProgressCircle
        margin="auto 0"
        size="40px"
        color="black"
        race={currentRace}
      />
      <Box flexGrow="1" textAlign="center" fontSize="16px">
        <Text>{car.name}</Text>
        <Text>{track.name}</Text>
      </Box>
    </Button>
  );
};

export default NotificationsActiveRace;
