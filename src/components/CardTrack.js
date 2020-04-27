import React from 'react';
import { Box } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { raceSelector } from '../state/selectors';
import CardProgressOverlay from './CardProgressOverlay';
import CardTrackContent from './CardTrackContent';

const CardTrack = ({ track }) => {
  const { id, race } = track;
  const location = useLocation();
  const history = useHistory();

  const currentRace = useSelector(raceSelector(race));

  // To improve mobile navigation,
  // this way the back button will un-select instead off showing the previous selected
  const setSelected = () => {
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
    <Box w="304px" h="396px" position="relative" onClick={setSelected}>
      {location?.state?.track === id && (
        <Box
          position="absolute"
          w="100%"
          h="100%"
          bg="#B2F5EA77"
          borderRadius="16px"
        />
      )}
      {currentRace && <CardProgressOverlay race={currentRace} />}
      <CardTrackContent
        track={track}
        borderRadius="16px"
        imageBorderRadius="16px 16px 0 0"
      />
    </Box>
  );
};

CardTrack.defaultProps = {
  prizes: [],
};

export default CardTrack;
