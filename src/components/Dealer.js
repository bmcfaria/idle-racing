import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CarDealerDetails from './CarDealerDetails';
import { useSelector } from 'react-redux';
import { dealerCarsSelector } from '../state/selectors';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import styled from '@emotion/styled';
import {
  cardsContainerWidthPaddingStyles,
  CARD_MARGIN,
} from '../helpers/theme';

const CarsContainer = styled(Flex)`
  max-height: ${({ open }) => (open ? '50vh' : 0)};
  overflow-y: scroll;
  box-sizing: content-box;
  transition: max-height 0.5s;

  ${cardsContainerWidthPaddingStyles}
`;

const Accordion = ({
  name,
  cars = [],
  value,
  selectedAccordion,
  setSelectedAccordion,
  ...props
}) => {
  const toggleOpen = () => {
    setSelectedAccordion(value);
  };

  return (
    <Box bg="white" borderRadius="16px" {...props}>
      <Flex w="100%" h="48px" onClick={toggleOpen}>
        <Text margin="auto" fontSize="xl">
          {name}
        </Text>
      </Flex>
      <CarsContainer
        wrap="wrap"
        open={selectedAccordion === value}
        overflow="hidden"
      >
        {cars.map((car, index) => (
          <Box
            key={car.id}
            marginRight={`${CARD_MARGIN}px`}
            marginBottom={`${CARD_MARGIN}px`}
          >
            <CardCarSmall car={car} />
          </Box>
        ))}
      </CarsContainer>
    </Box>
  );
};

const Dealer = () => {
  const location = useLocation();
  const cars = useSelector(dealerCarsSelector);
  const [selectedAccordion, setSelectedAccordion] = useState();

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  return (
    <Box>
      <Modal isOpen={!!selectedCar} backOnClose>
        {selectedCar && (
          <CarDealerDetails
            id={selectedCar.id}
            name={selectedCar.name}
            type={selectedCar.type}
            image={selectedCar.image}
            acceleration={selectedCar.acceleration}
            topSpeed={selectedCar.topSpeed}
            handling={selectedCar.handling}
            price={selectedCar.price}
          />
        )}
      </Modal>
      <Accordion
        name="Basic cars"
        value={0}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
        cars={cars.filter(item => item.brand === 'basic')}
      />
      <Accordion
        name="City cars"
        value={1}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
        marginTop="16px"
        cars={cars.filter(item => item.brand === 'city')}
      />
      <Accordion
        name="Track cars"
        value={2}
        selectedAccordion={selectedAccordion}
        setSelectedAccordion={setSelectedAccordion}
        marginTop="16px"
        cars={cars.filter(item => item.brand === 'track')}
      />
    </Box>
  );
};

export default Dealer;
