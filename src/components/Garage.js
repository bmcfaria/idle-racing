import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import CarDetailsGarage from './CarDetailsGarage';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import { useLocation, Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import { useDynamicCardContainerWidth } from '../helpers/hooks';

const CarsContainer = ({ cars, ...props }) => (
  <>
    {cars.length > 0 && (
      <Flex
        wrap="wrap"
        margin="0 auto"
        paddingLeft="16px"
        boxSizing="content-box"
        {...props}
      >
        {cars.map(car => (
          <Box marginRight="16px" marginBottom="16px" key={car.id}>
            <CardCarSmall car={car} garage />
          </Box>
        ))}
      </Flex>
    )}
  </>
);

const Garage = () => {
  const location = useLocation();
  const cars = useSelector(garageCarsSelector);
  const containerWidth = useDynamicCardContainerWidth();

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  return (
    <Box>
      <Modal isOpen={!!selectedCar} backOnClose>
        {selectedCar && <CarDetailsGarage car={selectedCar} />}
      </Modal>
      <Flex direction="column" minH="50vh">
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
        <CarsContainer
          w={`${containerWidth}px`}
          cars={cars.filter(item => item.brand === 'basic')}
        />
        <CarsContainer
          w={`${containerWidth}px`}
          marginTop="24px"
          cars={cars.filter(item => item.brand === 'city')}
        />
        <CarsContainer
          w={`${containerWidth}px`}
          marginTop="24px"
          cars={cars.filter(item => item.brand === 'offroad')}
        />
        <CarsContainer
          w={`${containerWidth}px`}
          marginTop="24px"
          cars={cars.filter(item => item.brand === 'supercar')}
        />
        <CarsContainer
          w={`${containerWidth}px`}
          marginTop="24px"
          cars={cars.filter(item => item.brand === 'nascar')}
        />
        <CarsContainer
          w={`${containerWidth}px`}
          marginTop="24px"
          cars={cars.filter(item => item.brand === 'f1')}
        />

        {/* spacer */}
        <Box minH={['80px', '64px']} />
      </Flex>
    </Box>
  );
};

export default Garage;
