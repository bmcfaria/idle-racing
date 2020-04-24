import React from 'react';
import { Box, Flex } from '@chakra-ui/core';

const Content = ({ children, ...props }) => (
  <Box
    w="100%"
    bg="lightgray"
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
