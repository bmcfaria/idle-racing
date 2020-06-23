import React, { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import CarDetailsGarage from './CarDetailsGarage';
import { useSelector, useDispatch } from 'react-redux';
import {
  garageCarsSelector,
  pageNotificationsGarageSelector,
} from '../state/selectors';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import { useLocation, Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { openGarageAction } from '../state/actions';
import CollapsiblePanel from './CollapsiblePanel';
import { colors } from '../helpers/theme';
import Button from './Button';

const CarsContainer = ({ cars, ...props }) => {
  const pageNotificationsGarage = useSelector(pageNotificationsGarageSelector);

  return (
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
              <CardCarSmall
                car={car}
                garage
                notification={pageNotificationsGarage?.includes(car.id)}
              />
            </Box>
          ))}
        </Flex>
      )}
    </>
  );
};

const GarageUpgrades = props => (
  <CollapsiblePanel
    bg={colors.lightBlue}
    color="black"
    border="none"
    {...props}
  >
    Garage Upgrades (TBD)
  </CollapsiblePanel>
);

const Garage = () => {
  const location = useLocation();
  const cars = useSelector(garageCarsSelector);
  const containerWidth = useDynamicCardContainerWidth();
  const dispatch = useDispatch();

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  useEffect(() => {
    dispatch(openGarageAction);
  }, [dispatch]);

  return (
    <Box>
      <Modal isOpen={!!selectedCar} backOnClose>
        {selectedCar && <CarDetailsGarage car={selectedCar} />}
      </Modal>
      <Flex direction="column" minH="50vh">
        {cars.length > 0 && <GarageUpgrades w={`${containerWidth - 16}px`} />}

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
          marginTop="24px"
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
