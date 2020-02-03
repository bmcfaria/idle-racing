import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/core";
import AttributeInfo from "./AttributeInfo";

const CardCar = ({ image }) => (
  <Flex w="16rem" margin="0.6rem 0.2rem">
    <Box w="5rem">
      <Image w="100%" h="4.5rem" alt="car" bg="lightgray" src={image} />
      <Text textAlign="center" w="100%" fontSize="sm">
        Type: 4x4
      </Text>
    </Box>
    <Box flexGrow="1" marginLeft="0.2rem">
      <Text textAlign="left" w="100%" fontSize="md">
        Porsche 911 Carrera
      </Text>
      <AttributeInfo name="Acceleration" value={180} upgrade={1} max={5} />
      <AttributeInfo name="Top Speed" value={220} upgrade={7} max={10} />
      <AttributeInfo name="Handling" value={190} upgrade={6} max={7} />
    </Box>
  </Flex>
);

export default CardCar;
