import React, { useState, useEffect, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { startRaceAction } from '../state/actions';
import RaceResults from './RaceResults';
import { useLocation, useHistory } from 'react-router-dom';
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
import { colors } from '../helpers/theme';
import RaceDetailsSelectCar from './RaceDetailsSelectCar';
import {
  useDynamicCardContainerWidth,
  useOpenClose,
  useRacePriceWithDiscount,
} from '../helpers/hooks';
import RaceDetailsSelectedCar from './RaceDetailsSelectedCar';
import {
  doMeetRequirements,
  winProbability,
  PROBABILITY_GOOD_VALUE,
} from '../helpers/utils';
import Button from './Button';
import { RaceContext } from '../helpers/context';
import RaceDetailsCarsContainer from './RaceDetailsCarsContainer';

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
          <Flex
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            padding="16px"
          >
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
  const containerWidth = useDynamicCardContainerWidth(200, 2, 0);
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
    <RaceContext.Provider
      value={{
        winProbabilityValue,
        requirements: selectedTrack?.requirements,
        prizes: selectedTrack?.prizes,
      }}
    >
      {carsModal && (
        <RaceDetailsCarsContainer
          cars={cars}
          selectCar={selectCar}
          onClose={carsModalClose}
        />
      )}

      {!carsModal && (
        <Box
          position="relative"
          overflowY={['scroll', 'scroll', 'unset']}
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

          <Box
            w={containerWidth}
            minW="200px"
            maxW={`${200 * 2 + 4}px`}
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gridGap="4px"
          >
            <CardTrackContent
              w="200px"
              track={selectedTrack}
              borderRadius="16px"
              margin="0 auto"
              large
            />
            <Box
              w="200px"
              // minH="96px"
              position="relative"
              borderRadius="16px"
              bg={colors.darkGray}
              margin="0 auto"
            >
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
          </Box>
        </Box>
      )}
    </RaceContext.Provider>
  );
};

export default RaceDetails;
