import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CardProgressCircle from './CardProgressCircle';
import { colors } from '../helpers/theme';
import Button from './Button';
import { useGarageCar } from '../helpers/hooksGarage';
import { useRace, useTrack } from '../helpers/hooksRace';
import { useHistoryHelper } from '../helpers/hooks';

const NotificationsActiveRace = ({ race, onClose }) => {
  const location = useLocation();
  const history = useHistoryHelper();

  const currentRace = useRace(race);
  const car = useGarageCar(currentRace.car);
  const track = useTrack(currentRace.track);

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
