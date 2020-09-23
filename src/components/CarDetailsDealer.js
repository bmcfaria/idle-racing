import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { buyCarAction } from '../state/actions';
import { enoughMoneySelector } from '../state/selectors';
import { useHistory } from 'react-router-dom';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import AttributeCircle from './AttributeCircle';
import Button from './Button';
import { useCarPriceWithDiscount, useEmptyGarageSlots } from '../helpers/hooks';
import CarDetailsImageAndType from './CarDetailsImageAndType';

const CarDetailsDealer = ({ car, ...props }) => {
  const { id, name, price, reward } = car;

  const dispatch = useDispatch();
  const history = useHistory();
  const emptySlots = useEmptyGarageSlots();

  const calculatedPrice = ~~useCarPriceWithDiscount(price);
  const enoughMoney = useSelector(enoughMoneySelector(calculatedPrice));

  const buy = () => {
    dispatch(buyCarAction(id));
    history.goBack();
  };

  return (
    <Flex
      position="relative"
      w="200px"
      bg={colors.orange}
      padding="1px"
      borderRadius="16px"
      direction="column"
      {...props}
    >
      <CarDetailsImageAndType car={car} />
      <Flex w="100%" h="100%" direction="column" alignItems="center">
        <Text
          margin="8px 0"
          textAlign="center"
          fontSize="16px"
          lineHeight="16px"
        >
          {name}
        </Text>
        <Flex
          w="194px"
          border={`1px solid ${colors.darkGray}`}
          borderRadius="16px"
          justifyContent="space-evenly"
          padding="4px 0"
        >
          <AttributeCircle
            attr={car[ATTRIBUTE_TYPES.ACCELERATION]}
            text="ACC"
            showMax
          />
          <AttributeCircle
            attr={car[ATTRIBUTE_TYPES.SPEED]}
            text="SPD"
            showMax
          />
          <AttributeCircle
            attr={car[ATTRIBUTE_TYPES.HANDLING]}
            text="HND"
            showMax
          />
        </Flex>
        <Button
          margin="8px 0"
          onClick={buy}
          isDisabled={!enoughMoney || reward || emptySlots <= 0}
          color={colors.darkGray}
          bg={colors.white}
        >
          {reward ? 'Reward' : `$${calculatedPrice}`}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CarDetailsDealer;
