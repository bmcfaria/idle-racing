import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { ReactComponent as Triange } from '../assets/icons/triangle.svg';
import Button from './Button';

const CollapsiblePanel = ({ children, ...props }) => (
  <Button
    wrap="wrap"
    margin="0 auto"
    boxSizing="content-box"
    borderRadius="16px"
    padding="0 16px"
    border={`1px solid ${colors.lightGray}`}
    bg={colors.darkGray}
    color={colors.white}
    position="relative"
    minH="32px"
    alignItems="center"
    justifyContent="space-between"
    {...props}
  >
    <Box w="16px" h="16px" transform="rotate(180deg)" as={Triange} />
    <Text>{children}</Text>
    <Box w="16px" h="16px" transform="rotate(180deg)" as={Triange} />
  </Button>
);

export default CollapsiblePanel;
