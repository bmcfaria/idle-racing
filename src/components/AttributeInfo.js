import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import AttributesBar from "./AttributesBar";

const AttributeInfo = ({ name, value, upgrade, max, ...props }) => (
  <Flex {...props}>
    <Box>
      <Text textAlign="left" fontSize="xs" whiteSpace="nowrap">
        {name}
      </Text>
      <AttributesBar upgrade={upgrade} max={max} />
    </Box>
    <Text textAlign="right" w="100%" fontSize="sm">
      {value}
    </Text>
  </Flex>
);

export default AttributeInfo;
