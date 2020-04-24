import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CarDetails from './CarDetails';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import styled from '@emotion/styled';

const CARD_WIDTH = 304;
const CARD_MARGIN = 28;

const widthByCardsNumber = number =>
  CARD_WIDTH * number + CARD_MARGIN * (number + 1);

const CarsContainer = styled(Flex)`
  width: ${widthByCardsNumber(1)}px;
  padding-left: ${CARD_MARGIN}px;
  /* box-sizing: content-box;
  overflow-y: scroll; */

  @media screen and (min-width: ${widthByCardsNumber(2)}px) {
    width: ${widthByCardsNumber(2)}px;
  }

  @media screen and (min-width: ${widthByCardsNumber(3)}px) {
    width: ${widthByCardsNumber(3)}px;
  }
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
      <CarsContainer wrap="wrap" margin="0 auto">
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
