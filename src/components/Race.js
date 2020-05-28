import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardTrack from './CardTrack';
import RaceDetails from './RaceDetails';
import { useSelector, useDispatch } from 'react-redux';
import { tracksSelector } from '../state/selectors';
import Modal from './Modal';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import { closeResultsAction } from '../state/actions';

const AccordionContent = ({ tracks }) => (
  <>
    {tracks.map(track => (
      <AccordionItem key={track.id}>
        <CardTrack track={track} />
      </AccordionItem>
    ))}
  </>
);

const Race = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const [selectedAccordion, setSelectedAccordion] = useState(0);

  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  const onClose = () => {
    const track = tracks.find(element => element.id === location?.state.track);
    dispatch(closeResultsAction(track?.lastRace));
    history.goBack();
  };

  return (
    <Box>
      <Modal isOpen={!!selectedTrack} onClose={onClose}>
        <RaceDetails track={selectedTrack} />
      </Modal>
      <Accordion
        name="Free races"
        value={0}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
      >
        <AccordionContent
          tracks={tracks.filter(item => item.category === 'free')}
        />
      </Accordion>
      <Accordion
        name="City races"
        value={1}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
        marginTop="16px"
      >
        <AccordionContent
          tracks={tracks.filter(item => item.category === 'city')}
        />
      </Accordion>
    </Box>
  );
};

export default Race;
