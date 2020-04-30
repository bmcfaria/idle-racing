import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import { raceSelector, tracksSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import CardCarSmallContent from './CardCarSmallContent';
import CardWinningChance from './CardWinningChance';

const CardCarSmall = ({ car, stripped, onClick, showPrice, ...props }) => {
  const { id, race, price } = car;
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const currentRace = useSelector(raceSelector(race));

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
      {showPrice && (
        <Flex w="100%" h="124px" borderRadius="16px" bg="black" color="white">
          <Text
            fontSize="14px"
            lineHeight="24px"
            textAlign="center"
            w="100%"
            marginTop="auto"
          >
            ${price}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default CardCarSmall;
