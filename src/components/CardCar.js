import React, { useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/core";
import AttributeInfo from "./AttributeInfo";
import { CardCarContext } from "../context";

const CardCar = ({
  id,
  name,
  type,
  image,
  acceleration,
  topSpeed,
  handling
}) => {
  const { selected, setSelected } = useContext(CardCarContext);

  return (
    <Box w="16rem" position="relative" onClick={() => setSelected(id)}>
      {selected === id && (
        <Box position="absolute" w="100%" h="100%" bg="#B2F5EA77" />
      )}
      <Flex w="100%" padding="0.6rem 0.2rem" bg="white">
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
    </Box>
  );
};

CardCar.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {}
};

export default CardCar;
