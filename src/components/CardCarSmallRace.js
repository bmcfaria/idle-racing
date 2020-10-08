import React, { useContext } from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import { raceSelector, trackSelector } from '../state/selectors';
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
import styled from '@emotion/styled';
import { RaceContext } from '../helpers/context';

const Image = styled.img`
  max-width: 80px;
  height: 100%;
  border-radius: 16px;
  object-fit: contain;
`;

const CarAttribute = ({ text, attr, ...props }) => (
  <Box w="48px" lineHeight="14px" textAlign="center" {...props}>
    <Text fontSize="12px" color={colors.darkGray}>
      {text}
    </Text>
    <Text fontSize="14px">{attr}</Text>
  </Box>
);

const CardCarSmallRace = ({ car, onClick, ...props }) => {
  const { race } = car;
  const { trackId } = useContext(RaceContext);
  const selectedTrack = useSelector(trackSelector(trackId));

  const currentRace = useSelector(raceSelector(race));

  const meetsRequirements = doMeetRequirements(
    car,
    selectedTrack?.requirements
  );

  // To improve mobile navigation,
  // this way the back button will un-select
  const setSelected = e => {
    if (!meetsRequirements) return;
    if (currentRace) return;

    if (onClick) {
      onClick(car);

      return;
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
          <Image alt="car" src={getImageCar(car)} />
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
          disableClick
        />
      )}
    </Button>
  );
};

export default CardCarSmallRace;
