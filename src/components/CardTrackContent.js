import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import getImageTrack from '../helpers/imageMappingTracks';
import { useSelector } from 'react-redux';
import { enoughMoneySelector, trackStatsSelector } from '../state/selectors';
import RequirementsList from './RequirementsList';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import abbreviate from 'number-abbreviate';
import {
  useRacePrizesWithBuff,
  useRacePriceWithDiscount,
} from '../helpers/hooks';
import { cars } from '../helpers/data';

const TrackAttribute = ({ name, value, ...props }) => {
  const color = percentageValue => {
    if (percentageValue < 1 / 3) {
      return colors.red;
    }

    if (percentageValue > 2 / 3) {
      return colors.green;
    }

    return colors.orange;
  };

  return (
    <Box w="20px" {...props}>
      <Text textAlign="center" fontSize="10px" lineHeight="10px">
        {name}
      </Text>
      <Box w="100%" h="3px" bg={colors.darkGray}>
        <Box w={`${value * 100}%`} h="100%" bg={color(value)} />
      </Box>
    </Box>
  );
};

const TrackPrize = ({ text, prize, ...props }) => {
  const car = isNaN(prize) && cars.find(({ id }) => id === prize);

  return (
    <Box w="48px" fontSize="12px" lineHeight="14px" {...props}>
      <Text textAlign="center" color={colors.darkGray}>
        {text}
      </Text>
      {car && (
        <Text
          textAlign="center"
          maxW="48px"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {car.name}
        </Text>
      )}
      {!car && <Text textAlign="center">${abbreviate(~~prize, 1)}</Text>}
    </Box>
  );
};

const CardTrackContent = ({ track, imageBorderRadius, children, ...props }) => {
  const { name, prizes, duration, price, requirements } = track;
  const trackStats = useSelector(trackStatsSelector(track.id));
  const calculatedPrice = ~~useRacePriceWithDiscount(price);
  const enoughMoney = useSelector(enoughMoneySelector(calculatedPrice));
  const calculatedPrizes = useRacePrizesWithBuff(prizes);

  const bgColor =
    (trackStats.won > 100 && colors.lightBlue) ||
    (trackStats.won > 0 && colors.green) ||
    (trackStats.raced && colors.orange) ||
    colors.darkGray;

  const color =
    (trackStats.won > 100 && 'black') ||
    (trackStats.won > 0 && 'black') ||
    (trackStats.raced && 'black') ||
    colors.white;

  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      bg={bgColor}
      borderRadius="16px"
      {...props}
    >
      <Box
        w="160px"
        h="160px"
        border={`1px solid ${colors.darkGray}`}
        bg={colors.lightGray}
        borderRadius="16px"
      >
        <Flex
          w="calc(100% - 2px)"
          h="calc(100px - 2px)"
          margin="1px"
          left="0"
          position="relative"
          bg={colors.white}
          borderRadius="16px"
        >
          <Box
            margin="auto"
            color={colors.darkGray}
            as={getImageTrack(track)}
          />

          <Flex
            top="4px"
            w="100%"
            position="absolute"
            justifyContent="space-around"
          >
            <TrackAttribute
              name="ACC"
              value={track[ATTRIBUTE_TYPES.ACCELERATION]}
            />
            <TrackAttribute name="SPD" value={track[ATTRIBUTE_TYPES.SPEED]} />
            <TrackAttribute
              name="HND"
              value={track[ATTRIBUTE_TYPES.HANDLING]}
            />
          </Flex>

          <RequirementsList
            bottom="4px"
            w="100%"
            position="absolute"
            requirements={requirements}
          />
        </Flex>

        <Text textAlign="center" fontSize="14px">
          {name}
        </Text>

        <Flex marginTop="4px" justifyContent="center">
          <TrackPrize text="1st" prize={calculatedPrizes[0]} />
          <TrackPrize text="2nd" prize={calculatedPrizes[1]} />
          <TrackPrize text="3rd" prize={calculatedPrizes[2]} />
        </Flex>
      </Box>

      <Flex w="100%" h="20px" fontSize="12px">
        <Text margin="auto" color={color}>
          {duration / 1000}s
        </Text>
        <Text margin="auto" color={!enoughMoney ? colors.red : color}>
          {calculatedPrice === 0
            ? 'FREE'
            : `$${abbreviate(calculatedPrice, 1)}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardTrackContent;
