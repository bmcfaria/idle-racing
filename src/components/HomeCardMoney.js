import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import {
  totalMoneyEarnedSelector,
  totalMoneySpentSelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';
import { formatMoney } from '../helpers/utils';

const HomeCardMoney = props => {
  const totalMoneyEarned = useSelector(totalMoneyEarnedSelector);
  const totalMoneySpent = useSelector(totalMoneySpentSelector);

  return (
    <Box
      w="160px"
      h="76px"
      padding="8px 16px"
      borderRadius="16px"
      textAlign="center"
      bg={colors.yellow}
      border={`1px solid ${colors.darkGray}`}
      {...props}
    >
      <Text w="100%" fontSize="20px" lineHeight="20px">
        Money
      </Text>
      <Flex w="100%" justifyContent="space-between" marginTop="8px">
        <Text fontSize="16px" lineHeight="16px">
          Won
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          ${formatMoney(totalMoneyEarned)}
        </Text>
      </Flex>
      <Flex w="100%" justifyContent="space-between">
        <Text fontSize="16px" lineHeight="16px">
          Spent
        </Text>
        <Text fontSize="16px" lineHeight="16px">
          ${formatMoney(totalMoneySpent)}
        </Text>
      </Flex>
    </Box>
  );
};

export default HomeCardMoney;
