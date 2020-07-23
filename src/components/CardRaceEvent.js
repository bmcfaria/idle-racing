import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import {
  tracksSelector,
  raceByTrackSelector,
  raceSponsorsActiveCountSelector,
} from '../state/selectors';
import { useSelector } from 'react-redux';
import { colors } from '../helpers/theme';
import getImageTrack from '../helpers/imageMappingTracks';
import CardBig from './CardBig';
import CardProgressOverlay from './CardProgressOverlay';

const TrackItem = ({ track, ...props }) => {
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
          color={colors.darkGray}
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

  const eventRaces = tracks
    .filter(item => item.category === eventType)
    .slice(0, 9);

  const divider = ~~((eventRaces.length - 1) / 3 + 1);

  const columns =
    (eventRaces.length > 2 && 3) || (eventRaces.length > 1 && 2) || 1;

  const onClick = () => {
    history.push(location.pathname + '/' + eventType);
  };

  return (
    <CardBig
      onClick={onClick}
      primaryText={eventName}
      secondaryText={`Sponsor: $${activeSponsors * 5}${
        activeSponsors > 0 ? ' / 5s' : ''
      }`}
      theme={{ primaryBg: colors.darkGray, primaryColor: colors.white }}
      {...props}
    >
      {eventRaces.map(track => (
        <TrackItem
          w={`${100 / columns}%`}
          h={`${~~(100 / divider)}%`}
          key={track.id}
          track={track}
        />
      ))}
    </CardBig>
  );
};

export default CardRaceEvent;
