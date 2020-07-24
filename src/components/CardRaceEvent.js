import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import {
  tracksSelector,
  raceByTrackSelector,
  raceSponsorsActiveCountSelector,
  lockedSelector,
} from '../state/selectors';
import { useSelector } from 'react-redux';
import { colors } from '../helpers/theme';
import getImageTrack from '../helpers/imageMappingTracks';
import CardBig from './CardBig';
import CardProgressOverlay from './CardProgressOverlay';

const TrackItem = ({ track, active = true, ...props }) => {
  const race = useSelector(raceByTrackSelector(track.id));

  const raced = track?.stats?.raced;
  const won = track?.stats?.won > 0;
  const won100 = track?.stats?.won >= 100;

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
          border={`1px solid ${won100 ? colors.darkGray : colors.lightGray}`}
          {...(won100 && { bg: colors.lightBlue })}
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
  const activeSponsors = useSelector(
    raceSponsorsActiveCountSelector(eventType)
  );
  const locked = useSelector(lockedSelector)?.race[eventType];

  const eventRaces = tracks
    .filter(item => item.category === eventType)
    .slice(0, 9);

  const divider = ~~((eventRaces.length - 1) / 3 + 1);

  const columns =
    (eventRaces.length > 2 && 3) || (eventRaces.length > 1 && 2) || 1;

  const onClick = () => {
    history.push(location.pathname + '/' + eventType);
  };

  const secondaryText =
    (locked && 'Locked') ||
    (activeSponsors > 0 && `Sponsor: $${activeSponsors} /s`) ||
    'No sponsors';

  const isPreviousUnlocked = index =>
    index === 0 || eventRaces[index - 1]?.stats?.won > 0;

  return (
    <CardBig
      onClick={onClick}
      primaryText={eventName}
      secondaryText={secondaryText}
      theme={{ primaryBg: colors.darkGray, primaryColor: colors.white }}
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
            Win a race in the previous section to unlock this one
          </Text>
        </Flex>
      )}
    </CardBig>
  );
};

export default CardRaceEvent;
