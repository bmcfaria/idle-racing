import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import CarDetailsDealer from './CarDetailsDealer';
import { useSelector } from 'react-redux';
import { dealerCarsSelector } from '../state/selectors';
import Modal from './Modal';
import CardCarDealer from './CardCarDealer';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { BottomSpacer } from './BottomSpacer';

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
        <CardCarDealer car={car} />
      </Box>
    ))}
  </Flex>
);

const Brand = () => {
  const location = useLocation();
  const { brand } = useParams();
  const cars = useSelector(dealerCarsSelector).filter(
    item => item.brand === brand
  );

  const containerWidth = useDynamicCardContainerWidth();

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  return (
    <Box>
      <Modal isOpen={!!selectedCar} backOnClose>
        {selectedCar && <CarDetailsDealer car={selectedCar} />}
      </Modal>

      {cars.length === 0 && (
        <Text marginTop="16px" textAlign="center" fontSize="24px">
          This brand doesn't exist
        </Text>
      )}

      <CarsContainer w={`${containerWidth}px`} cars={cars} />

      <BottomSpacer />
    </Box>
  );
};

export default Brand;
