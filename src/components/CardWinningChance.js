import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { winProbability } from '../helpers/utils';

const colors = {
  green: '#57F583',
  yellow: '#F5EF57',
  orange: '#F5A357',
  red: '#F55757',
  gray: '#B7B7B7',
};

const winningChances = {
  0: { text: 'BAD', color: colors.red },
  1: { text: 'MAYBE', color: colors.orange },
  2: { text: 'AVERAGE', color: colors.yellow },
  3: { text: 'GOOD', color: colors.green },
  na: { text: 'N/A', color: colors.gray },
};

export const CardWinningChanceComponent = ({
  winProbabilityValue,
  ...props
}) => (
  <Flex
    w="100%"
    borderRadius="16px"
    bg={winningChances[winProbabilityValue].color}
    {...props}
  >
    <Text
      w="100%"
      alignSelf="flex-end"
      textAlign="center"
      fontSize="14px"
      lineHeight="24px"
    >
      Winning chances: {winningChances[winProbabilityValue].text}
    </Text>
  </Flex>
);

const CardWinningChance = ({ car, track, ...props }) => {
  // TODO: not handling N/A yet
  const winProbabilityValue = track && winProbability(car, track);

  return (
    <CardWinningChanceComponent
      winProbabilityValue={winProbabilityValue}
      {...props}
    />
  );
};

export default CardWinningChance;
