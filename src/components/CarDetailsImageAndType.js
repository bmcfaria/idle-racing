import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import getImageCar from '../helpers/imageMappingCars';
import { colors } from '../helpers/theme';
import { capitalize, carTypeText } from '../helpers/utils';
import styled from '@emotion/styled';

const Image = styled.img`
  height: 112px;
  border-radius: 16px;
  object-fit: contain;
  position: absolute;
  bottom: 0;
`;

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
      <Flex h="48px" direction="column" justifyContent="center">
        <Text>{capitalize(brand)} car</Text>
        <Text>
          {carTypeText[type]} ({type})
        </Text>
      </Flex>
      <Image alt="car" src={getImageCar(car)} />
    </Flex>
  );
};

export default CarDetailsImageAndType;
