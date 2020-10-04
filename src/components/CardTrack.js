import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  raceSelector,
  garageCarSelector,
  pastRaceSelector,
  trackStatsSelector,
} from '../state/selectors';
import CardProgressOverlay from './CardProgressOverlay';
import CardTrackContent from './CardTrackContent';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';
import Button from './Button';

const CardTrack = ({ track, locked }) => {
  const { id } = track;
  const location = useLocation();
  const history = useHistory();

  const trackStats = useSelector(trackStatsSelector(track.id));
  const currentRace = useSelector(raceSelector(trackStats?.race));
  const pastRace = useSelector(pastRaceSelector(trackStats?.lastRace));
  const car = useSelector(garageCarSelector(currentRace?.car || pastRace?.car));

  // To improve mobile navigation,
  // this way the back button will un-select
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
            Race previous track to unlock
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
          showSeconds
        />
      )}
      <CardTrackContent
        track={track}
        borderRadius="16px"
        imageBorderRadius="16px 16px 0 0"
        results={trackStats?.lastRace}
      />
    </Button>
  );
};

export default CardTrack;
