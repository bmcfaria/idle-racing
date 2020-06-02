import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import CarDetailsDealer from './CarDetailsDealer';
import { useSelector } from 'react-redux';
import { dealerCarsSelector } from '../state/selectors';
import Modal from './Modal';
import CardCarSmall from './CardCarSmall';
import { useDynamicCardContainerWidth } from '../helpers/hooks';

const CarsContainer = ({ cars, ...props }) => (
  <Flex
    wrap="wrap"
    margin="0 auto"
    paddingLeft="16px"
    boxSizing="content-box"
    {...props}
  >
    {cars.map(car => (
      <Box marginRight="16px" marginBottom="16px" key={car.id}>
        <CardCarSmall car={car} />
      </Box>
    ))}
  </Flex>
);

const Dealer = () => {
  const location = useLocation();
  const cars = useSelector(dealerCarsSelector);
  const containerWidth = useDynamicCardContainerWidth();

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  return (
    <Box>
      <Modal isOpen={!!selectedCar} backOnClose>
        {selectedCar && <CarDetailsDealer car={selectedCar} />}
      </Modal>

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
        cars={cars.filter(item => item.brand === 'racer')}
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
    </Box>
  );
};

export default Dealer;
