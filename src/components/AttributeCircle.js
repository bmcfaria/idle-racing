import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import UpgradableCircle from './UpgradableCircle';

const AttributeCircle = ({
  attr,
  tuning = 0,
  text,
  nextUpgrade,
  showMax,
  ...props
}) => {
  const totalNumber = attr.max + attr.base;

  const base = attr.base;

  const showNextUpgradeValue =
    nextUpgrade && attr.value + 1 <= attr.max + attr.base;

  const valueWithTuning = attr.value + tuning;

  return (
    <UpgradableCircle
      base={base}
      value={attr.value}
      max={totalNumber}
      showNextUpgradeValue={showNextUpgradeValue}
      tuning={tuning}
      {...props}
    >
      <Flex margin="auto" direction="column" alignItems="center">
        <Text fontSize="12px" lineHeight="12px" color={colors.darkGray}>
          {text}
        </Text>
        <Flex alignItems="baseline">
          <Text
            fontSize="14px"
            lineHeight="14px"
            color={showNextUpgradeValue ? colors.purple : 'inherit'}
          >
            {showNextUpgradeValue ? valueWithTuning + 1 : valueWithTuning}
          </Text>
          {showMax && (
            <Text
              marginTop="auto"
              fontSize="10px"
              lineHeight="10px"
              color={colors.darkGray}
            >
              /{attr.max + attr.base}
            </Text>
          )}
        </Flex>
      </Flex>
    </UpgradableCircle>
  );
};

export default AttributeCircle;
