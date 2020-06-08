import React, { useState, useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import {
  sellCarAction,
  upgradeAttributeAction,
  openGarageCarAction,
} from '../state/actions';
import { moneySelector, garageCarsSelector } from '../state/selectors';
import CarDetailsContainer from './CarDetailsContainer';
import { colors } from '../helpers/theme';
import AttributeCircle from './AttributeCircle';

const AttributeCircleButton = ({
  attr,
  text,
  nextUpgrade,
  confirmationState,
  ...props
}) => {
  const [hoverOnAttr, setHoverOnAttr] = useState();
  const disabled =
    (confirmationState && confirmationState !== text) ||
    attr.upgrade >= attr.max;

  return (
    <Button
      w="56px"
      h="56px"
      bg={disabled ? 'transparent' : colors.lightBlue}
      border={`1px solid ${colors.white}`}
      onMouseEnter={() => !disabled && setHoverOnAttr(true)}
      onMouseLeave={() => setHoverOnAttr()}
      isDisabled={disabled}
      {...props}
    >
      <AttributeCircle
        attr={attr}
        text={text}
        showMax
        nextUpgrade={hoverOnAttr || confirmationState === text}
      />
    </Button>
  );
};

const CarDetailsGarage = ({ car, ...props }) => {
  const { id, name, price } = car;
  const money = useSelector(moneySelector);
  const [confirmationState, setConfirmationState] = useState();

  const dispatch = useDispatch();
  const garageCars = useSelector(garageCarsSelector);

  useEffect(() => {
    dispatch(openGarageCarAction(id));
  }, [dispatch, id]);

  const title =
    (!confirmationState && name) ||
    (confirmationState === 'SELL' && 'Sell') ||
    `Upgrade ${confirmationState}`;

  const buttonText =
    (confirmationState === 'ACC' &&
      `$${~~car[ATTRIBUTE_TYPES.ACCELERATION].price}`) ||
    (confirmationState === 'TSP' &&
      `$${~~car[ATTRIBUTE_TYPES.TOP_SPEED].price}`) ||
    (confirmationState === 'HND' &&
      `$${~~car[ATTRIBUTE_TYPES.HANDLING].price}`) ||
    (confirmationState === 'SELL' && `$${~~price}`) ||
    `Sell ($${~~price})`;

  const buttonColors = ((confirmationState === 'ACC' ||
    confirmationState === 'TSP' ||
    confirmationState === 'HND') && {
    bg: colors.lightBlue,
    color: 'black',
  }) || { bg: colors.darkGray, color: colors.white };

  const buttonDisable =
    (!confirmationState && garageCars?.length === 1) ||
    (confirmationState === 'ACC' &&
      money < ~~car[ATTRIBUTE_TYPES.ACCELERATION].price) ||
    (confirmationState === 'TSP' &&
      money < ~~car[ATTRIBUTE_TYPES.TOP_SPEED].price) ||
    (confirmationState === 'HND' &&
      money < ~~car[ATTRIBUTE_TYPES.HANDLING].price);

  const upgrade = type => {
    dispatch(upgradeAttributeAction(type, id));
    setConfirmationState();
  };

  const sell = () => {
    dispatch(sellCarAction(id));
    setConfirmationState();
  };

  const buttonCallback = () => {
    switch (confirmationState) {
      case 'ACC':
        return upgrade(ATTRIBUTE_TYPES.ACCELERATION);
      case 'TSP':
        return upgrade(ATTRIBUTE_TYPES.TOP_SPEED);
      case 'HND':
        return upgrade(ATTRIBUTE_TYPES.HANDLING);
      case 'SELL':
        return sell();
      default:
        setConfirmationState('SELL');
    }
  };

  return (
    <CarDetailsContainer
      bg={confirmationState ? colors.lightGray : colors.lightBlue}
      car={car}
      {...props}
    >
      <Text textAlign="center" fontSize="14px" lineHeight="14px">
        {title}
      </Text>
      <Flex w="100%" justifyContent="space-evenly">
        <AttributeCircleButton
          attr={car[ATTRIBUTE_TYPES.ACCELERATION]}
          text="ACC"
          confirmationState={confirmationState}
          onClick={() => setConfirmationState('ACC')}
        />
        <AttributeCircleButton
          attr={car[ATTRIBUTE_TYPES.TOP_SPEED]}
          text="TSP"
          confirmationState={confirmationState}
          onClick={() => setConfirmationState('TSP')}
        />
        <AttributeCircleButton
          attr={car[ATTRIBUTE_TYPES.HANDLING]}
          text="HND"
          confirmationState={confirmationState}
          onClick={() => setConfirmationState('HND')}
        />
      </Flex>
      <Flex w="100%" justifyContent="space-evenly">
        <Button
          onClick={buttonCallback}
          h="24px"
          fontSize="12px"
          isDisabled={buttonDisable}
          color={buttonColors.color}
          bg={buttonColors.bg}
        >
          {buttonText}
        </Button>
        {confirmationState && (
          <Button
            onClick={() => setConfirmationState()}
            h="24px"
            fontSize="12px"
            color={colors.darkGray}
            bg={colors.lightGray}
          >
            Cancel
          </Button>
        )}
      </Flex>
    </CarDetailsContainer>
  );
};

export default CarDetailsGarage;
