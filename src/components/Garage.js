import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CarDetails from './CarDetails';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import styled from '@emotion/styled';
import {
  cardsContainerWidthPaddingStyles,
  CARD_MARGIN,
} from '../helpers/theme';

const CarsContainer = styled(Flex)`
  ${cardsContainerWidthPaddingStyles}
`;

const Garage = () => {
  const location = useLocation();
  const cars = useSelector(garageCarsSelector);

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  return (
    <Box>
      <Modal isOpen={!!selectedCar} backOnClose>
        {selectedCar && (
          <CarDetails
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
      <CarsContainer wrap="wrap">
        {cars.map(car => (
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

export default Garage;
