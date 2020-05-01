import React, { useState } from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { startRaceAction } from '../state/actions';
import RaceResults from './RaceResults';
import { useLocation, Link, useHistory } from 'react-router-dom';
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
import { useOpenClose } from '../helpers/hooks';

const CarsContainer = styled(Flex)`
  height: 50vh;
  box-sizing: content-box;
  overflow-y: auto;
  padding-top: 28px;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 16px;

  ${cardsContainerWidthPaddingStyles}
`;

const RaceDetails = ({ track: { price, race } }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const money = useSelector(moneySelector);
  const cars = useSelector(garageCarsSelector);
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);
  const [selectedCar, setSelectedCar] = useState();

  const pastRace = useSelector(pastRaceSelector(selectedTrack.lastRace));
  const results = !!pastRace && pastRace.checked === false;

  const currentRace = useSelector(raceSelector(race));

  const [carsModal, carsModalOpen, carsModalClose] = useOpenClose();

  const startRace = () => {
    dispatch(startRaceAction(selectedCar.id, selectedTrackId));
    history.goBack();
  };

  const selectCar = car => {
    setSelectedCar(car);
    carsModalClose();
  };

  return (
    <Box
      position="relative"
      w={['304px', '304px', '608px']}
      h={['auto', 'auto', '396px']}
      maxH="calc(100vh - 2 * 64px - 2 * 8px)"
      overflowY={['scroll', 'scroll', 'unset']}
      bg="white"
      borderRadius="16px"
    >
      {currentRace && (
        <CardProgressOverlay
          zIndex="1"
          race={currentRace}
          borderRadius="16px"
        />
      )}

      <Modal isOpen={carsModal} onClose={carsModalClose}>
        <CarsContainer>
          {cars.length === 0 && (
            <Flex margin="auto" direction="column">
              <Text fontSize="24px">You need to buy a car first</Text>
              <ChakraLink
                as={Link}
                to="/dealer"
                fontSize="12px"
                color="teal.500"
                margin="8px auto 0"
              >
                go to Dealer
              </ChakraLink>
            </Flex>
          )}
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

      <Flex direction={['column', 'column', 'row']}>
        <CardTrackContent
          w="304px"
          h="396px"
          track={selectedTrack}
          borderRadius="16px 0 0 16px"
          imageBorderRadius={['16px 16px 0 0', '16px 16px 0 0', '16px 0 0 0']}
        />
        <Box w={['100%', '100%', '50%']} position="relative">
          {results && (
            <RaceResults pastRace={pastRace} padding="0 32px">
              Race again
            </RaceResults>
          )}
          {!results && !selectedCar && (
            <RaceDetailsSelectCar
              bg="grey"
              borderRadius={[
                '0, 0, 16px, 16px',
                '0, 0, 16px, 16px',
                '0 16px 16px 0',
              ]}
              padding="16px"
              onClick={carsModalOpen}
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
                  fontSize="12px"
                  color="tomato"
                  onClick={carsModalOpen}
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
              <Flex
                w="calc(100% - 16px)"
                h="72px"
                border="1px solid black"
                borderRadius="16px"
                margin="8px auto"
                position="relative"
              >
                <Text
                  w="fit-content"
                  fontSize="12px"
                  top="-10px"
                  left="16px"
                  bg="white"
                  padding="0 4px"
                  position="absolute"
                >
                  Powerups
                </Text>
                <Text fontSize="16px" margin="auto">
                  TO BE DEVELOPED
                </Text>
              </Flex>
              <Flex h="72px">
                <Button
                  borderColor="tomato"
                  color="tomato"
                  variant="outline"
                  isDisabled={money < price || currentRace}
                  margin="auto"
                  onClick={startRace}
                >
                  Race ({price > 0 ? `$${price}` : 'FREE'})
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
