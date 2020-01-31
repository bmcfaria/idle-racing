import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/core";
import AtributesBar from "./AtributesBar";

const CardCard = () => (
  <Flex w="16rem" margin="0.2rem" bg="antiquewhite">
    <Box w="5rem">
      <Image w="100%" h="4rem" alt="car" bg="tomato" />
      <Text textAlign="center" w="100%" fontSize="sm">
        Type: 4x4
      </Text>
    </Box>
    <Box flexGrow="1" marginLeft="0.2rem" bg="lightgray">
      <Text textAlign="left" w="100%" fontSize="md">
        Porsche 911 Carrera
      </Text>
      <Text textAlign="left" w="100%" fontSize="xs">
        Acceleration
      </Text>
      <AtributesBar value={1} max={5} />
      <Text textAlign="left" w="100%" fontSize="xs">
        Top Speed
      </Text>
      <AtributesBar value={7} max={10} />
      <Text textAlign="left" w="100%" fontSize="xs">
        Handling
      </Text>
      <AtributesBar value={6} max={7} />
    </Box>
  </Flex>
);

export default CardCard;
