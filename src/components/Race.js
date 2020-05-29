import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardTrack from './CardTrack';
import RaceDetails from './RaceDetails';
import { useSelector, useDispatch } from 'react-redux';
import { tracksSelector } from '../state/selectors';
import Modal from './Modal';
import { closeResultsAction } from '../state/actions';
import { useDynamicCardContainerWidth } from '../helpers/hooks';

const TracksContainer = ({ tracks, ...props }) => (
  <Flex
    wrap="wrap"
    margin="0 auto"
    paddingLeft="16px"
    boxSizing="content-box"
    {...props}
  >
    {tracks.map(track => (
      <Box marginRight="16px" marginBottom="16px" key={track.id}>
        <CardTrack track={track} />
      </Box>
    ))}
  </Flex>
);

const Race = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
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
      />
      <TracksContainer
        w={`${containerWidth}px`}
        marginTop="24px"
        tracks={tracks.filter(item => item.category === 'city')}
      />

      {/* spacer */}
      <Box minH="64px" />
    </Box>
  );
};

export default Race;
