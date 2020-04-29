import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { garageCarSelector, trackSelector } from '../state/selectors';

const NotificationsPastRace = ({ pastRace, onClose }) => {
  const location = useLocation();
  const history = useHistory();
  const reward = pastRace?.reward;
  const position = pastRace?.position;

  const car = useSelector(garageCarSelector(pastRace.car));
  const track = useSelector(trackSelector(pastRace.track));

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
    <Box
      onClick={onClick}
      w="100%"
      h="48px"
      padding="0 8px"
      border="1px solid gray"
      borderRadius="4px"
      marginTop="4px"
      fontSize="14px"
    >
      <Flex justifyContent="space-between" h="24px">
        <Text>${reward}</Text>
        <Text>{track.name}</Text>
      </Flex>
      <Flex justifyContent="space-between" h="24px">
        <Text>Position: {position}</Text>
        <Text>{car.name}</Text>
      </Flex>
    </Box>
  );
};

export default NotificationsPastRace;
