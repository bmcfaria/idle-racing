import { PseudoBox } from '@chakra-ui/core';
import React from 'react';
import { useDealerCar } from '../helpers/hooksDealer';

const CarImage = ({ car, carColor, ...props }) => {
  // Will act as a falback in case a garage car doesn't have color or defaultColors
  const dealerCar = useDealerCar(car.dealerCar);
  const color =
    carColor ||
    car.color ||
    car.defaultColors?.[0] ||
    dealerCar.defaultColors?.[0];
  return (
    // Chakra-UI Image, re-renders more than necessary or loads slower
    // creating an undesired flick effect / empty image
    <PseudoBox
      as="img"
      w="100%"
      h="100%"
      borderRadius="16px"
      objectFit="contain"
      alt={`${car.name.toLowerCase()} (${color})`}
      src={`/images/${car.name
        .toLowerCase()
        // Hammer fix for the City coupé
        .replace(/é/, 'e')
        .replace(/ /g, '-')}_${color}.png`}
      {...props}
    />
  );
};

export default CarImage;
