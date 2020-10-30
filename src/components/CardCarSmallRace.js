import React, { useContext } from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import CardWinningChance from './CardWinningChance';
import {
  capitalize,
  ATTRIBUTE_TYPES,
  calculateCarAttributeValues,
} from '../helpers/utils';
import { colors } from '../helpers/theme';
import Button from './Button';
import { RaceContext } from '../helpers/context';
import { useRace, useTrack } from '../helpers/hooksRace';
import CarImage from './CarImage';
import { doMeetRequirements } from '../helpers/race';

const CarAttribute = ({ text, attr, ...props }) => (
  <Box w="48px" lineHeight="14px" textAlign="center" {...props}>
    <Text fontSize="12px" color={colors.darkGray}>
      {text}
    </Text>
    <Text fontSize="14px">{attr}</Text>
  </Box>
);

const CardCarSmallRace = ({ car, onClick, failedRequirements, ...props }) => {
  const { race } = car;
  const { trackId } = useContext(RaceContext);
  const selectedTrack = useTrack(trackId);

  const currentRace = useRace(race);

  const meetsRequirements = doMeetRequirements(
    car,
    selectedTrack?.requirements
  );

  const carAttrs = calculateCarAttributeValues(car);

  // To improve mobile navigation,
  // this way the back button will un-select
  const setSelected = () => {
    if (currentRace) return;

    if (!meetsRequirements) {
      // Test one by one separately
      const failedRequirementsList = selectedTrack?.requirements.map(
        requirement => !doMeetRequirements(car, [requirement])
      );

      failedRequirements(failedRequirementsList);

      return;
    }

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
          <CarImage maxW="80px" car={car} />
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
            attr={carAttrs[ATTRIBUTE_TYPES.ACCELERATION]}
            text="ACC"
          />
          <CarAttribute attr={carAttrs[ATTRIBUTE_TYPES.SPEED]} text="SPD" />
          <CarAttribute attr={carAttrs[ATTRIBUTE_TYPES.HANDLING]} text="HND" />
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
