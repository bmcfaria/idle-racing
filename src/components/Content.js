import React from "react";
import { Box, Flex } from "@chakra-ui/core";

const Content = ({ children }) => (
  <Box w="100%" h="100%" bg="lightgray" paddingTop="2rem" paddingBottom="2rem">
    <Flex h="calc(100% - 2 * 2rem)" justifyContent="center">
      {children}
    </Flex>
  </Box>
);

export default Content;
