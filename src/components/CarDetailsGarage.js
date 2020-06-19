import React, { useState, useEffect } from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import {
  sellCarAction,
  upgradeAttributeAction,
  openGarageCarAction,
  disableTutorialUpgradeAction,
} from '../state/actions';
import {
  moneySelector,
  garageCarsSelector,
  tutorialUpgradeSelector,
} from '../state/selectors';
import CarDetailsContainer from './CarDetailsContainer';
import { colors } from '../helpers/theme';
import AttributeCircle from './AttributeCircle';
import CallForAttention from './CallForAttention';
import {
  useUpgradePriceWithDiscount,
  useCarPriceWithBuff,
} from '../helpers/hooks';

const AttributeCircleButton = ({
  attr,
  text,
  nextUpgrade,
  confirmationState,
  ...props
}) => {
  const tutorial = useSelector(tutorialUpgradeSelector);
  const dispatch = useDispatch();
  const [hoverOnAttr, setHoverOnAttr] = useState();
  const disabled =
    (confirmationState && confirmationState !== text) ||
    attr.upgrade >= attr.max;

  const disableTutorial = () => {
    dispatch(disableTutorialUpgradeAction);
  };

  return (
    <Box position="relative">
      <Button
        w="56px"
        h="56px"
        bg={disabled ? 'transparent' : colors.lightBlue}
        border={`1px solid ${colors.white}`}
        onMouseEnter={() => !disabled && setHoverOnAttr(true)}
        onMouseLeave={() => setHoverOnAttr()}
        disabled={attr.upgrade >= attr.max}
        {...props}
      >
        <AttributeCircle
          attr={attr}
          text={text}
          showMax
          nextUpgrade={hoverOnAttr || confirmationState === text}
        />
      </Button>
      {tutorial && (
        <CallForAttention
          w="100%"
          h="100%"
          top="0"
          left="0"
          borderRadius="4px"
          position="absolute"
          onMouseEnter={disableTutorial}
        />
      )}
    </Box>
  );
};

const CarDetailsGarage = ({ car, ...props }) => {
  const { id, name, price } = car;
  const money = useSelector(moneySelector);

  const calculatedPriceAcc = ~~useUpgradePriceWithDiscount(
    car[ATTRIBUTE_TYPES.ACCELERATION].price,
    ATTRIBUTE_TYPES.ACCELERATION
  );
  const calculatedPriceSpd = ~~useUpgradePriceWithDiscount(
    car[ATTRIBUTE_TYPES.SPEED].price,
    ATTRIBUTE_TYPES.SPEED
  );
  const calculatedPriceHnd = ~~useUpgradePriceWithDiscount(
    car[ATTRIBUTE_TYPES.HANDLING].price,
    ATTRIBUTE_TYPES.HANDLING
  );

  const calculatedSellPrice = ~~useCarPriceWithBuff(price);

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
    (confirmationState === 'ACC' && calculatedPriceAcc) ||
    (confirmationState === 'SPD' && calculatedPriceSpd) ||
    (confirmationState === 'HND' && calculatedPriceHnd) ||
    (confirmationState === 'SELL' && `$${calculatedSellPrice}`) ||
    `Sell ($${calculatedSellPrice})`;

  const buttonColors = ((confirmationState === 'ACC' ||
    confirmationState === 'SPD' ||
    confirmationState === 'HND') && {
    bg: colors.lightBlue,
    color: 'black',
  }) || { bg: colors.darkGray, color: colors.white };

  const buttonDisable =
    (!confirmationState && garageCars?.length === 1) ||
    (confirmationState === 'ACC' &&
      money < ~~car[ATTRIBUTE_TYPES.ACCELERATION].price) ||
    (confirmationState === 'SPD' &&
      money < ~~car[ATTRIBUTE_TYPES.SPEED].price) ||
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
      case 'SPD':
        return upgrade(ATTRIBUTE_TYPES.SPEED);
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
          attr={car[ATTRIBUTE_TYPES.SPEED]}
          text="SPD"
          confirmationState={confirmationState}
          onClick={() => setConfirmationState('SPD')}
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
          minW="72px"
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
            minW="72px"
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
