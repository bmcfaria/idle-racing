import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import {
  totalRacesCanceledSelector,
  totalRacesLostSelector,
  totalRacesWonSelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';

const HomeCardRaces = props => {
  const totalRacesWon = useSelector(totalRacesWonSelector);
  const totalRacesLost = useSelector(totalRacesLostSelector);
  const totalRacesCanceled = useSelector(totalRacesCanceledSelector);

  return (
    <Box
      w="160px"
      padding="8px 16px"
      borderRadius="16px"
      textAlign="center"
      bg={colors.green}
      border={`1px solid ${colors.darkGray}`}
      {...props}
    >
      <Text w="100%" fontSize="20px" lineHeight="20px">
        Races
      </Text>
      <Flex w="100%" justifyContent="space-between" marginTop="8px">
        <Text fontSize="16px" lineHeight="16px">
          Won
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          {totalRacesWon}
        </Text>
      </Flex>
      <Flex w="100%" justifyContent="space-between">
        <Text fontSize="16px" lineHeight="16px">
          Lost
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          {totalRacesLost}
        </Text>
      </Flex>
      <Flex w="100%" justifyContent="space-between">
        <Text fontSize="16px" lineHeight="16px">
          Canceled
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          {totalRacesCanceled}
        </Text>
      </Flex>
    </Box>
  );
};

export default HomeCardRaces;
