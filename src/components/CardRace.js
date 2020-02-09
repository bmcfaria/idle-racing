import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import CardProgressOverlay from "./CardProgressOverlay";

const CardRace = ({ id, name, type, image, prizes, duration, price }) => {
  const location = useLocation();
  const history = useHistory();

  const racing = false;

  // To improve mobile navigation,
  // this way the back button will un-select instead off showing the previous selected
  const setSelected = () => {
    if (racing) return;

    if (location?.state?.race) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), race: id }
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), race: id }
      });
    }
  };

  return (
    <Box w="16rem" position="relative" onClick={setSelected}>
      {location?.state?.race === id && (
        <Box position="absolute" w="100%" h="100%" bg="#B2F5EA77" />
      )}
      {racing && <CardProgressOverlay timeTotal={10} timeLeft={9} />}
      <Flex w="100%" padding="0.6rem 0.2rem" bg="white">
        <Box w="5rem">
          <Image w="100%" h="4.5rem" alt="race" bg="lightgray" src={image} />
          <Text textAlign="center" w="100%" fontSize="sm">
            Type: {type}
          </Text>
        </Box>
        <Box flexGrow="1" marginLeft="0.2rem">
          <Text textAlign="left" w="100%" fontSize="md">
            {name}
          </Text>
          <Flex justifyContent="space-between">
            <Box>
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
            </Box>
            <Box w="5rem" marginTop="auto">
              <Flex justifyContent="space-between">
                <Text textAlign="left" fontSize="xs">
                  Duration:
                </Text>
                <Text textAlign="right" fontSize="xs">
                  {duration}s
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text textAlign="left" fontSize="xs">
                  Price:
                </Text>
                <Text textAlign="right" fontSize="xs">
                  ${price}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

CardRace.defaultProps = {
  prizes: []
};

export default CardRace;
