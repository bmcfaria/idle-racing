import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
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

const CardWinningChance = ({ car, track, ...props }) => {
  // TODO: not handling N/A yet
  const winProbabilityValue = track && winProbability(car, track);

  return (
    <Flex
      w="100%"
      borderRadius="16px"
      bg={winningChances[winProbabilityValue].color}
      {...props}
    >
      <Text w="100%" alignSelf="flex-end" textAlign="center" fontSize="sm">
        Winning chances: {winningChances[winProbabilityValue].text}
      </Text>
    </Flex>
  );
};

export default CardWinningChance;
