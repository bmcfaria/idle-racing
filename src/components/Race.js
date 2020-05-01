import React from 'react';
import { Box } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CardTrack from './CardTrack';
import RaceDetails from './RaceDetails';
import { useSelector } from 'react-redux';
import { tracksSelector } from '../state/selectors';
import Modal from './Modal';

const Race = () => {
  const location = useLocation();
  const tracks = useSelector(tracksSelector);

  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  return (
    <Box>
      <Modal isOpen={!!selectedTrack} backOnClose>
        <RaceDetails track={selectedTrack} />
      </Modal>
      {tracks.map(track => (
        <Box marginTop="16px" key={track.id}>
          <CardTrack track={track} key={track.id} />
        </Box>
      ))}
    </Box>
  );
};

export default Race;
