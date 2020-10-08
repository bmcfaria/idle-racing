import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { tracksSelector, raceByTrackSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import { colors } from '../helpers/theme';
import getImageTrack from '../helpers/imageMappingTracks';
import CardBig from './CardBig';
import CardProgressOverlay from './CardProgressOverlay';
import { capitalize } from '../helpers/utils';
import { usePassiveIncomeEventSponsors } from '../helpers/hooks';
import {
  useEventsLockedState,
  useEventTracksStatsState,
  usePreviousUnlockedTrackChecker,
  useTrackStatsState,
} from '../helpers/hooksRace';

const TrackItem = ({ track, active = true, ...props }) => {
  const race = useSelector(raceByTrackSelector(track.id));
  const trackStateState = useTrackStatsState(track.id);

  const { raced, won, won10 } = trackStateState;

  return (
    <Flex {...props}>
      <Box position="relative">
        <Box
          w="100%"
          h="100%"
          padding="4px"
          color={active ? colors.darkGray : colors.lightGray}
          as={getImageTrack(track)}
        />
        <CardProgressOverlay circleSize="40px" race={race} />
      </Box>

      <Box margin="auto 0">
        <Box
          w="8px"
          h="8px"
          border={`1px solid ${raced ? colors.darkGray : colors.lightGray}`}
          {...(raced && { bg: colors.orange })}
        />
        <Box
          w="8px"
          h="8px"
          border={`1px solid ${won ? colors.darkGray : colors.lightGray}`}
          {...(won && { bg: colors.green })}
          marginTop="2px"
        />
        <Box
          w="8px"
          h="8px"
          border={`1px solid ${won10 ? colors.darkGray : colors.lightGray}`}
          {...(won10 && { bg: colors.lightBlue })}
          marginTop="2px"
        />
      </Box>
    </Flex>
  );
};

const CardRaceEvent = ({ eventType, eventName, ...props }) => {
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const tracksStatsState = useEventTracksStatsState(eventType);
  const eventPassiveIncome = usePassiveIncomeEventSponsors(eventType);

  const { isLocked, lockedText } = useEventsLockedState();
  const locked = isLocked(eventType);
  const lockedTextValue = lockedText(eventType);

  const eventRaces = tracks
    .filter(item => item.category === eventType)
    .slice(0, 9);

  const isPreviousUnlocked = usePreviousUnlockedTrackChecker(eventRaces);

  const divider = ~~((eventRaces.length - 1) / 3 + 1);

  const columns =
    (eventRaces.length > 2 && 3) || (eventRaces.length > 1 && 2) || 1;

  const onClick = e => {
    e.stopPropagation();
    history.push(location.pathname + '/' + eventType);
  };

  const secondaryText =
    (locked && 'Locked') ||
    (eventPassiveIncome > 0 && `Sponsor: $${eventPassiveIncome}/s`) ||
    '(No sponsors)';

  const secondaryColor =
    (tracksStatsState.won10 && colors.lightBlue) ||
    (tracksStatsState.won && colors.green) ||
    (tracksStatsState.raced && colors.orange) ||
    colors.lightGray;

  return (
    <CardBig
      onClick={onClick}
      primaryText={capitalize(eventName)}
      secondaryText={secondaryText}
      theme={{
        primaryBg: tracksStatsState.everRaced
          ? colors.darkGray
          : colors.lightGray,
        secondaryBg: secondaryColor,
        primaryColor: tracksStatsState.everRaced ? colors.white : 'black',
      }}
      position="relative"
      {...props}
    >
      {eventRaces.map((track, index) => (
        <TrackItem
          w={`${100 / columns}%`}
          h={`${~~(100 / divider)}%`}
          key={track.id}
          track={track}
          active={!locked && isPreviousUnlocked(index)}
        />
      ))}
      {locked && (
        <Flex w="100%" h="120px" left="0" top="0" position="absolute">
          <Text w="100%" margin="auto 0" fontSize="24px" whiteSpace="pre-wrap">
            {lockedTextValue || 'Locked'}
          </Text>
        </Flex>
      )}
    </CardBig>
  );
};

export default CardRaceEvent;
