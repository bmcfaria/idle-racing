import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { startRaceAction } from '../state/actions';
import RaceResults from './RaceResults';
import { useLocation } from 'react-router-dom';
import {
  raceSelector,
  garageCarsSelector,
  tracksSelector,
  moneySelector,
  pastRaceSelector,
} from '../state/selectors';
import { winProbability } from '../helpers/utils';

const RaceDetails = ({
  track: { name, type, image, prizes, duration, price, race },
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const money = useSelector(moneySelector);
  const cars = useSelector(garageCarsSelector);
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedCarId = location?.state?.car;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);
  const selectedCar = cars.find(item => item.id === selectedCarId);

  const pastRace = useSelector(pastRaceSelector(selectedTrack.lastRace));
  const results = !!pastRace && pastRace.checked === false;

  const currentRace = useSelector(raceSelector(race));

  const winProbabilityValue = winProbability(selectedCar, selectedTrack);

  const startRace = () => {
    dispatch(startRaceAction(selectedCarId, selectedTrackId));
  };

  return (
    <Box position="relative" w="16rem">
      {currentRace && <CardProgressOverlay race={currentRace} />}
      {results && <RaceResults zIndex="1" pastRace={pastRace} />}

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
          Win probability: {winProbabilityValue}%
        </Text>
        <Text textAlign="center" w="100%" fontSize="xs">
          (Try upgrading your car or use a better one, to improve your chances
          of winning)
        </Text>
        <Button
          borderColor="tomato"
          color="tomato"
          variant="outline"
          isDisabled={money < price || currentRace}
          marginTop="0.2rem"
          marginLeft="auto"
          marginRight="auto"
          onClick={startRace}
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
  handling: {},
};

export default RaceDetails;
