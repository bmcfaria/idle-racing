import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';

const baseDashArray = (base, dashSize, divider, perimeter) => {
  const size = dashSize - divider;
  const arrayString = [...Array(base - 1)].reduce(
    result => `${result} ${divider} ${size}`,
    `${size}`
  );
  return `${arrayString} ${perimeter - size * base - divider * (base - 1)}`;
};

const AttributeCircle = ({ attr, text, nextUpgrade, showMax, ...props }) => {
  const size = 44;
  const totalNumber = attr.max + attr.base;
  const divider = 2;
  const radius = size / 2;
  const perimeter = 2 * Math.PI * radius;

  const dashSize = perimeter / totalNumber;

  const base = attr.base;
  const upgrades = attr.upgrade;

  const baseSize = (dashSize - divider) * base + divider * (base - 1);
  const baseAndUpgradeSize =
    (dashSize - divider) * (base + upgrades) + divider * (base + upgrades - 1);

  const showNextUpgradeValue =
    nextUpgrade && attr.value + 1 <= attr.max + attr.base;

  return (
    <Flex w={size + 8} h={size + 8} position="relative" {...props}>
      <svg width={size + 8} height={size + 8}>
        <circle
          r={radius}
          cx="50%"
          cy="50%"
          strokeWidth="3"
          stroke={colors.white}
          fill="none"
          strokeDasharray={`${dashSize - divider} ${divider}`}
          strokeDashoffset={`${perimeter / 4 - divider / 2}`}
        />
        <circle
          r={radius}
          cx="50%"
          cy="50%"
          strokeWidth="5"
          stroke="black"
          fill="none"
          strokeDasharray={baseDashArray(base, dashSize, divider, perimeter)}
          strokeDashoffset={`${perimeter / 4 - divider / 2}`}
        />
        {upgrades && (
          <circle
            r={radius}
            cx="50%"
            cy="50%"
            strokeWidth="3"
            stroke={colors.darkGray}
            fill="none"
            strokeDasharray={baseDashArray(
              upgrades,
              dashSize,
              divider,
              perimeter
            )}
            strokeDashoffset={`${
              perimeter / 4 - divider / 2 - baseSize - divider
            }`}
          />
        )}
        {showNextUpgradeValue && (
          <circle
            r={radius}
            cx="50%"
            cy="50%"
            strokeWidth="3"
            stroke={colors.blue}
            fill="none"
            strokeDasharray={baseDashArray(1, dashSize, divider, perimeter)}
            strokeDashoffset={`${
              perimeter / 4 - divider / 2 - baseAndUpgradeSize - divider
            }`}
          />
        )}
      </svg>
      <Flex w="100%" h="100%" position="absolute">
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
              {showNextUpgradeValue ? attr.value + 1 : attr.value}
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
      </Flex>
    </Flex>
  );
};

export default AttributeCircle;
