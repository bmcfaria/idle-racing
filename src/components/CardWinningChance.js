import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { winProbability } from '../helpers/utils';
import { colors } from '../helpers/theme';

const winningChances = {
  0: { text: 'BAD', color: colors.red },
  1: { text: 'MAYBE', color: colors.orange },
  2: { text: 'AVERAGE', color: colors.yellow },
  3: { text: 'GOOD', color: colors.green },
  na: { text: 'N/A', color: colors.gray },
};

export const CardWinningChanceComponent = ({
  winProbabilityValue,
  short,
  ...props
}) => (
  <Flex
    w="100%"
    borderRadius="16px"
    bg={winningChances[winProbabilityValue].color}
    lineHeight="20px"
    fontSize="12px"
    {...props}
  >
    <Text w="100%" alignSelf="flex-end" textAlign="center">
      {!short ? 'Winning chances: ' : ''}
      {winningChances[winProbabilityValue].text}
    </Text>
  </Flex>
);

const CardWinningChance = ({ car, track, meetsRequirements, ...props }) => {
  const winProbabilityValue = !meetsRequirements
    ? 'na'
    : track && winProbability(car, track);

  return (
    <CardWinningChanceComponent
      winProbabilityValue={winProbabilityValue}
      {...props}
    />
  );
};

export default CardWinningChance;
