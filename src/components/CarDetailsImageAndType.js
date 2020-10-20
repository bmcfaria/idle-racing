import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { capitalize, carTypeText } from '../helpers/utils';
import CarImage from './CarImage';

const CarDetailsImageAndType = ({
  car,
  carColor,
  bg = colors.orange,
  ...props
}) => {
  const { type, categories } = car;

  return (
    <Flex
      w="100%"
      minH="152px"
      borderRadius="16px"
      color={colors.darkGray}
      bg={colors.white}
      fontSize="14px"
      lineHeight="16px"
      direction="column"
      textAlign="center"
      position="relative"
      alignItems="center"
      {...props}
    >
      <Flex h="64px" direction="column" justifyContent="center">
        <Text>
          (
          {categories.map((category, index) => (
            <React.Fragment key={category}>
              <span>{capitalize(category)}</span>
              {index < categories.length - 1 && <span>, </span>}
            </React.Fragment>
          ))}
          ) car
        </Text>
        <Text>
          {carTypeText[type]} ({type})
        </Text>
      </Flex>
      <CarImage
        h="112px"
        position="absolute"
        bottom="0"
        car={car}
        carColor={carColor}
      />
    </Flex>
  );
};

export default CarDetailsImageAndType;
