import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/core";
import AttributeInfo from "./AttributeInfo";

const CardCar = ({ name, type, image, acceleration, topSpeed, handling }) => (
  <Flex w="16rem" margin="0.6rem 0.2rem">
    <Box w="5rem">
      <Image w="100%" h="4.5rem" alt="car" bg="lightgray" src={image} />
      <Text textAlign="center" w="100%" fontSize="sm">
        Type: {type}
      </Text>
    </Box>
    <Box flexGrow="1" marginLeft="0.2rem">
      <Text textAlign="left" w="100%" fontSize="md">
        {name}
      </Text>
      <AttributeInfo
        name="Acceleration"
        value={acceleration.value}
        upgrade={acceleration.upgrade}
        max={acceleration.max}
      />
      <AttributeInfo
        name="Top Speed"
        value={topSpeed.value}
        upgrade={topSpeed.upgrade}
        max={topSpeed.max}
      />
      <AttributeInfo
        name="Handling"
        value={handling.value}
        upgrade={handling.upgrade}
        max={handling.max}
      />
    </Box>
  </Flex>
);

CardCar.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {}
};

export default CardCar;
