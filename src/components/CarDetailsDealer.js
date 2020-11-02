import React, { useState } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { buyCarAction } from '../state/actions';
import { enoughMoneySelector } from '../state/selectors';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import AttributeCircle from './AttributeCircle';
import Button from './Button';
import {
  useCarPriceWithDiscount,
  useExperience,
  useHistoryHelper,
} from '../helpers/hooks';
import CarDetailsImageAndType from './CarDetailsImageAndType';
import { useEmptyGarageSlots } from '../helpers/hooksGarage';
import CarImage from './CarImage';

const CarColorPickerButton = ({ car, color, ...props }) => (
  <Button
    w="48px"
    h="48px"
    padding="0"
    border={`1px solid ${colors.darkGray}`}
    {...props}
  >
    <CarImage car={car} carColor={color} />
  </Button>
);

const CarColorPicker = ({ car, setSelectedColor, ...props }) => {
  if (car.defaultColors.length <= 1) {
    return null;
  }

  return (
    <Flex direction="column" {...props}>
      <CarColorPickerButton
        car={car}
        onClick={() => setSelectedColor(car.defaultColors?.[0])}
      />
      <CarColorPickerButton
        car={car}
        onClick={() => setSelectedColor(car.defaultColors?.[1])}
        color={car.defaultColors?.[1]}
        marginTop="6px"
      />
      <CarColorPickerButton
        car={car}
        onClick={() => setSelectedColor(car.defaultColors?.[2])}
        color={car.defaultColors?.[2]}
        marginTop="6px"
      />
    </Flex>
  );
};

const CarDetailsDealer = ({ car, ...props }) => {
  const { id, name, price, reward } = car;
  const [selectedColor, setSelectedColor] = useState();

  const dispatch = useDispatch();
  const history = useHistoryHelper();
  const emptySlots = useEmptyGarageSlots();

  const calculatedPrice = ~~useCarPriceWithDiscount(price);
  const enoughMoney = useSelector(enoughMoneySelector(calculatedPrice));
  const experienceBusiness = useExperience('business');

  const rewardOnly = reward && !(experienceBusiness.rewardCars > 0);

  const buy = () => {
    dispatch(buyCarAction(id, selectedColor));
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
      <CarDetailsImageAndType car={car} carColor={selectedColor} />

      <CarColorPicker
        position="absolute"
        top="0"
        left={`${200 + 4}px`}
        car={car}
        setSelectedColor={setSelectedColor}
      />

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
          w={`${200 - 2 * 8}px`}
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
          isDisabled={!enoughMoney || rewardOnly || emptySlots <= 0}
          color={colors.darkGray}
          bg={colors.white}
        >
          {rewardOnly ? 'Reward' : `$${calculatedPrice}`}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CarDetailsDealer;
