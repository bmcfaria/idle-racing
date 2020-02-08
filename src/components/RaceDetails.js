import React from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/core";

const RaceDetails = ({ id, name, type, image, prizes, duration, price }) => (
  <Flex flexDirection="column" w="16rem" margin="0.6rem 0.2rem">
    <Image w="100%" h="9rem" alt="car" bg="lightgray" />
    <Text textAlign="center" w="100%" fontSize="md" src={image}>
      {name}
    </Text>
    <Flex justifyContent="spac">
      <Box w="6rem">
        <Text textAlign="left" w="100%" fontSize="sm">
          Type: {type}
        </Text>
      </Box>
      <Box>
        <Text textAlign="left" w="100%" fontSize="sm">
          Requirements: {type} cars
        </Text>
        <Text textAlign="left" fontSize="sm">
          Prizes:
        </Text>
        {prizes.map(prize => (
          <Text textAlign="left" fontSize="xs" lineHeight="1rem" key={prize}>
            ${prize}
          </Text>
        ))}
        <Text textAlign="left" fontSize="xs">
          Duration: {duration}s
        </Text>
      </Box>
    </Flex>
    <Text textAlign="left" w="100%" fontSize="xs" color="tomato">
      Win probability: ?%
    </Text>
    <Text textAlign="center" w="100%" fontSize="xs">
      (Try upgrading your car or use a better one, to improve your chances of
      winning)
    </Text>
    <Button
      w="4rem"
      h="1.5rem"
      borderColor="tomato"
      color="tomato"
      variant="outline"
      isDisabled={!price}
      marginTop="0.2rem"
      marginLeft="auto"
      marginRight="auto"
    >
      ${price}
    </Button>
  </Flex>
);

RaceDetails.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {}
};

export default RaceDetails;
