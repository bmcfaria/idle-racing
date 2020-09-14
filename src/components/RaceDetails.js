import React, { useState, useEffect, useContext } from 'react';
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
  pastRaceSelector,
  autoRaceEnabledSelector,
  enoughMoneySelector,
  trackStatsSelector,
} from '../state/selectors';
import CardTrackContent from './CardTrackContent';
import Modal from './Modal';
import { colors } from '../helpers/theme';
import RaceDetailsSelectCar from './RaceDetailsSelectCar';
import {
  useOpenClose,
  useDynamicCardContainerWidth,
  useRacePriceWithDiscount,
} from '../helpers/hooks';
import RaceDetailsSelectedCar from './RaceDetailsSelectedCar';
import {
  doMeetRequirements,
  winProbability,
  PROBABILITY_GOOD_VALUE,
} from '../helpers/utils';
import CardCarSmallRace from './CardCarSmallRace';
import Button from './Button';
import { RaceContext } from '../helpers/context';

const CarsContainer = ({ cars, selectCar, onClose, ...props }) => {
  const containerWidth = useDynamicCardContainerWidth();

  return (
    <Flex
      position="absolute"
      left="0"
      right="0"
      top="0"
      bottom="0"
      paddingTop={`${48 + 40 + 16}px`}
      paddingBottom="80px"
      borderRadius="16px"
      overflowX="hidden"
      onClick={onClose}
    >
      <Flex
        w={`${containerWidth}px`}
        minH="240px"
        wrap="wrap"
        margin="auto"
        paddingTop="16px"
        paddingLeft="16px"
        boxSizing="content-box"
        borderRadius="16px"
        bg={colors.white}
        {...props}
      >
        {cars.length === 0 && (
          <Flex margin="auto" direction="column">
            <Text textAlign="center" fontSize="24px">
              You need to buy a car first
            </Text>
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
          <Box marginRight="16px" marginBottom="16px" key={car.id}>
            <CardCarSmallRace car={car} onClick={selectCar} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

const ActionContent = ({
  selectedCar,
  selectedTrack,
  carsModalOpen,
  enoughMoney,
  currentRace,
  startRace,
  results,
  pastRace,
  meetsRequirements,
  ...props
}) => {
  const autoEnabled = useSelector(autoRaceEnabledSelector);

  const [auto, setAuto] = useState();
  const { winProbabilityValue } = useContext(RaceContext);

  const goodChances = winProbabilityValue === PROBABILITY_GOOD_VALUE;

  const toggleAuto = () => {
    setAuto(!auto);
  };

  const startRaceWithAuto = () => {
    startRace(auto);
  };

  return (
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
          <Flex margin="auto auto 20px">
            {autoEnabled && (
              <Button
                w="32px"
                minW="32px"
                h="32px"
                padding="0"
                isDisabled={!goodChances}
                bg={auto ? colors.blue : colors.white}
                color={auto ? colors.white : colors.darkGray}
                {...(auto && { boxShadow: 'none' })}
                _hover={{
                  bg: colors.blue,
                  color: colors.white,
                  boxShadow: 'none',
                }}
                fontSize="12px"
                whiteSpace={'normal'}
                onClick={toggleAuto}
              >
                Auto {auto ? 'ON' : 'OFF'}
              </Button>
            )}
            <Button
              w="96px"
              {...(autoEnabled && { marginLeft: '12px' })}
              isDisabled={!enoughMoney || currentRace || !meetsRequirements}
              bg={colors.white}
              color={colors.darkGray}
              _hover={{
                bg: colors.blue,
                color: colors.white,
                boxShadow: 'none',
              }}
              onClick={startRaceWithAuto}
            >
              Race
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

const RaceDetails = props => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const cars = useSelector(garageCarsSelector);
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const calculatedPrice = ~~useRacePriceWithDiscount(selectedTrack.price);
  const enoughMoney = useSelector(enoughMoneySelector(calculatedPrice));

  const [selectedCar, setSelectedCar] = useState();

  const trackStats = useSelector(trackStatsSelector(selectedTrackId));
  const pastRace = useSelector(pastRaceSelector(trackStats?.lastRace));
  const results = !!pastRace && pastRace.checked === false;

  const winProbabilityValue =
    selectedTrack && selectedCar && winProbability(selectedCar, selectedTrack);

  useEffect(() => {
    if (results && pastRace) {
      setSelectedCar(cars.find(car => car.id === pastRace.car));
    }
  }, [results, pastRace, cars]);

  const currentRace = useSelector(raceSelector(trackStats?.race));

  const [carsModal, carsModalOpen, carsModalClose] = useOpenClose();

  const meetsRequirements =
    selectedCar && doMeetRequirements(selectedCar, selectedTrack?.requirements);

  const startRaceDispatch = (carId, trackId, auto) => {
    if (!meetsRequirements) {
      return;
    }

    dispatch(startRaceAction(carId, trackId, auto));
    history.goBack();
  };

  const startRace = auto => {
    // auto === true to prevent event argument if passed directly in onClick
    startRaceDispatch(selectedCar.id, selectedTrackId, auto === true);
  };

  const selectCar = car => {
    setSelectedCar(car);
    carsModalClose();
  };

  return (
    <RaceContext.Provider value={{ winProbabilityValue }}>
      <Box
        position="relative"
        w="320px"
        h="180px"
        overflowY={['scroll', 'scroll', 'unset']}
        bg={colors.darkGray}
        borderRadius="16px"
        {...props}
      >
        {currentRace && (
          <CardProgressOverlay
            zIndex="1"
            race={currentRace}
            borderRadius="16px"
          />
        )}

        <Modal isOpen={carsModal} onClose={carsModalClose} bg="none">
          <CarsContainer
            cars={cars}
            selectCar={selectCar}
            onClose={carsModalClose}
          />
        </Modal>

        <Flex direction="row">
          <CardTrackContent w="50%" track={selectedTrack} borderRadius="16px" />
          <Box w="50%" position="relative">
            <ActionContent
              selectedCar={selectedCar}
              selectedTrack={selectedTrack}
              carsModalOpen={carsModalOpen}
              enoughMoney={enoughMoney}
              currentRace={currentRace}
              startRace={startRace}
              results={results}
              pastRace={pastRace}
              meetsRequirements={meetsRequirements}
            />
          </Box>
        </Flex>
      </Box>
    </RaceContext.Provider>
  );
};

export default RaceDetails;
