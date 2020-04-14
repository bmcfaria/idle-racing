import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { raceSelector } from '../state/selectors';
import CardProgressOverlay from './CardProgressOverlay';

const CardTrack = ({
  track: { id, name, type, image, prizes, duration, price, race },
}) => {
  const location = useLocation();
  const history = useHistory();

  const currentRace = useSelector(raceSelector(race));

  // To improve mobile navigation,
  // this way the back button will un-select instead off showing the previous selected
  const setSelected = () => {
    if (currentRace) return;

    if (location?.state?.track) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), track: id },
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), track: id },
      });
    }
  };

  return (
    <Box w="16rem" position="relative" onClick={setSelected}>
      {location?.state?.track === id && (
        <Box position="absolute" w="100%" h="100%" bg="#B2F5EA77" />
      )}
      {currentRace && <CardProgressOverlay race={currentRace} />}
      <Flex w="100%" padding="0.6rem 0.2rem" bg="white">
        <Box w="5rem">
          <Image w="100%" h="4.5rem" alt="track" bg="lightgray" src={image} />
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
                  {duration / 1000}s
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

CardTrack.defaultProps = {
  prizes: [],
};

export default CardTrack;
