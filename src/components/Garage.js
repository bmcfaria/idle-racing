import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import CarDetailsGarage from './CarDetailsGarage';
import { useSelector } from 'react-redux';
import {
  garageCarsSelector,
  pageNotificationsGarageSelector,
} from '../state/selectors';
import CardCarGarage from './CardCarGarage';
import Modal from './Modal';
import { useLocation, Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { colors } from '../helpers/theme';
import GarageBuySlot from './GarageBuySlot';
import GarageUpgrades from './GarageUpgrades';
import { BottomSpacer } from './BottomSpacer';
import { useEmptyGarageSlots } from '../helpers/hooksGarage';

const CarsContainer = ({ cars, ...props }) => {
  const pageNotificationsGarage = useSelector(pageNotificationsGarageSelector);
  const emptySlots = useEmptyGarageSlots();

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
              <CardCarGarage
                car={car}
                notification={pageNotificationsGarage?.includes(car.id)}
              />
            </Box>
          ))}
          {[...Array(emptySlots)].map((_, index) => (
            <Box marginRight="16px" marginBottom="16px" key={index}>
              <Flex
                w="160px"
                h="180px"
                borderRadius="16px"
                bg={colors.lightBlue}
                fontSize="14px"
              >
                <Flex
                  w="158px"
                  h="178px"
                  borderRadius="16px"
                  bg={colors.white}
                  flexDirection="column"
                  margin="auto"
                >
                  <Text margin="auto">Empty slot</Text>
                </Flex>
              </Flex>
            </Box>
          ))}
          <Box marginRight="16px" marginBottom="16px">
            <GarageBuySlot />
          </Box>
        </Flex>
      )}
    </>
  );
};

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
        <CarsContainer w={`${containerWidth}px`} marginTop="24px" cars={cars} />

        <BottomSpacer />
      </Flex>
    </Box>
  );
};

export default Garage;
