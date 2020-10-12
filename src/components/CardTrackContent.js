import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import getImageTrack from '../helpers/imageMappingTracks';
import { useSelector } from 'react-redux';
import { dealerCarsSelector, enoughMoneySelector } from '../state/selectors';
import RequirementsList from './RequirementsList';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES, formatDuration, formatMoney } from '../helpers/utils';
import {
  useRacePrizesWithBuff,
  useRacePriceWithDiscount,
  useRaceDurationWithDiscount,
} from '../helpers/hooks';
import { cars } from '../helpers/data';
import styled from '@emotion/styled';
import getImageCar from '../helpers/imageMappingCars';
import { useTrackStatsState } from '../helpers/hooksRace';

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: contain;
  margin: auto;
`;

const TrackAttribute = ({ name, value, large, ...props }) => {
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
    <Box
      w="20px"
      fontSize={`${large ? 14 : 10}px`}
      lineHeight={`${large ? 14 : 10}px`}
      {...props}
    >
      <Text textAlign="center">{name}</Text>
      <Box w="100%" h={`${large ? 4 : 3}px`} bg={colors.darkGray}>
        <Box w={`${value * 100}%`} h="100%" bg={color(value)} />
      </Box>
    </Box>
  );
};

const TrackPrize = ({ text, prize, large, ...props }) => {
  const car = isNaN(prize) && cars.find(({ id }) => id === prize);

  return (
    <Box
      w="48px"
      fontSize={`${large ? 14 : 12}px`}
      lineHeight={`${large ? 16 : 14}px`}
      {...props}
    >
      <Text textAlign="center" color={colors.darkGray}>
        {text}
      </Text>
      {car && (
        <Text
          textAlign="center"
          maxW="48px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {car.name}
        </Text>
      )}
      {!car && <Text textAlign="center">${formatMoney(~~prize)}</Text>}
    </Box>
  );
};

const CardTrackContent = ({
  track,
  imageBorderRadius,
  results,
  children,
  large,
  ...props
}) => {
  const { name, prizes, duration, price, requirements } = track;
  const dealerCars = useSelector(dealerCarsSelector);
  const trackStateState = useTrackStatsState(track.id);
  const calculatedPrice = ~~useRacePriceWithDiscount(price);
  const enoughMoney = useSelector(enoughMoneySelector(calculatedPrice));
  const calculatedPrizes = useRacePrizesWithBuff(prizes);
  const calculatedDuration = useRaceDurationWithDiscount(duration);

  const rewardCar =
    isNaN(prizes[0]) && dealerCars.find(({ id }) => id === prizes[0]);

  const bgColor =
    (!!results && colors.white) ||
    (trackStateState.won10 && colors.lightBlue) ||
    (trackStateState.won && colors.green) ||
    (trackStateState.raced && colors.orange) ||
    colors.darkGray;

  const color =
    (!!results && 'black') ||
    (trackStateState.won10 && 'black') ||
    (trackStateState.won && 'black') ||
    (trackStateState.raced && 'black') ||
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
        w={large ? '200px' : '160px'}
        h={`${large ? 168 + ~~(rewardCar && 44) : 160}px`}
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
            w="100%"
            h="auto"
            maxH={`${large ? 60 : 50}px`}
            margin={large ? '28px auto 0' : 'auto'}
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
              large={large}
              name="ACC"
              value={track[ATTRIBUTE_TYPES.ACCELERATION]}
            />
            <TrackAttribute
              large={large}
              name="SPD"
              value={track[ATTRIBUTE_TYPES.SPEED]}
            />
            <TrackAttribute
              large={large}
              name="HND"
              value={track[ATTRIBUTE_TYPES.HANDLING]}
            />
          </Flex>

          {!large && (
            <RequirementsList
              bottom="4px"
              w="100%"
              position="absolute"
              requirements={requirements}
            />
          )}
        </Flex>

        <Text textAlign="center" fontSize={`${large ? 16 : 14}px`}>
          {name}
        </Text>

        {rewardCar && large && (
          <Flex w="100%" h="44px" padding="0 16px" alignItems="center">
            <Box flexGrow="1" lineHeight="16px">
              <Text fontSize="14px" color={colors.darkGray}>
                1st Prize
              </Text>
              <Text fontSize="16px">{rewardCar.name}</Text>
            </Box>
            <Box w="64px">
              <Image alt="car" src={getImageCar(rewardCar)} />
            </Box>
          </Flex>
        )}

        <Flex marginTop="4px" justifyContent="center">
          {(!rewardCar || !large) && (
            <TrackPrize large={large} text="1st" prize={calculatedPrizes[0]} />
          )}
          <TrackPrize large={large} text="2nd" prize={calculatedPrizes[1]} />
          <TrackPrize large={large} text="3rd" prize={calculatedPrizes[2]} />
        </Flex>
      </Box>

      <Flex w="100%" h="20px" fontSize="14px">
        {results && (
          <Text margin="auto" color={color}>
            Results
          </Text>
        )}
        {!results && (
          <>
            <Text margin="auto" color={color}>
              {formatDuration(calculatedDuration)}
            </Text>
            <Text margin="auto" color={!enoughMoney ? colors.red : color}>
              {calculatedPrice === 0
                ? 'FREE'
                : `$${formatMoney(calculatedPrice)}`}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CardTrackContent;
