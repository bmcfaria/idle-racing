import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import AttributeInfo from './AttributeInfo';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import { raceSelector } from '../state/selectors';
import { useSelector } from 'react-redux';

const CardCar = ({
  car: { id, name, type, image, acceleration, topSpeed, handling, race },
}) => {
  const location = useLocation();
  const history = useHistory();

  const currentRace = useSelector(raceSelector(race));

  // To improve mobile navigation,
  // this way the back button will un-select instead off showing the previous selected
  const setSelected = () => {
    if (currentRace) return;

    if (location?.state?.car) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), car: id },
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), car: id },
      });
    }
  };

  return (
    <Box w="16rem" position="relative" onClick={setSelected}>
      {location?.state?.car === id && (
        <Box position="absolute" w="100%" h="100%" bg="#B2F5EA77" />
      )}
      {currentRace && <CardProgressOverlay race={currentRace} label />}
      <Flex w="100%" padding="0.6rem 0.2rem" bg="white">
        <Box w="5rem">
          <Image w="100%" h="4.5rem" alt="car" bg="lightgray" src={image} />
          <Text textAlign="center" w="100%" fontSize="sm">
            Type: {type}
          </Text>
        </Box>
        <Box flexGrow="1" marginLeft="0.2rem">
          <Text textAlign="left" w="100%" fontSize="md">
            {name}
          </Text>
          <AttributeInfo
            name="Acceleration"
            value={acceleration.value}
            upgrade={acceleration.upgrade}
            max={acceleration.max}
          />
          <AttributeInfo
            name="Top Speed"
            value={topSpeed.value}
            upgrade={topSpeed.upgrade}
            max={topSpeed.max}
          />
          <AttributeInfo
            name="Handling"
            value={handling.value}
            upgrade={handling.upgrade}
            max={handling.max}
          />
        </Box>
      </Flex>
    </Box>
  );
};

CardCar.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {},
};

export default CardCar;
