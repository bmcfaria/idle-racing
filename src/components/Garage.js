import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import CarDetailsGarage from './CarDetailsGarage';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import styled from '@emotion/styled';
import {
  cardsContainerWidthPaddingStyles,
  CARD_MARGIN,
} from '../helpers/theme';
import { useLocation, Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';

const CarsContainer = styled(Flex)`
  box-sizing: content-box;
  overflow-y: auto;
  padding-top: 28px;
  flex-wrap: wrap;

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
        {selectedCar && <CarDetailsGarage car={selectedCar} />}
      </Modal>
      <Flex direction="column" bg="white" borderRadius="16px" minH="50vh">
        {cars.length === 0 && (
          <Flex margin="auto" direction="column">
            <Text fontSize="24px">Your garage is empty</Text>
            <ChakraLink
              as={Link}
              to="/dealer"
              fontSize="12px"
              color="teal.500"
              margin="8px auto 0"
            >
              go to Dealer
            </ChakraLink>
          </Flex>
        )}
        <CarsContainer wrap="wrap">
          {cars.map(car => (
            <Box
              key={car.id}
              marginRight={`${CARD_MARGIN}px`}
              marginBottom={`${CARD_MARGIN}px`}
            >
              <CardCarSmall car={car} garage />
            </Box>
          ))}
        </CarsContainer>
      </Flex>
    </Box>
  );
};

export default Garage;
