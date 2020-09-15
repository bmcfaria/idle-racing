import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { colors, MAX_WIDTH } from '../helpers/theme';

const Content = ({ children, ...props }) => (
  <Box
    w="100%"
    maxW={MAX_WIDTH}
    margin="0 auto"
    bg={colors.white}
    paddingTop="2rem"
    paddingBottom="2rem"
    overflow="auto"
    {...props}
  >
    <Flex h="100%" justifyContent="center">
      {children}
    </Flex>
  </Box>
);

export default Content;
