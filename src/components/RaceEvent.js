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
    <Flex
      borderRadius="16px"
      minW="160px"
      h="48px"
      {...(!active && {
        bg: colors.lightGray,
      })}
      border={`1px solid ${colors.darkGray}`}
      {...props}
    >
      <Flex
        w="40px"
        h="48px"
        {...(active && {
          bg: colors.darkGray,
        })}
        borderRadius="16px 0 0 16px"
        margin="-1px 0 0 -1px"
      >
        <SponsorRewardIcon
          sponsor={sponsor}
          margin="auto"
          offlineColor={colors.darkGray}
          offlineBorderColor={colors.lightGray}
        />
      </Flex>
      <Flex
        maxW="119px"
        flexGrow="1"
        direction="column"
        justifyContent="space-around"
        color={active ? 'black' : colors.darkGray}
      >
        <Text
          textAlign="center"
          fontSize="16px"
          lineHeight="16px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {text}
        </Text>
        {track && (
          <Text
            textAlign="center"
            fontSize="14px"
            lineHeight="14px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            "{track?.name}"
          </Text>
        )}
        {car && (
          <Text
            textAlign="center"
            fontSize="14px"
            lineHeight="14px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            "{car?.name}"
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

const SponsorRewardIcon = ({
  sponsor,
  offlineColor = colors.white,
  offlineBorderColor = colors.white,
  ...props
}) => {
  const active = !!useSelector(raceSponsorsActiveSelector)?.[sponsor.id];
  return (
    <Flex
      w="24px"
      h="24px"
      borderRadius="12px"
      margin="0 2px"
      color={active ? colors.darkGray : offlineColor}
      {...(active && { bg: colors.white })}
      {...(!active && { border: `1px solid ${offlineBorderColor}` })}
      {...props}
    >
      {sponsor.reward !== 'mechanic' && (
        <Text
          w="100%"
          h="100%"
          textAlign="center"
          lineHeight="22px"
          fontSize="22px"
        >
          $
        </Text>
      )}
      {sponsor.reward === 'mechanic' && (
        <Box maxW="16px" maxH="16px" margin="auto" as={MechanicIcon} />
      )}
    </Flex>
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
      secondaryLine={sponsors.map(sponsor => (
        <SponsorRewardIcon sponsor={sponsor} key={sponsor.id} />
      ))}
      padding="8px 0 4px 0"
      {...props}
    >
      {sponsors.map(sponsor => (
        <SponsorReward margin="4px 4px" sponsor={sponsor} key={sponsor.id} />
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
