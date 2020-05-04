import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CarDealerDetails from './CarDealerDetails';
import { useSelector } from 'react-redux';
import { dealerCarsSelector } from '../state/selectors';
import Modal from './Modal';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import CardCarSmall from './CardCarSmall';

const AccordionContent = ({ cars }) => (
  <>
    {cars.map(car => (
      <AccordionItem key={car.id}>
        <CardCarSmall car={car} showPrice />
      </AccordionItem>
    ))}
  </>
);

const Dealer = () => {
  const location = useLocation();
  const cars = useSelector(dealerCarsSelector);
  const [selectedAccordion, setSelectedAccordion] = useState(0);

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  return (
    <Box>
      <Modal isOpen={!!selectedCar} backOnClose>
        {selectedCar && <CarDealerDetails car={selectedCar} />}
      </Modal>
      <Accordion
        name="Basic cars"
        value={0}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
      >
        <AccordionContent cars={cars.filter(item => item.brand === 'basic')} />
      </Accordion>
      <Accordion
        name="City cars"
        value={1}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
        marginTop="16px"
      >
        <AccordionContent cars={cars.filter(item => item.brand === 'city')} />
      </Accordion>
      <Accordion
        name="Track cars"
        value={2}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
        marginTop="16px"
      >
        <AccordionContent cars={cars.filter(item => item.brand === 'track')} />
      </Accordion>
    </Box>
  );
};

export default Dealer;
