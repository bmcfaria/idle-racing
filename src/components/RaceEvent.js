import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import CardTrack from './CardTrack';
import RaceDetails from './RaceDetails';
import { useSelector, useDispatch } from 'react-redux';
import { tracksSelector } from '../state/selectors';
import Modal from './Modal';
import { closeResultsAction } from '../state/actions';
import {
  useDynamicCardContainerWidth,
  useHistoryHelper,
} from '../helpers/hooks';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';
import { BottomSpacer } from './BottomSpacer';
import RaceEventSponsors from './RaceEventSponsors';
import {
  useEventsLockedState,
  usePreviousUnlockedTrackChecker,
  useTrackStats,
} from '../helpers/hooksRace';

const TracksContainer = ({ tracks, eventType, ...props }) => {
  const isPreviousUnlocked = usePreviousUnlockedTrackChecker(tracks);

  const { isLocked, lockedText } = useEventsLockedState();
  const locked = isLocked(eventType);
  const lockedTextValue = lockedText(eventType);

  return (
    <Flex
      wrap="wrap"
      margin="0 auto"
      boxSizing="content-box"
      borderRadius="16px"
      paddingLeft="16px"
      position="relative"
      {...props}
    >
      {tracks.map((track, index) => (
        <Box marginRight="16px" marginBottom="16px" key={track.id}>
          <CardTrack
            track={track}
            locked={!locked && !isPreviousUnlocked(index)}
          />
        </Box>
      ))}
      {locked && (
        <Flex
          w="100%"
          h="100%"
          top="0"
          left="0"
          position="absolute"
          borderRadius="16px"
          bg={hexAlpha(colors.lightGray, 0.98)}
        >
          <Text fontSize="24px" textAlign="center" margin="auto">
            {lockedTextValue || 'Locked'}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

const RaceEvent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistoryHelper();
  const { event } = useParams();
  const tracks = useSelector(tracksSelector).filter(
    item => item.category === event
  );
  const containerWidth = useDynamicCardContainerWidth();

  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const trackStats = useTrackStats(selectedTrackId);

  const onClose = () => {
    dispatch(closeResultsAction(trackStats?.lastRace));
    history.goBack();
  };

  return (
    <Box paddingBottom="64px">
      <Modal isOpen={!!selectedTrack} onClose={onClose}>
        <RaceDetails onClose={onClose} />
      </Modal>

      <RaceEventSponsors w={`${containerWidth - 16}px`} event={event} />

      <TracksContainer
        w={`${containerWidth}px`}
        marginTop="24px"
        tracks={tracks}
        eventType={event}
      />

      <BottomSpacer />
    </Box>
  );
};

export default RaceEvent;
