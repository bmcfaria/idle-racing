import React from "react";
import { Box } from "@chakra-ui/core";

const CardExample = () => <Box h="2rem" bg="tomato" margin="0.2rem"></Box>;

const ContentPanel = () => (
  <Box w="10rem" h="100%" bg="white" overflowY="scroll">
    <CardExample />
    <CardExample />
    <CardExample />
    <CardExample />
    <CardExample />
    <CardExample />
    <CardExample />
    <CardExample />
  </Box>
);

export default ContentPanel;
