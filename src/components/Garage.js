import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import ContentPanel from "./ContentPanel";

const Separator = () => <Box w="1rem" />;

const Garage = () => (
  <Flex justifyContent="center">
    <ContentPanel />
    <Separator />
    <ContentPanel />
  </Flex>
);

export default Garage;
