import React from "react";
import { Box, Flex } from "@chakra-ui/core";

const AttributeBlock = ({ selected }) => (
  <Box
    w="6px"
    h="5px"
    border="0.1px solid black"
    bg={selected ? "#2F80ED" : "none"}
    marginLeft="0"
  />
);

const AttributesBar = ({ upgrade = 0, max = 1, ...props }) => (
  <Flex h="0.3rem" {...props}>
    {[...new Array(max)].map((_, index) => (
      <AttributeBlock selected={index < upgrade} key={index} />
    ))}
  </Flex>
);

export default AttributesBar;
