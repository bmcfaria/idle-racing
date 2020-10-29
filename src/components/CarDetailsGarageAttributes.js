import React, { useState } from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTE_TYPES, formatMoney } from '../helpers/utils';
import {
  upgradeAttributeAction,
  disableTutorialUpgradeAction,
  closeResultsAction,
} from '../state/actions';
import {
  garageCarsSelector,
  tutorialUpgradeSelector,
  pastRacesSelector,
  enoughMoneySelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';
import AttributeCircle from './AttributeCircle';
import CallForAttention from './CallForAttention';
import { useUpgradePriceWithDiscount } from '../helpers/hooks';
import { requiredUpgrade } from '../helpers/garageUpgrades';
import { useMechanicsCount } from '../helpers/hooksGarage';

const AttributeCircleButton = ({
  attr,
  text,
  nextUpgrade,
  confirmationState,
  reward,
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

  const bg =
    (disabled && 'transparent') || (reward && colors.green) || colors.lightBlue;

  return (
    <Box position="relative">
      <Button
        w="56px"
        h="56px"
        bg={bg}
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

const CarDetailsGarageAttributes = ({ car, children, ...props }) => {
  const { id, reward } = car;
  const mechanics = useMechanicsCount();
  const pastRaces = useSelector(pastRacesSelector);

  const calculatedPriceAcc = ~~useUpgradePriceWithDiscount(
    car[ATTRIBUTE_TYPES.ACCELERATION].price
  );
  const calculatedPriceSpd = ~~useUpgradePriceWithDiscount(
    car[ATTRIBUTE_TYPES.SPEED].price
  );
  const calculatedPriceHnd = ~~useUpgradePriceWithDiscount(
    car[ATTRIBUTE_TYPES.HANDLING].price
  );

  const [confirmationState, setConfirmationState] = useState();

  const dispatch = useDispatch();
  const garageCars = useSelector(garageCarsSelector);

  const baseUpgradeAcc = car[ATTRIBUTE_TYPES.ACCELERATION].value;
  const baseUpgradeSpd = car[ATTRIBUTE_TYPES.SPEED].value;
  const baseUpgradeHnd = car[ATTRIBUTE_TYPES.HANDLING].value;

  const maxUpgraded =
    car[ATTRIBUTE_TYPES.ACCELERATION].upgrade >=
      car[ATTRIBUTE_TYPES.ACCELERATION].max &&
    car[ATTRIBUTE_TYPES.SPEED].upgrade >= car[ATTRIBUTE_TYPES.SPEED].max &&
    car[ATTRIBUTE_TYPES.HANDLING].upgrade >= car[ATTRIBUTE_TYPES.HANDLING].max;

  const valueToUpgrade =
    (confirmationState === 'ACC' && baseUpgradeAcc) ||
    (confirmationState === 'SPD' && baseUpgradeSpd) ||
    (confirmationState === 'HND' && baseUpgradeHnd);
  const requiredUpgradeObject = requiredUpgrade(
    'upgrade_center',
    valueToUpgrade
  );
  const canUpgrade =
    !!requiredUpgradeObject && requiredUpgradeObject.mechanics <= mechanics;

  const buttonText =
    (confirmationState === 'ACC' && `$${formatMoney(calculatedPriceAcc)}`) ||
    (confirmationState === 'SPD' && `$${formatMoney(calculatedPriceSpd)}`) ||
    (confirmationState === 'HND' && `$${formatMoney(calculatedPriceHnd)}`);

  const enoughMoneyAcceleration = useSelector(
    enoughMoneySelector(~~car[ATTRIBUTE_TYPES.ACCELERATION].price)
  );
  const enoughMoneySpeed = useSelector(
    enoughMoneySelector(~~car[ATTRIBUTE_TYPES.SPEED].price)
  );
  const enoughMoneyHandling = useSelector(
    enoughMoneySelector(~~car[ATTRIBUTE_TYPES.HANDLING].price)
  );

  const buttonDisable =
    (!confirmationState && garageCars?.length === 1) ||
    (confirmationState === 'ACC' && !enoughMoneyAcceleration) ||
    (confirmationState === 'SPD' && !enoughMoneySpeed) ||
    (confirmationState === 'HND' && !enoughMoneyHandling);

  const upgrade = type => {
    dispatch(upgradeAttributeAction(type, id));

    // Clear past race so the car won't appear already selected on the last track
    const pastRace = [...pastRaces].reverse().find(race => race.car === id);
    if (pastRace) {
      dispatch(closeResultsAction(pastRace.id));
    }

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
      default:
        setConfirmationState();
    }
  };

  const cardBg =
    (confirmationState && colors.lightGray) ||
    (reward && colors.green) ||
    colors.lightBlue;

  const infoText = maxUpgraded
    ? 'All maxed out'
    : 'Select an attribute to buy upgrades';

  return (
    <Flex
      position="relative"
      w="200px"
      h="184px"
      bg={cardBg}
      padding="8px 0"
      borderRadius="16px"
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      {...props}
    >
      <Flex w="100%" justifyContent="space-evenly">
        <AttributeCircleButton
          attr={car[ATTRIBUTE_TYPES.ACCELERATION]}
          text="ACC"
          confirmationState={confirmationState}
          reward={reward}
          onClick={() => setConfirmationState('ACC')}
        />
        <AttributeCircleButton
          attr={car[ATTRIBUTE_TYPES.SPEED]}
          text="SPD"
          confirmationState={confirmationState}
          reward={reward}
          onClick={() => setConfirmationState('SPD')}
        />
        <AttributeCircleButton
          attr={car[ATTRIBUTE_TYPES.HANDLING]}
          text="HND"
          confirmationState={confirmationState}
          reward={reward}
          onClick={() => setConfirmationState('HND')}
        />
      </Flex>
      <Flex
        w="100%"
        flexGrow="1"
        marginTop="8px"
        padding="0 8px"
        alignItems="center"
      >
        {!confirmationState && (
          <Text w="100%" textAlign="center">
            {infoText}
          </Text>
        )}

        {confirmationState && (
          <Flex w="100%" justifyContent="space-around" alignItems="center">
            {canUpgrade && (
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
            )}
            {!canUpgrade && (
              <Text
                fontSize="14px"
                lineHeight="16px"
                textAlign="center"
                padding="0 8px"
              >
                {requiredUpgradeObject.text}
              </Text>
            )}
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
        )}
      </Flex>

      {children}
    </Flex>
  );
};

export default CarDetailsGarageAttributes;
