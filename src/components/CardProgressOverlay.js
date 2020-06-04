import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import CardProgressCircle from './CardProgressCircle';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';

const CardProgressOverlay = ({
  race,
  label,
  car,
  circleSize = '116px',
  ...props
}) => {
  if (!race) {
    return null;
  }

  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      top="0"
      left="0"
      padding="8px 0"
      bg={hexAlpha(colors.white, 0.98)}
      cursor="progress"
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      {label && (
        <Text textAlign="center" color={colors.darkGray} fontSize="14px">
          ({race.name})
        </Text>
      )}
      <CardProgressCircle
        race={race}
        size={circleSize}
        textColor={colors.darkGray}
      />
      {car && (
        <Text textAlign="center" color={colors.darkGray} fontSize="14px">
          ({car.name})
        </Text>
      )}
    </Flex>
  );
};

export default CardProgressOverlay;
