import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';

const ContentPanel = ({ title, separator, wrap, children, ...props }) => (
  <Flex
    minW="16rem"
    h={wrap ? 'fit-content' : '100%'}
    bg="white"
    direction="column"
    {...props}
  >
    <Text textAlign="center" fontWeight="bold">
      {title}
    </Text>
    <Box
      minW="100%"
      h={wrap ? 'fit-content' : '10rem'}
      flexGrow="1"
      bg="white"
      overflowY="scroll"
    >
      {children}
    </Box>
  </Flex>
);

export default ContentPanel;
