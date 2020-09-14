import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import CardCarSmallRace from './CardCarSmallRace';

const RaceDetailsCarsContainer = ({ cars, selectCar, onClose, ...props }) => {
  const containerWidth = useDynamicCardContainerWidth();

  const onClickChild = e => {
    e.stopPropagation();
  };

  return (
    <Flex
      position="absolute"
      left="0"
      right="0"
      top="0"
      bottom="0"
      paddingTop={`${48 + 40 + 32}px`}
      paddingBottom="80px"
      borderRadius="16px"
      overflowX="hidden"
      onClick={onClose}
    >
      <Flex
        w={`${containerWidth}px`}
        minH="240px"
        wrap="wrap"
        margin="auto"
        paddingTop="16px"
        paddingLeft="16px"
        boxSizing="content-box"
        borderRadius="16px"
        bg={colors.white}
        onClick={onClickChild}
        {...props}
      >
        {cars.length === 0 && (
          <Flex margin="auto" direction="column">
            <Text textAlign="center" fontSize="24px">
              You need to buy a car first
            </Text>
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
        {cars.map(car => (
          <Box marginRight="16px" marginBottom="16px" key={car.id}>
            <CardCarSmallRace car={car} onClick={selectCar} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default RaceDetailsCarsContainer;
