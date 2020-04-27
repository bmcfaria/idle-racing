import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import { raceSelector, tracksSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import { winProbability } from '../helpers/utils';
import CardCarSmallContent from './CardCarSmallContent';
import CardWinningChance from './CardWinningChance';

const colors = {
  green: '#00FF479E',
  yellow: '#FFF5009E',
  red: '#FF00009E',
  gray: '#9B9B9B9E',
};

const winningChances = {
  0: { text: 'BAD', color: colors.red },
  1: { text: 'MAYBE', color: colors.yellow },
  2: { text: 'AVERAGE', color: colors.yellow },
  3: { text: 'GOOD', color: colors.green },
  na: { text: 'N/A', color: colors.gray },
};

const CardCarSmall = ({ car, stripped, onClick, ...props }) => {
  const { id, race } = car;
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const currentRace = useSelector(raceSelector(race));

  // TODO: not handling N/A yet
  const winProbabilityValue =
    selectedTrack && winProbability(car, selectedTrack);

  // To improve mobile navigation,
  // this way the back button will un-select instead off showing the previous selected
  const setSelected = () => {
    if (onClick) {
      onClick(car);

      return;
    }

    if (currentRace) return;

    if (location?.state?.car) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), car: id },
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), car: id },
      });
    }
  };

  return (
    <Box
      minW="304px"
      w="304px"
      minH="100px"
      position="relative"
      onClick={setSelected}
      {...props}
    >
      <Box w="100%" h="100px" position="absolute">
        {location?.state?.car === id && (
          <Box
            position="absolute"
            w="100%"
            h="100%"
            borderRadius="16px"
            bg="#B2F5EA77"
          />
        )}
        {currentRace && (
          <CardProgressOverlay race={currentRace} label borderRadius="16px" />
        )}
        <CardCarSmallContent
          padding="0 16px"
          bg="white"
          {...(!stripped && {
            border: '1px solid black',
            borderRadius: '16px',
          })}
          car={car}
        />
      </Box>
      {selectedTrack && (
        <CardWinningChance
          car={car}
          track={selectedTrack}
          w="100%"
          h="124px"
          borderRadius="16px"
          border="1px solid black"
        />
      )}
    </Box>
  );
};

export default CardCarSmall;
