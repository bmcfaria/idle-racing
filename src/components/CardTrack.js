import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  raceSelector,
  garageCarSelector,
  pastRaceSelector,
} from '../state/selectors';
import CardProgressOverlay from './CardProgressOverlay';
import CardTrackContent from './CardTrackContent';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';
import Button from './Button';

const CardTrack = ({ track, locked }) => {
  const { id, race } = track;
  const location = useLocation();
  const history = useHistory();

  const currentRace = useSelector(raceSelector(race));
  const pastRace = useSelector(pastRaceSelector(track.lastRace));
  const car = useSelector(garageCarSelector(currentRace?.car || pastRace?.car));

  // To improve mobile navigation,
  // this way the back button will un-select instead off showing the previous selected
  const setSelected = () => {
    if (locked) return;
    if (currentRace) return;

    if (location?.state?.track) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), track: id },
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), track: id },
      });
    }
  };

  return (
    <Button
      w="160px"
      h="180px"
      position="relative"
      cursor="pointer"
      borderRadius="16px"
      padding="0"
      onClick={setSelected}
    >
      {locked && (
        <Flex
          position="absolute"
          zIndex="1"
          w="100%"
          h="100%"
          bg={hexAlpha(colors.white, 0.98)}
          borderRadius="16px"
          padding="0 8px"
        >
          <Text w="100%" margin="auto 0" fontSize="24px" whiteSpace="pre-wrap">
            Win previous race to unlock
          </Text>
        </Flex>
      )}
      {currentRace && (
        <CardProgressOverlay
          zIndex="1"
          borderRadius="16px"
          race={currentRace}
          label
          car={car}
        />
      )}
      <CardTrackContent
        track={track}
        borderRadius="16px"
        imageBorderRadius="16px 16px 0 0"
      />
      {track.lastRace && (
        <Flex
          w="100%"
          h="100%"
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          padding="8px 0"
          borderRadius="16px"
          bg={hexAlpha(colors.white, 0.98)}
          color={colors.darkGray}
          position="absolute"
          top="0"
          left="0"
        >
          <Text fontSize="14px">({track?.name})</Text>
          <Text fontSize="24px">Results</Text>
          <Text fontSize="14px">({car ? car.name : '[selled car]'})</Text>
        </Flex>
      )}
    </Button>
  );
};

export default CardTrack;
