import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CardTrack from './CardTrack';
import RaceDetails from './RaceDetails';
import { useSelector } from 'react-redux';
import { tracksSelector } from '../state/selectors';
import Modal from './Modal';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';

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
  const location = useLocation();
  const tracks = useSelector(tracksSelector);
  const [selectedAccordion, setSelectedAccordion] = useState(0);

  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);

  return (
    <Box>
      <Modal isOpen={!!selectedTrack} backOnClose>
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
        name="Basic races"
        value={1}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
        marginTop="16px"
      >
        <AccordionContent
          tracks={tracks.filter(item => item.category === 'basic')}
        />
      </Accordion>
    </Box>
  );
};

export default Race;
