import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import { raceSelector, tracksSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import CardWinningChance from './CardWinningChance';
import {
  doMeetRequirements,
  capitalize,
  ATTRIBUTE_TYPES,
} from '../helpers/utils';
import { colors } from '../helpers/theme';
import getImageCar from '../helpers/imageMappingCars';
import Button from './Button';

const CarAttribute = ({ text, attr, ...props }) => (
  <Box w="48px" lineHeight="14px" textAlign="center" {...props}>
    <Text fontSize="12px" color={colors.darkGray}>
      {text}
    </Text>
    <Text fontSize="14px">{attr}</Text>
  </Box>
);

const CardCarSmallRace = ({ car, onClick, ...props }) => {
  const { id, race } = car;
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const currentRace = useSelector(raceSelector(race));

  const meetsRequirements = doMeetRequirements(
    car,
    selectedTrack?.requirements
  );

  // To improve mobile navigation,
  // this way the back button will un-select
  const setSelected = () => {
    if (!meetsRequirements) return;

    if (onClick) {
      onClick(car);

      return;
    }

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
    <Button
      w="160px"
      h="136px"
      position="relative"
      onClick={setSelected}
      cursor={meetsRequirements ? 'pointer' : 'unset'}
      borderRadius="16px"
      padding="0"
      {...props}
    >
      {selectedTrack && (
        <CardWinningChance
          car={car}
          track={selectedTrack}
          meetsRequirements={meetsRequirements}
          w="100%"
          h="136px"
          borderRadius="16px"
        />
      )}
      <Flex
        w="100%"
        h="116px"
        direction="column"
        top="0"
        left="0"
        position="absolute"
        borderRadius="16px"
        bg={colors.lightGray}
      >
        <Flex
          w="100%"
          h="52px"
          border={`1px solid ${colors.lightGray}`}
          borderRadius="16px"
          bg={colors.white}
          justifyContent="space-evenly"
        >
          <Image
            maxW="80px"
            h="100%"
            alt="car"
            borderRadius="16px"
            objectFit="contain"
            src={getImageCar(car)}
          />
          <Flex
            direction="column"
            justifyContent="space-evenly"
            lineHeight="12px"
            textAlign="center"
            fontSize="12px"
          >
            <Text>{capitalize(car.brand)}</Text>
            <Text color={colors.darkGray}>{car.type}</Text>
          </Flex>
        </Flex>
        <Text fontSize="14px" lineHeight="24px" textAlign="center" w="100%">
          {car.name}
        </Text>
        <Flex marginTop="4px" justifyContent="center">
          <CarAttribute
            attr={car[ATTRIBUTE_TYPES.ACCELERATION].value}
            text="ACC"
          />
          <CarAttribute attr={car[ATTRIBUTE_TYPES.SPEED].value} text="SPD" />
          <CarAttribute attr={car[ATTRIBUTE_TYPES.HANDLING].value} text="HND" />
        </Flex>
      </Flex>
      {currentRace && (
        <CardProgressOverlay
          race={currentRace}
          car={car}
          label
          borderRadius="16px"
          circleSize="72px"
        />
      )}
    </Button>
  );
};

export default CardCarSmallRace;
