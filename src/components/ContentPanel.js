import React from "react";
import { Box } from "@chakra-ui/core";

const Separator = () => <Box w="1rem" />;

const ContentPanel = ({ separator, children }) => (
  <>
    {separator && <Separator />}
    <Box minW="10rem" h="100%" bg="white" overflowY="scroll">
      {children}
    </Box>
  </>
);

export default ContentPanel;
