import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import CardTrack from './CardTrack';
import RaceDetails from './RaceDetails';
import { useSelector, useDispatch } from 'react-redux';
import {
  tracksSelector,
  lockedSelector,
  raceSponsorsSelector,
  trackSelector,
  dealerCarSelector,
  raceSponsorsActiveSelector,
  lockedRaceEventsSelector,
  trackStatsSelector,
} from '../state/selectors';
import Modal from './Modal';
import { closeResultsAction } from '../state/actions';
import {
  useDynamicCardContainerWidth,
  usePreviousUnlockedTrackChecker,
  usePassiveIncome,
} from '../helpers/hooks';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';
import CollapsiblePanel from './CollapsiblePanel';
import { BottomSpacer } from './BottomSpacer';
import { ReactComponent as MechanicIcon } from '../assets/icons/mechanic.svg';
import { sponsorEntryText } from '../helpers/utils';

const TracksContainer = ({ tracks, locked, ...props }) => {
  const isPreviousUnlocked = usePreviousUnlockedTrackChecker(tracks);

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
            Win a race in the previous section to unlock this one
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

const SponsorReward = ({ sponsor, ...props }) => {
  const track = useSelector(trackSelector(sponsor.track));
  const car = useSelector(dealerCarSelector(sponsor.car));
  const active = !!useSelector(raceSponsorsActiveSelector)?.[sponsor.id];

  const text = sponsorEntryText(sponsor);

  return (
    <Box
      borderRadius="16px"
      border={`1px solid ${active ? colors.darkGray : colors.lightGray}`}
      {...props}
    >
      <Flex w="160px" h="32px" borderRadius="16px" margin="-1px 0 0 -1px">
        <Flex
          w="32px"
          h="32px"
          borderRadius="16px"
          color={active ? colors.white : colors.darkGray}
          {...(active && { bg: colors.darkGray })}
        >
          {sponsor.reward !== 'mechanic' && (
            <Text
              w="100%"
              h="100%"
              textAlign="center"
              lineHeight="32px"
              fontSize="32px"
            >
              $
            </Text>
          )}
          {sponsor.reward === 'mechanic' && (
            <Box margin="auto" as={MechanicIcon} />
          )}
        </Flex>
        <Text
          h="100%"
          flexGrow="1"
          textAlign="center"
          lineHeight="32px"
          margin="-1px 0 0 -1px"
        >
          {text}
        </Text>
      </Flex>
      {track && (
        <Text textAlign="center" fontSize="14px">
          on "{track?.name}"
        </Text>
      )}
      {car && (
        <Text textAlign="center" fontSize="14px">
          with "{car?.name}"
        </Text>
      )}
    </Box>
  );
};

const Sponsors = ({ event, ...props }) => {
  const sponsors = useSelector(raceSponsorsSelector).filter(
    sponsor => sponsor.event === event
  );

  const eventPassiveIncome = usePassiveIncome(event);

  return (
    <CollapsiblePanel
      wrap="wrap"
      text={
        'Sponsors' +
        (eventPassiveIncome > 0 ? ` ($${eventPassiveIncome} /s)` : '')
      }
      open
      {...props}
    >
      {sponsors.map((sponsor, index) => (
        <SponsorReward margin="16px 0 0 8px" sponsor={sponsor} key={index} />
      ))}
    </CollapsiblePanel>
  );
};

const RaceEvent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { event } = useParams();
  const tracks = useSelector(tracksSelector).filter(
    item => item.category === event
  );
  const lockedRaceEvents = useSelector(lockedRaceEventsSelector);
  const locked = useSelector(lockedSelector);
  const containerWidth = useDynamicCardContainerWidth();

  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const trackStats = useSelector(trackStatsSelector(selectedTrackId));

  const onClose = () => {
    dispatch(closeResultsAction(trackStats?.lastRace));
    history.goBack();
  };

  return (
    <Box paddingBottom="64px">
      <Modal isOpen={!!selectedTrack} onClose={onClose}>
        <RaceDetails />
      </Modal>

      <Sponsors w={`${containerWidth - 16}px`} event={event} />

      <TracksContainer
        w={`${containerWidth}px`}
        marginTop="24px"
        tracks={tracks}
        locked={lockedRaceEvents && locked?.race[event] !== false}
      />

      <BottomSpacer />
    </Box>
  );
};

export default RaceEvent;
