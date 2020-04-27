import React, { useState } from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { startRaceAction } from '../state/actions';
import RaceResults from './RaceResults';
import { useLocation, Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import {
  raceSelector,
  garageCarsSelector,
  tracksSelector,
  moneySelector,
  pastRaceSelector,
} from '../state/selectors';
import styled from '@emotion/styled';
import CardTrackContent from './CardTrackContent';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import {
  cardsContainerWidthPaddingStyles,
  CARD_MARGIN,
} from '../helpers/theme';
import CardCarSmallContent from './CardCarSmallContent';
import CardWinningChance from './CardWinningChance';
import RaceDetailsSelectCar from './RaceDetailsSelectCar';

const CarsContainer = styled(Flex)`
  height: 50vh;
  box-sizing: content-box;
  overflow-y: scroll;
  padding-top: 28px;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 16px;

  ${cardsContainerWidthPaddingStyles}
`;

const RaceDetails = ({ track: { price, race } }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const money = useSelector(moneySelector);
  const cars = useSelector(garageCarsSelector);
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);
  const [selectedCar, setSelectedCar] = useState();

  const pastRace = useSelector(pastRaceSelector(selectedTrack.lastRace));
  const results = !!pastRace && pastRace.checked === false;

  const currentRace = useSelector(raceSelector(race));

  const [carsModal, setCarsModal] = useState();

  const startRace = () => {
    dispatch(startRaceAction(selectedCar.id, selectedTrackId));
  };

  const selectCar = car => {
    setSelectedCar(car);
    setCarsModal(false);
  };

  return (
    <Box position="relative" w="608px" bg="white" borderRadius="16px">
      {currentRace && <CardProgressOverlay zIndex="1" race={currentRace} />}

      <Modal isOpen={carsModal} onClose={() => setCarsModal(false)}>
        <CarsContainer>
          {cars.map(car => (
            <Box
              key={car.id}
              marginRight={`${CARD_MARGIN}px`}
              marginBottom={`${CARD_MARGIN}px`}
            >
              <CardCarSmall car={car} onClick={selectCar} />
            </Box>
          ))}
        </CarsContainer>
      </Modal>

      <Flex>
        <CardTrackContent
          track={selectedTrack}
          borderRadius="16px 0 0 16px"
          imageBorderRadius="16px 0 0 0"
        />
        <Box w="50%" position="relative">
          {results && <RaceResults pastRace={pastRace}>Race again</RaceResults>}
          {!results && !selectedCar && (
            <RaceDetailsSelectCar
              bg="grey"
              borderRadius="0 16px 16px 0"
              onClick={() => setCarsModal(true)}
            />
          )}
          {!results && selectedCar && (
            <>
              <CardCarSmallContent
                car={selectedCar}
                marginTop="32px"
                padding="0 16px"
              />
              <CardWinningChance
                car={selectedCar}
                track={selectedTrack}
                borderRadius="16px"
                border="1px solid black"
                w="calc(100% - 16px)"
                h="24px"
                margin="0 auto"
              />
              <Flex
                w="100%"
                h="32px"
                padding="0 8px"
                justifyContent="space-between"
                alignItems="center"
              >
                <ChakraLink
                  as={Link}
                  to={{ pathname: '/garage', state: { car: selectedCar.id } }}
                  fontSize="12px"
                  color="tomato"
                >
                  Change car
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to={{ pathname: '/garage', state: { car: selectedCar.id } }}
                  fontSize="12px"
                  color="teal.500"
                >
                  Open in Garage
                </ChakraLink>
              </Flex>
              <Box h="40px">
                <Text textAlign="center" w="100%" fontSize="12px">
                  (Try upgrading your car or use a better one, to improve your
                  chances of winning)
                </Text>
              </Box>
              <Box
                w="calc(100% - 16px)"
                h="72px"
                border="1px solid black"
                borderRadius="16px"
                margin="8px auto"
              >
                <Text
                  w="fit-content"
                  fontSize="12px"
                  bg="white"
                  margin="-10px 0 0 16px"
                  padding="0 4px"
                >
                  Powerups
                </Text>
              </Box>
              <Flex h="72px">
                <Button
                  borderColor="tomato"
                  color="tomato"
                  variant="outline"
                  isDisabled={money < price || currentRace}
                  margin="auto"
                  onClick={startRace}
                >
                  Race (${price})
                </Button>
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default RaceDetails;
