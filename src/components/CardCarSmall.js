import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import AttributeInfo from './AttributeInfo';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import { raceSelector, tracksSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import { winProbability } from '../helpers/utils';

const colors = {
  green: '#00FF479E',
  yellow: '#FFF5009E',
  red: '#FF00009E',
  gray: '#9B9B9B9E',
};

const winningChances = {
  0: { text: 'BAD', color: colors.red },
  1: { text: 'MAYBE', color: colors.yellow },
  2: { text: 'AVERAGE', color: colors.yellow },
  3: { text: 'GOOD', color: colors.green },
  na: { text: 'N/A', color: colors.gray },
};

const CardCarSmall = ({ car }) => {
  const { id, name, type, image, acceleration, topSpeed, handling, race } = car;
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const currentRace = useSelector(raceSelector(race));

  // TODO: not handling N/A yet
  const winProbabilityValue =
    selectedTrack && winProbability(car, selectedTrack);

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
    <Box
      minW="304px"
      w="304px"
      minH="100px"
      position="relative"
      onClick={setSelected}
    >
      <Box w="100%" h="100px" position="absolute">
        {location?.state?.car === id && (
          <Box
            position="absolute"
            w="100%"
            h="100%"
            borderRadius="16px"
            bg="#B2F5EA77"
          />
        )}
        {currentRace && (
          <CardProgressOverlay race={currentRace} label borderRadius="16px" />
        )}
        <Flex
          w="100%"
          h="100%"
          padding="0 16px"
          bg="white"
          border="1px solid black"
          borderRadius="16px"
        >
          <Box w="50%">
            <Image
              w="112px"
              h="64px"
              padding="16px 16px 0 0"
              alt="car"
              objectFit="contain"
              style={{ imageRendering: 'pixelated' }}
              src={image}
            />
            <Text w="100%" fontSize="sm" marginTop="8px">
              Type: {type}
            </Text>
          </Box>
          <Box w="50%" marginLeft="0.2rem">
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
      {selectedTrack && (
        <Flex
          w="100%"
          h="124px"
          borderRadius="16px"
          bg={winningChances[winProbabilityValue].color}
          border="1px solid black"
        >
          <Text w="100%" alignSelf="flex-end" textAlign="center" fontSize="sm">
            Winning chances: {winningChances[winProbabilityValue].text}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

CardCarSmall.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {},
};

export default CardCarSmall;
