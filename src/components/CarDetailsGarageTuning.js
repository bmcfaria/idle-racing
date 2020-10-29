import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { ReactComponent as TriangeIcon } from '../assets/icons/triangle.svg';
import Button from './Button';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import { useDispatch } from 'react-redux';
import { tuneCarAction } from '../state/actions';
import { maxUnlockedUpgrade } from '../helpers/garageUpgrades';
import {
  useCarDetailsCustomTypeVisibility,
  useMechanicsCount,
} from '../helpers/hooksGarage';
import hexAlpha from 'hex-alpha';

const AttrTextValue = ({ name, value, tuning, ...props }) => (
  <Box w="60px" textAlign="center" {...props}>
    <Flex justifyContent="center">
      <Text>{name}</Text>
      {!!tuning && (
        <Text marginLeft="2px" fontSize="12px">
          ({tuning > 0 ? `+${tuning}` : tuning})
        </Text>
      )}
    </Flex>
    <Text>{value + tuning}</Text>
  </Box>
);

const UpDownButtons = ({
  upCallback,
  upDisabled,
  downCallback,
  downDisabled,
  ...props
}) => (
  <Flex direction="column" {...props}>
    <Button
      w="32px"
      minW="32px"
      padding="0"
      bg={colors.white}
      color={colors.darkGray}
      _hover={{
        bg: colors.blue,
        color: colors.white,
        boxShadow: 'none',
      }}
      onClick={upCallback}
      isDisabled={upDisabled}
    >
      <Box w="20px" h="20px" as={TriangeIcon} transform="rotate(0deg)" />
    </Button>
    <Button
      w="32px"
      minW="32px"
      padding="0"
      bg={colors.white}
      color={colors.darkGray}
      _hover={{
        bg: colors.blue,
        color: colors.white,
        boxShadow: 'none',
      }}
      onClick={downCallback}
      marginTop="4px"
      isDisabled={downDisabled}
    >
      <Box w="20px" h="20px" as={TriangeIcon} transform="rotate(180deg)" />
    </Button>
  </Flex>
);

const CarDetailsGarageTuning = ({ car, ...props }) => {
  const { id, reward } = car;
  const dispatch = useDispatch();
  const mechanics = useMechanicsCount();
  const {
    availableToBuy,
    unlocked: expTuningSlotUnlocked,
  } = useCarDetailsCustomTypeVisibility('tuning');

  // Fallback values in case the car is from a previous store version
  const tuning = {
    [ATTRIBUTE_TYPES.ACCELERATION]: 0,
    [ATTRIBUTE_TYPES.SPEED]: 0,
    [ATTRIBUTE_TYPES.HANDLING]: 0,
    ...car.tuning,
  };

  const cardBg = (reward && colors.green) || colors.lightBlue;

  const availableAttrPoints =
    -1 *
    (tuning[ATTRIBUTE_TYPES.ACCELERATION] +
      tuning[ATTRIBUTE_TYPES.SPEED] +
      tuning[ATTRIBUTE_TYPES.HANDLING]);

  const maxUnlockedUpgradeObject = maxUnlockedUpgrade(
    'tuning_center',
    mechanics
  );

  // If still locked on exp, hide it
  if (!availableToBuy) {
    return null;
  }

  // Fallback in case no upgrade available
  const maxDifference = (~~maxUnlockedUpgradeObject?.interval[1] || 1) - 1;

  const upDisabled = attr =>
    !(availableAttrPoints > 0 && tuning[attr] < maxDifference);

  const downDisabled = attr =>
    !(car[attr].value + tuning[attr] > 1 && tuning[attr] > -maxDifference);

  const increaseAttr = attr => {
    if (availableAttrPoints <= 0) {
      return;
    }

    dispatch(
      tuneCarAction(id, {
        ...tuning,
        [attr]: tuning[attr] + 1,
      })
    );
  };

  const decreaseAttr = attr => {
    if (car[attr].value + tuning[attr] <= 1) {
      return;
    }

    dispatch(
      tuneCarAction(id, {
        ...tuning,
        [attr]: tuning[attr] - 1,
      })
    );
  };

  return (
    <Flex
      position="relative"
      w="200px"
      bg={colors.darkGray}
      border={`2px solid ${cardBg}`}
      padding="8px 0"
      borderRadius="16px"
      direction="column"
      color={colors.white}
      {...props}
    >
      <Flex
        w="100%"
        justifyContent="space-around"
        fontSize="16px"
        lineHeight="16px"
      >
        <AttrTextValue
          name="ACC"
          value={car[ATTRIBUTE_TYPES.ACCELERATION].value}
          tuning={tuning[ATTRIBUTE_TYPES.ACCELERATION]}
        />
        <AttrTextValue
          name="SPD"
          value={car[ATTRIBUTE_TYPES.SPEED].value}
          tuning={tuning[ATTRIBUTE_TYPES.SPEED]}
        />
        <AttrTextValue
          name="HND"
          value={car[ATTRIBUTE_TYPES.HANDLING].value}
          tuning={tuning[ATTRIBUTE_TYPES.HANDLING]}
        />
      </Flex>
      <Flex w="100%" marginTop="8px" justifyContent="space-around">
        <UpDownButtons
          upCallback={() => increaseAttr(ATTRIBUTE_TYPES.ACCELERATION)}
          upDisabled={upDisabled(ATTRIBUTE_TYPES.ACCELERATION)}
          downCallback={() => decreaseAttr(ATTRIBUTE_TYPES.ACCELERATION)}
          downDisabled={downDisabled(ATTRIBUTE_TYPES.ACCELERATION)}
        />
        <UpDownButtons
          upCallback={() => increaseAttr(ATTRIBUTE_TYPES.SPEED)}
          upDisabled={upDisabled(ATTRIBUTE_TYPES.SPEED)}
          downCallback={() => decreaseAttr(ATTRIBUTE_TYPES.SPEED)}
          downDisabled={downDisabled(ATTRIBUTE_TYPES.SPEED)}
        />
        <UpDownButtons
          upCallback={() => increaseAttr(ATTRIBUTE_TYPES.HANDLING)}
          upDisabled={upDisabled(ATTRIBUTE_TYPES.HANDLING)}
          downCallback={() => decreaseAttr(ATTRIBUTE_TYPES.HANDLING)}
          downDisabled={downDisabled(ATTRIBUTE_TYPES.HANDLING)}
        />
      </Flex>
      <Text
        fontSize="14px"
        lineHeight="14px"
        textAlign="center"
        marginTop="8px"
      >
        (Max tuning per attr: +/- {maxDifference})
      </Text>
      {!expTuningSlotUnlocked && (
        <Flex
          w="100%"
          h="100%"
          top="0"
          left="0"
          position="absolute"
          borderRadius="14px"
          bg={hexAlpha(colors.white, 0.98)}
          color="initial"
        >
          <Text fontSize="24px" textAlign="center" margin="auto">
            Missing <br /> Tuning car <br /> (exp upgrade)
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default CarDetailsGarageTuning;
