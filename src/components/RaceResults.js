import React from "react";
import { Text, Button, Flex } from "@chakra-ui/core";

const RaceResults = ({ positions, ...props }) => (
  <Flex
    direction="column"
    position="absolute"
    w="100%"
    h="100%"
    bg="blackAlpha.800"
    {...props}
  >
    <Text color="white" ontSize="sm">
      You placed: 3rd
    </Text>
    <Text color="white" ontSize="sm">
      Reward: $10
    </Text>
    {positions.map((car, index) => (
      <Text color="white" ontSize="xs">
        {index}: car name
      </Text>
    ))}
    <Button variant="outline" bg="white" marginLeft="auto" marginRight="auto">
      Ok
    </Button>
  </Flex>
);

RaceResults.defaultProps = {
  positions: [...new Array(10)]
};

export default RaceResults;
