import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/core";
import AttributesBar from "./AttributesBar";

const AttributeInfo = ({ name, value, upgrade, max }) => (
  <Flex>
    <Box>
      <Text textAlign="left" fontSize="xs">
        {name}
      </Text>
      <AttributesBar upgrade={upgrade} max={max} />
    </Box>
    <Text textAlign="right" w="100%" fontSize="sm">
      {value}
    </Text>
  </Flex>
);

const CardCard = ({ image }) => (
  <Flex w="16rem" margin="0.4rem 0.2rem" bg="antiquewhite">
    <Box w="5rem">
      <Image w="100%" h="4.5rem" alt="car" src={image} bg="tomato" />
      <Text textAlign="center" w="100%" fontSize="sm">
        Type: 4x4
      </Text>
    </Box>
    <Box flexGrow="1" marginLeft="0.2rem" bg="lightgray">
      <Text textAlign="left" w="100%" fontSize="md">
        Porsche 911 Carrera
      </Text>
      <AttributeInfo name="Acceleration" value={180} upgrade={1} max={5} />
      <AttributeInfo name="Top Speed" value={220} upgrade={7} max={10} />
      <AttributeInfo name="Handling" value={190} upgrade={6} max={7} />
    </Box>
  </Flex>
);

export default CardCard;
