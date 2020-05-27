import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import { getImageCar } from '../helpers/imageMapping';
import { colors } from '../helpers/theme';
import { capitalize } from '../helpers/utils';

const CarDetailsContainer = ({
  car,
  bg = colors.orange,
  children,
  ...props
}) => {
  const { type, brand } = car;

  return (
    <Flex
      position="relative"
      w="400px"
      h="138px"
      bg={bg}
      borderRadius="16px"
      {...props}
    >
      <Box
        w="50%"
        h="100%"
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
          border={`1px solid ${bg}`}
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
        w="50%"
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

export default CarDetailsContainer;
