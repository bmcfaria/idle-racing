import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import Button from './Button';

const CardBig = ({
  children,
  onClick,
  primaryText,
  secondaryText,
  theme = { primaryBg: colors.orange, primaryColor: 'black' },
  ...props
}) => (
  <Button
    w="320px"
    h="auto"
    position="relative"
    onClick={onClick}
    cursor="pointer"
    borderRadius="16px"
    bg={theme.primaryBg}
    flexDirection="column"
    {...props}
  >
    <Flex
      w="318px"
      marginTop="1px"
      bg={colors.lightGray}
      borderRadius="16px"
      direction="column"
      alignItems="center"
    >
      <Flex
        w="316px"
        padding="0 8px"
        h="120px"
        marginTop="1px"
        bg={colors.white}
        borderRadius="16px"
        flexWrap="wrap"
      >
        {children}
      </Flex>
      <Text h="20px" lineHeight="20px" fontSize="14px" textAlign="center">
        {secondaryText}
      </Text>
    </Flex>
    <Text
      h="32px"
      lineHeight="32px"
      fontSize="18px"
      textAlign="center"
      color={theme.primaryColor}
    >
      {primaryText}
    </Text>
  </Button>
);

export default CardBig;
