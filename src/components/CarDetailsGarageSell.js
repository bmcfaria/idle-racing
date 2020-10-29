import React, { useState } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../helpers/utils';
import { sellCarAction } from '../state/actions';
import { garageCarsSelector } from '../state/selectors';
import { colors } from '../helpers/theme';
import { useCarPriceWithBuff } from '../helpers/hooks';

const CarDetailsGarageSell = ({ car, ...props }) => {
  const { id, price, reward } = car;

  const calculatedSellPrice = ~~useCarPriceWithBuff(price);

  const [confirmationState, setConfirmationState] = useState();

  const dispatch = useDispatch();
  const garageCars = useSelector(garageCarsSelector);

  const buttonText =
    (confirmationState && `$${formatMoney(calculatedSellPrice)}`) ||
    `Sell ($${formatMoney(calculatedSellPrice)})`;

  const buttonDisable = !confirmationState && garageCars?.length === 1;

  const buttonCallback = () => {
    if (confirmationState) {
      dispatch(sellCarAction(id));
      setConfirmationState();
    } else {
      setConfirmationState(true);
    }
  };

  const cardBg =
    (confirmationState && colors.lightGray) ||
    (reward && colors.green) ||
    colors.lightBlue;

  return (
    <Flex
      position="relative"
      w="200px"
      h="72px"
      bg={cardBg}
      padding="8px"
      borderRadius="16px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      onClick={e => e.stopPropagation()}
      {...props}
    >
      {confirmationState && (
        <Text
          textAlign="center"
          fontSize="16px"
          lineHeight="16px"
          marginBottom="8px"
        >
          Sell?
        </Text>
      )}
      <Flex w="100%" justifyContent="space-around">
        <Button
          onClick={buttonCallback}
          minW="72px"
          h="32px"
          isDisabled={buttonDisable}
          color={colors.white}
          bg={colors.darkGray}
        >
          {buttonText}
        </Button>
        {confirmationState && (
          <Button
            onClick={() => setConfirmationState()}
            minW="72px"
            h="32px"
            color={colors.darkGray}
            border={`1px solid ${colors.darkGray}`}
            bg={colors.lightGray}
          >
            Cancel
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default CarDetailsGarageSell;
