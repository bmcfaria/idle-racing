import React, { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { openGarageCarAction } from '../state/actions';
import { colors } from '../helpers/theme';
import CarDetailsImageAndType from './CarDetailsImageAndType';
import CarDetailsGarageSell from './CarDetailsGarageSell';
import CarDetailsGarageAttributes from './CarDetailsGarageAttributes';

const CarDetailsGarage = ({ car, ...props }) => {
  const { id, name, reward } = car;

  const dispatch = useDispatch();

  useEffect(() => {
    // To remove pending notifications (dot)
    dispatch(openGarageCarAction(id));
  }, [dispatch, id]);

  const cardBg = (reward && colors.green) || colors.lightBlue;

  return (
    <>
      <Flex
        position="relative"
        w="200px"
        bg={cardBg}
        padding="1px"
        borderRadius="16px"
        direction="column"
        {...props}
      >
        <CarDetailsImageAndType car={car} />
        <Text
          textAlign="center"
          margin="8px 0"
          fontSize="16px"
          lineHeight="16px"
        >
          {name}
        </Text>
      </Flex>

      <CarDetailsGarageAttributes car={car} marginTop="4px" />

      <CarDetailsGarageSell car={car} marginTop="4px" />
    </>
  );
};

export default CarDetailsGarage;
