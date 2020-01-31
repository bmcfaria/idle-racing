import React from "react";
import { Box, Flex } from "@chakra-ui/core";

const AtributeBlock = ({ selected }) => (
  <Box
    w="6px"
    h="5px"
    border="0.1px solid black"
    bg={selected ? "#2F80ED" : "none"}
    marginLeft="0"
  />
);

const AtributesBar = ({ value = 0, max = 1 }) => (
  <Flex h="0.3rem">
    {[...new Array(max)].map((_, index) => {
      return <AtributeBlock selected={index < value} key={index} />;
    })}
  </Flex>
);

export default AtributesBar;
