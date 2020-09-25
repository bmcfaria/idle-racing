import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import {
  boughtCarsSelector,
  rewardCarsSelector,
  soldCarsSelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';

const reduceSum = (result, item) => result + item;

const HomeCardCars = props => {
  const boughtCars = useSelector(boughtCarsSelector);
  const rewardCars = useSelector(rewardCarsSelector);
  const soldCars = useSelector(soldCarsSelector);

  const boughtCarsCount = Object.values(boughtCars).reduce(reduceSum, 0);
  const rewardCarsCount = Object.values(rewardCars).reduce(reduceSum, 0);
  const soldCarsCount = Object.values(soldCars).reduce(reduceSum, 0);

  return (
    <Box
      w="160px"
      padding="8px 16px"
      borderRadius="16px"
      textAlign="center"
      bg={colors.lightBlue}
      border={`1px solid ${colors.darkGray}`}
      {...props}
    >
      <Text w="100%" fontSize="20px" lineHeight="20px">
        Cars
      </Text>
      <Flex w="100%" justifyContent="space-between" marginTop="8px">
        <Text fontSize="16px" lineHeight="16px">
          Bought
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          {boughtCarsCount}
        </Text>
      </Flex>
      <Flex w="100%" justifyContent="space-between">
        <Text fontSize="16px" lineHeight="16px">
          Earned
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          {soldCarsCount}
        </Text>
      </Flex>
      <Flex w="100%" justifyContent="space-between">
        <Text fontSize="16px" lineHeight="16px">
          Sold
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          {rewardCarsCount}
        </Text>
      </Flex>
    </Box>
  );
};

export default HomeCardCars;
