import React from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/core";
import AttributeInfo from "./AttributeInfo";

const AttributeUpgrade = ({ name, value, upgradeValue, upgrade, max }) => (
  <Flex position="relative" h="2rem">
    <AttributeInfo flexGrow="1" name={name} upgrade={upgrade} max={max} />
    <Flex
      w="100%"
      textAlign="center"
      position="absolute"
      fontSize="sm"
      justifyContent="center"
    >
      <Text textAlign="center" fontSize="sm">
        {value}
      </Text>
      <Text
        textAlign="center"
        fontSize="sm"
        marginLeft="0.2rem"
        marginRight="0.2rem"
      >
        ->
      </Text>
      <Text textAlign="center" fontSize="sm" fontWeight="bold" color="tomato">
        {upgradeValue}
      </Text>
    </Flex>
    <Button h="1.5rem" borderColor="tomato" color="tomato" variant="outline">
      $599
    </Button>
  </Flex>
);

const CarDetails = ({ image }) => (
  <Box w="16rem" margin="0.6rem 0.2rem">
    <Image w="100%" h="9rem" alt="car" bg="lightgray" />
    <Text textAlign="center" w="100%" fontSize="md">
      Porsche 911 Carrera
    </Text>
    <Text textAlign="left" w="100%" fontSize="sm">
      Type: 4x4
    </Text>
    <AttributeUpgrade
      name="Acceleration"
      value={180}
      upgradeValue={200}
      upgrade={1}
      max={5}
    />
    <AttributeUpgrade
      name="Top Speed"
      value={220}
      upgradeValue={240}
      upgrade={7}
      max={10}
    />
    <AttributeUpgrade
      name="Handling"
      value={190}
      upgradeValue={210}
      upgrade={6}
      max={7}
    />
    <Flex>
      <Button variantColor="teal" variant="outline" margin="1rem auto">
        Sell ($599)
      </Button>
    </Flex>
  </Box>
);

export default CarDetails;
