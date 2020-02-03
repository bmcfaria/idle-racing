import React from "react";
import { Box, Text, Flex } from "@chakra-ui/core";

const Separator = () => <Box w="1rem" />;

const ContentPanel = ({ title, separator, wrap, children }) => (
  <>
    {separator && <Separator />}
    <Flex
      minW="10rem"
      h={wrap ? "fit-content" : "100%"}
      bg="white"
      direction="column"
    >
      <Text textAlign="center" fontWeight="bold">
        {title}
      </Text>
      <Box minW="100%" h="100%" bg="white" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  </>
);

export default ContentPanel;
