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
import RaceDetailsSelectCar from './RaceDetailsSelectCar';
import { useOpenClose } from '../helpers/hooks';
import RaceDetailsSelectedCar from './RaceDetailsSelectedCar';

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

const ActionContent = ({
  selectedCar,
  selectedTrack,
  carsModalOpen,
  money,
  price,
  currentRace,
  startRace,
  results,
  pastRace,
  ...props
}) => (
  <Box h="100%" {...props}>
    {results && (
      <RaceResults pastRace={pastRace} padding="0 32px">
        Race again
      </RaceResults>
    )}
    {!results && !selectedCar && (
      <RaceDetailsSelectCar
        bg="grey"
        borderRadius={['0, 0, 16px, 16px', '0, 0, 16px, 16px', '0 16px 16px 0']}
        padding="16px"
        onClick={carsModalOpen}
      />
    )}

    {!results && selectedCar && (
      <>
        <RaceDetailsSelectedCar
          car={selectedCar}
          track={selectedTrack}
          carsModalOpen={carsModalOpen}
          marginTop={[0, 0, '8px']}
        />
        <Flex
          w="calc(100% - 16px)"
          h="40px"
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
        <Flex h="56px">
          <Button
            borderColor="tomato"
            color="tomato"
            variant="outline"
            isDisabled={money < price || currentRace}
            margin="auto"
            onClick={startRace}
          >
            Race
          </Button>
        </Flex>
      </>
    )}
  </Box>
);

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
      h={['auto', 'auto', '236px']}
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
          minH="236px"
          track={selectedTrack}
          borderRadius="16px 0 0 16px"
          imageBorderRadius={['16px 16px 0 0', '16px 16px 0 0', '16px 0 0 0']}
        >
          <ActionContent
            display={['block', 'block', 'none']}
            selectedCar={selectedCar}
            selectedTrack={selectedTrack}
            carsModalOpen={carsModalOpen}
            money={money}
            price={price}
            currentRace={currentRace}
            startRace={startRace}
            results={results}
            pastRace={pastRace}
            borderLeft="1px solid black"
            borderRight="1px solid black"
          />
        </CardTrackContent>
        <Box w="50%" display={['none', 'none', 'block']} position="relative">
          <ActionContent
            selectedCar={selectedCar}
            selectedTrack={selectedTrack}
            carsModalOpen={carsModalOpen}
            money={money}
            price={price}
            currentRace={currentRace}
            startRace={startRace}
            results={results}
            pastRace={pastRace}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default RaceDetails;
