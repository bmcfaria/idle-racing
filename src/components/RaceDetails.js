import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import { useDispatch, useSelector } from 'react-redux';
import {
  generateTrackCompetitorsAction,
  startRaceAction,
} from '../state/actions';
import RaceResults from './RaceResults';
import { useLocation } from 'react-router-dom';
import {
  garageCarsSelector,
  tracksSelector,
  enoughMoneySelector,
} from '../state/selectors';
import CardTrackContent from './CardTrackContent';
import { colors } from '../helpers/theme';
import RaceDetailsSelectCar from './RaceDetailsSelectCar';
import {
  useDynamicCardContainerWidth,
  useHistoryHelper,
  useOpenClose,
  useRacePriceWithDiscount,
} from '../helpers/hooks';
import { RaceContext } from '../helpers/context';
import RaceDetailsCarsContainer from './RaceDetailsCarsContainer';
import RaceDetailsReady from './RaceDetailsReady';
import {
  usePastRace,
  useRace,
  useTrackStats,
  useWinProbability,
} from '../helpers/hooksRace';
import { doMeetRequirements } from '../helpers/race';

const BlockContainer = ({ borderColor, children, ...props }) => (
  <Box
    w="200px"
    position="relative"
    borderRadius="16px"
    bg={colors.darkGray}
    margin="0 auto"
    onClick={e => e.stopPropagation()}
    {...(borderColor && { border: `1px solid ${borderColor}` })}
    {...props}
  >
    {children}
  </Box>
);

const RaceDetails = ({ onClose, ...props }) => {
  const containerWidth = useDynamicCardContainerWidth(200, 2, 0);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistoryHelper();
  const cars = useSelector(garageCarsSelector);
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const calculatedPrice = ~~useRacePriceWithDiscount(selectedTrack.price);
  const enoughMoney = useSelector(enoughMoneySelector(calculatedPrice));

  const [selectedCar, setSelectedCar] = useState();

  const trackStats = useTrackStats(selectedTrackId);
  const pastRace = usePastRace(trackStats?.lastRace);
  const results = !!pastRace && pastRace.checked === false;

  const winProbability = useWinProbability(selectedCar, selectedTrack);

  const winProbabilityValue = selectedTrack && selectedCar && winProbability;

  useEffect(() => {
    // Generate competitors if race doesn't have it yet
    if (!trackStats?.competitors) {
      dispatch(generateTrackCompetitorsAction(selectedTrack.id));
    }
  }, [dispatch, selectedTrack.id, trackStats, trackStats?.competitors]);

  useEffect(() => {
    if (results && pastRace) {
      setSelectedCar(cars.find(car => car.id === pastRace.car));
    }
  }, [results, pastRace, cars]);

  const currentRace = useRace(trackStats?.race);

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
        trackId: selectedTrack?.id,
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
            onClick={onClose}
          >
            <BlockContainer>
              <CardTrackContent
                track={selectedTrack}
                borderRadius="16px"
                margin="0 auto"
                large
              />
            </BlockContainer>

            {!selectedCar && (
              <BlockContainer>
                <RaceDetailsSelectCar onClick={carsModalOpen} />
              </BlockContainer>
            )}

            {selectedCar && (
              <BlockContainer>
                <RaceDetailsReady
                  selectedCar={selectedCar}
                  selectedTrack={selectedTrack}
                  carsModalOpen={carsModalOpen}
                  enoughMoney={enoughMoney}
                  currentRace={currentRace}
                  startRace={startRace}
                  meetsRequirements={meetsRequirements}
                  again={!!pastRace}
                />
              </BlockContainer>
            )}

            <BlockContainer>
              <RaceResults />
            </BlockContainer>
          </Box>
        </Box>
      )}
    </RaceContext.Provider>
  );
};

export default RaceDetails;
