import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import CarDetailsDealer from './CarDetailsDealer';
import { useSelector } from 'react-redux';
import { dealerCarsSelector } from '../state/selectors';
import Modal from './Modal';
import CardCarDealer from './CardCarDealer';
import {
  useCarsAcquired,
  useDynamicCardContainerWidth,
} from '../helpers/hooks';
import { BottomSpacer } from './BottomSpacer';
import { colors } from '../helpers/theme';
import { capitalize } from '../helpers/utils';
import { brandSponsors } from '../helpers/sponsors';

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

  const carsAcquired = useCarsAcquired(cars);
  const allCarsAcquired = carsAcquired === cars.length;

  const containerWidth = useDynamicCardContainerWidth();

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  const brandSponsor = ~~brandSponsors[brand];

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

      {brandSponsor > 0 && (
        <Flex
          w={`${containerWidth - 16}px`}
          minH="32px"
          borderRadius="16px"
          marginLeft="16px"
          border="1px solid black"
          bg={allCarsAcquired ? colors.orange : colors.lightGray}
        >
          {!allCarsAcquired && (
            <Text margin="auto" textAlign="center">
              Acquire all "{capitalize(brand)}" cars to unlock brand sponsor (
              {`${carsAcquired}/${cars.length} cars`})
            </Text>
          )}
          {allCarsAcquired && (
            <Text margin="auto" textAlign="center">
              "{capitalize(brand)}" cars brand sponsor ({`$${brandSponsor} /s`})
            </Text>
          )}
        </Flex>
      )}

      <CarsContainer w={`${containerWidth}px`} marginTop="24px" cars={cars} />

      <BottomSpacer />
    </Box>
  );
};

export default Brand;
