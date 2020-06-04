import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardTrack from './CardTrack';
import RaceDetails from './RaceDetails';
import { useSelector, useDispatch } from 'react-redux';
import { tracksSelector, lockedSelector } from '../state/selectors';
import Modal from './Modal';
import { closeResultsAction } from '../state/actions';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';

const TracksContainer = ({ tracks, locked, ...props }) => (
  <Flex
    wrap="wrap"
    margin="0 auto"
    paddingTop="16px"
    paddingLeft="16px"
    boxSizing="content-box"
    borderRadius="16px"
    border={`1px solid ${colors.lightGray}`}
    position="relative"
    {...props}
  >
    {tracks.map(track => (
      <Box marginRight="16px" marginBottom="16px" key={track.id}>
        <CardTrack track={track} />
      </Box>
    ))}
    {locked && (
      <Flex
        w="100%"
        h="100%"
        top="-0"
        left="-0"
        position="absolute"
        borderRadius="16px"
        bg={hexAlpha(colors.lightGray, 0.95)}
      >
        <Text fontSize="24px" textAlign="center" margin="auto">
          Win a race in the previous section to unlock this one
        </Text>
      </Flex>
    )}
  </Flex>
);

const Race = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const locked = useSelector(lockedSelector);
  const containerWidth = useDynamicCardContainerWidth();

  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const onClose = () => {
    const track = tracks.find(element => element.id === location?.state.track);
    dispatch(closeResultsAction(track?.lastRace));
    history.goBack();
  };

  return (
    <Box paddingBottom="64px">
      <Modal isOpen={!!selectedTrack} onClose={onClose}>
        <RaceDetails track={selectedTrack} />
      </Modal>

      <TracksContainer
        w={`${containerWidth}px`}
        tracks={tracks.filter(item => item.category === 'free')}
        locked={locked?.race.free}
      />
      <TracksContainer
        w={`${containerWidth}px`}
        marginTop="24px"
        tracks={tracks.filter(item => item.category === 'city')}
        locked={locked?.race.city}
      />
      <TracksContainer
        w={`${containerWidth}px`}
        marginTop="24px"
        tracks={tracks.filter(item => item.category === 'offroad')}
        locked={locked?.race.offroad}
      />
      <TracksContainer
        w={`${containerWidth}px`}
        marginTop="24px"
        tracks={tracks.filter(item => item.category === 'track')}
        locked={locked?.race.track}
      />

      {/* spacer */}
      <Box minH={['80px', '64px']} />
    </Box>
  );
};

export default Race;
