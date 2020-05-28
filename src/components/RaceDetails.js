import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
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
  colors,
} from '../helpers/theme';
import RaceDetailsSelectCar from './RaceDetailsSelectCar';
import { useOpenClose } from '../helpers/hooks';
import RaceDetailsSelectedCar from './RaceDetailsSelectedCar';
import { doMeetRequirements } from '../helpers/utils';
import CardCarSmallRace from './CardCarSmallRace';
import Button from './Button';

const CarsContainer = styled(Flex)`
  height: 50vh;
  box-sizing: content-box;
  overflow-y: auto;
  padding-top: 28px;
  flex-wrap: wrap;

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
  meetsRequirements,
  ...props
}) => (
  <Flex h="100%" direction="column" {...props}>
    {results && (
      <RaceResults
        pastRace={pastRace}
        raceAgain={startRace}
        selectCar={carsModalOpen}
      />
    )}
    {!results && !selectedCar && (
      <RaceDetailsSelectCar onClick={carsModalOpen} />
    )}

    {!results && selectedCar && (
      <>
        <RaceDetailsSelectedCar
          car={selectedCar}
          track={selectedTrack}
          carsModalOpen={carsModalOpen}
        />
        <Box margin="auto auto 20px">
          <Button
            w="96px"
            isDisabled={money < price || currentRace || !meetsRequirements}
            bg={colors.white}
            color={colors.darkGray}
            _hover={{
              bg: colors.blue,
              color: colors.white,
            }}
            onClick={startRace}
          >
            Race
          </Button>
        </Box>
      </>
    )}
  </Flex>
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

  useEffect(() => {
    if (results && pastRace) {
      setSelectedCar(cars.find(car => car.id === pastRace.car));
    }
  }, [results, pastRace, cars]);

  const currentRace = useSelector(raceSelector(race));

  const [carsModal, carsModalOpen, carsModalClose] = useOpenClose();

  const meetsRequirements =
    selectedCar && doMeetRequirements(selectedCar, selectedTrack?.requirements);

  const startRace = id => {
    if (!meetsRequirements) {
      return;
    }

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
      w="320px"
      h="180px"
      overflowY={['scroll', 'scroll', 'unset']}
      bg={colors.darkGray}
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
        <Box bg="white" borderRadius="16px">
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
                <CardCarSmallRace car={car} onClick={selectCar} />
              </Box>
            ))}
          </CarsContainer>
        </Box>
      </Modal>

      <Flex direction="row">
        <CardTrackContent
          w="50%"
          track={selectedTrack}
          borderRadius="16px 0 0 16px"
        />
        <Box w="50%" position="relative">
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
            meetsRequirements={meetsRequirements}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default RaceDetails;
