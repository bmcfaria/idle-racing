import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { buyCarAction } from '../state/actions';
import {
  garageSlotsEmptySelector,
  enoughMoneySelector,
} from '../state/selectors';
import { useHistory } from 'react-router-dom';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import AttributeCircle from './AttributeCircle';
import Button from './Button';
import CarDetailsContainer from './CarDetailsContainer';
import { useCarPriceWithDiscount } from '../helpers/hooks';

const CarDetailsDealer = ({ car, ...props }) => {
  const { id, name, price, reward } = car;

  const dispatch = useDispatch();
  const history = useHistory();
  const emptySlots = useSelector(garageSlotsEmptySelector);

  const calculatedPrice = ~~useCarPriceWithDiscount(price);
  const enoughMoney = useSelector(enoughMoneySelector(calculatedPrice));

  const buy = () => {
    dispatch(buyCarAction(id));
    history.goBack();
  };

  return (
    <CarDetailsContainer car={car} {...props}>
      <Text textAlign="center" fontSize="14px" lineHeight="14px">
        {name}
      </Text>
      <Flex w="100%" justifyContent="space-evenly">
        <AttributeCircle
          attr={car[ATTRIBUTE_TYPES.ACCELERATION]}
          text="ACC"
          showMax
        />
        <AttributeCircle attr={car[ATTRIBUTE_TYPES.SPEED]} text="SPD" showMax />
        <AttributeCircle
          attr={car[ATTRIBUTE_TYPES.HANDLING]}
          text="HND"
          showMax
        />
      </Flex>
      <Button
        onClick={buy}
        isDisabled={!enoughMoney || reward || emptySlots === 0}
        color={colors.darkGray}
        bg={colors.white}
      >
        {reward ? 'Reward' : `$${calculatedPrice}`}
      </Button>
    </CarDetailsContainer>
  );
};

export default CarDetailsDealer;
