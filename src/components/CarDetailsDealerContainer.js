import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import getImageCar from '../helpers/imageMappingCars';
import { colors } from '../helpers/theme';
import { capitalize } from '../helpers/utils';

const CarDetailsDealerContainer = ({
  car,
  bg = colors.orange,
  children,
  ...props
}) => {
  const { type, brand } = car;

  return (
    <Flex
      position="relative"
      w="200px"
      h="264px"
      bg={bg}
      padding="1px"
      borderRadius="16px"
      direction="column"
      {...props}
    >
      <Box
        w="100%"
        h="128px"
        borderRadius="16px"
        color={colors.darkGray}
        fontSize="12px"
        lineHeight="12px"
        position="relative"
      >
        <Image
          w="100%"
          h="100%"
          borderRadius="16px"
          alt="car"
          bg={colors.white}
          objectFit="contain"
          src={getImageCar(car)}
        />
        <Text top="8px" left="8px" position="absolute">
          {capitalize(brand)}
        </Text>
        <Text bottom="8px" right="8px" position="absolute">
          {type}
        </Text>
      </Box>
      <Flex
        w="100%"
        h="100%"
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default CarDetailsDealerContainer;
