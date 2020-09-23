import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import getImageCar from '../helpers/imageMappingCars';
import { colors } from '../helpers/theme';
import { capitalize, carTypeText } from '../helpers/utils';

const CarDetailsImageAndType = ({ car, bg = colors.orange, ...props }) => {
  const { type, brand } = car;

  return (
    <Flex
      w="100%"
      minH="152px"
      borderRadius="16px"
      color={colors.darkGray}
      bg={colors.white}
      fontSize="14px"
      direction="column"
      textAlign="center"
      position="relative"
      alignItems="center"
      {...props}
    >
      <Flex h="48px" direction="column" justifyContent="space-around">
        <Text>{capitalize(brand)} car</Text>
        <Text>
          {carTypeText[type]} ({type})
        </Text>
      </Flex>
      <Image
        h="112px"
        borderRadius="16px"
        alt="car"
        objectFit="contain"
        position="absolute"
        bottom="0"
        src={getImageCar(car)}
      />
    </Flex>
  );
};

export default CarDetailsImageAndType;
