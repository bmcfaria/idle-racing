import React from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/core";
import CardProgressOverlay from "./CardProgressOverlay";

const RaceDetails = ({ id, name, type, image, prizes, duration, price }) => {
  const racing = false;
  return (
    <Box position="relative" w="16rem">
      {racing && <CardProgressOverlay timeTotal={10} timeLeft={9} zIndex="1" />}

      <Flex flexDirection="column" marginTop="0.6rem" padding="0 0.2rem 0.6rem">
        <Image w="100%" h="8rem" alt="car" bg="lightgray" />
        <Text textAlign="center" w="100%" fontSize="md" src={image}>
          {name}
        </Text>
        <Flex justifyContent="space-between">
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
              <Text
                textAlign="left"
                fontSize="xs"
                lineHeight="1rem"
                key={prize}
              >
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
          (Try upgrading your car or use a better one, to improve your chances
          of winning)
        </Text>
        <Button
          borderColor="tomato"
          color="tomato"
          variant="outline"
          isDisabled={!price}
          marginTop="0.2rem"
          marginLeft="auto"
          marginRight="auto"
        >
          Race (${price})
        </Button>
      </Flex>
    </Box>
  );
};

RaceDetails.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {}
};

export default RaceDetails;
