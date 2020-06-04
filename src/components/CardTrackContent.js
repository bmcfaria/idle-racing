import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import getImageTrack from '../helpers/imageMappingTracks';
import { useSelector } from 'react-redux';
import { moneySelector } from '../state/selectors';
import RequirementsList from './RequirementsList';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import abbreviate from 'number-abbreviate';

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

const TrackPrize = ({ text, prize, ...props }) => (
  <Box w="48px" fontSize="12px" lineHeight="14px" {...props}>
    <Text textAlign="center" color={colors.darkGray}>
      {text}
    </Text>
    <Text textAlign="center">${abbreviate(prize)}</Text>
  </Box>
);

const CardTrackContent = ({ track, imageBorderRadius, children, ...props }) => {
  const { name, prizes, duration, price, requirements } = track;
  const money = useSelector(moneySelector);

  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      bg={colors.darkGray}
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
            <TrackAttribute
              name="TSP"
              value={track[ATTRIBUTE_TYPES.TOP_SPEED]}
            />
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
          <TrackPrize text="1st" prize={prizes[0]} />
          <TrackPrize text="2nd" prize={prizes[1]} />
          <TrackPrize text="3rd" prize={prizes[2]} />
        </Flex>
      </Box>

      <Flex w="100%" h="20px" fontSize="12px">
        <Text margin="auto" color="white">
          {duration / 1000}s
        </Text>
        <Text margin="auto" color={money < price ? 'tomato' : 'white'}>
          {price === 0 ? 'FREE' : `$${abbreviate(price)}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardTrackContent;
