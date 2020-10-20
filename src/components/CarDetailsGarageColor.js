import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { changeCarColorAction } from '../state/actions';
import hexAlpha from 'hex-alpha';
import { useExperience } from '../helpers/hooks';
import CarImage from './CarImage';
import { availableColors } from '../helpers/data';
import experienceObject from '../helpers/experience';

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

const CarDetailsGarageColor = ({ car, ...props }) => {
  const { id, reward } = car;
  const dispatch = useDispatch();
  const experienceMechanic = useExperience('mechanic');
  const expCustomizationUnlocked = ~~experienceMechanic.customization > 0;

  const lockedText = experienceObject?.mechanic?.customization?.lockedText?.(
    experienceMechanic.exp
  );
  // If still locked on exp, hide it
  if (lockedText) {
    return null;
  }

  const cardBg = (reward && colors.green) || colors.lightBlue;

  const selectColor = color => dispatch(changeCarColorAction(id, color));

  return (
    <Flex
      position="relative"
      w="200px"
      bg={colors.darkGray}
      border={`2px solid ${cardBg}`}
      padding="4px 0 8px"
      borderRadius="16px"
      direction="column"
      {...props}
    >
      <Flex flexWrap="wrap" paddingRight="4px" justifyContent="center">
        {availableColors.map(color => (
          <CarColorPickerButton
            car={car}
            color={color}
            onClick={() => selectColor(color)}
            marginTop="4px"
            marginLeft="4px"
            key={color}
          />
        ))}
      </Flex>
      {!expCustomizationUnlocked && (
        <Flex
          w="100%"
          h="100%"
          top="0"
          left="0"
          position="absolute"
          borderRadius="14px"
          bg={hexAlpha(colors.white, 0.98)}
        >
          <Text fontSize="24px" textAlign="center" margin="auto">
            Missing <br /> Customize car <br /> (exp upgrade)
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default CarDetailsGarageColor;
