import { PseudoBox } from '@chakra-ui/core';
import React from 'react';
import getImageCar from '../helpers/imageMappingCars';

const CarImage = ({ car, ...props }) => {
  return (
    // Chakra-UI Image, re-renders more than necessary or loads slower
    // creating an undesired flick effect / empty image
    <PseudoBox
      as="img"
      w="100%"
      h="100%"
      borderRadius="16px"
      objectFit="contain"
      alt="car"
      src={getImageCar(car)}
      {...props}
    />
  );
};

export default CarImage;
