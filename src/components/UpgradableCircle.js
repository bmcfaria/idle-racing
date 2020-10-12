import React from 'react';
import { Flex } from '@chakra-ui/core';
import { colors } from '../helpers/theme';

const baseDashArray = (base, dashSize, divider, perimeter) => {
  const size = dashSize - divider;
  const arrayString = [...Array(base - 1)].reduce(
    result => `${result} ${divider} ${size}`,
    `${size}`
  );
  return `${arrayString} ${perimeter - size * base - divider * (base - 1)}`;
};

const UpgradableCircle = ({
  base = 0,
  value = 0,
  max = 1,
  size = 44,
  showNextUpgradeValue,
  tuning = 0,
  children,
  ...props
}) => {
  const divider = 2;
  const radius = size / 2;
  const perimeter = 2 * Math.PI * radius;

  const dashSize = perimeter / max;

  const baseSize = (dashSize - divider) * base + divider * (base - 1);
  const baseAndUpgradeSize =
    (dashSize - divider) * value + divider * (value - 1);

  const upgrade = value - base;

  return (
    <Flex w={size + 8} h={size + 8} position="relative" {...props}>
      <svg width={size + 8} height={size + 8}>
        {tuning !== 0 && (
          <>
            {/* Special feedback for tuned attributes */}
            <circle
              r={radius}
              cx="50%"
              cy="50%"
              strokeWidth="5"
              stroke="black"
              fill={colors.white}
            />
            <circle
              r={radius}
              cx="50%"
              cy="50%"
              strokeWidth="3"
              stroke={tuning < 0 ? colors.red : colors.green}
              fill="none"
            />
          </>
        )}
        {tuning === 0 && (
          <>
            {/* All circle segments */}
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
            {/* Base / "initial value" segments */}
            {base > 0 && (
              <circle
                r={radius}
                cx="50%"
                cy="50%"
                strokeWidth="5"
                stroke="black"
                fill="none"
                strokeDasharray={baseDashArray(
                  base,
                  dashSize,
                  divider,
                  perimeter
                )}
                strokeDashoffset={`${perimeter / 4 - divider / 2}`}
              />
            )}
            {/* Already upgraded segments */}
            {upgrade > 0 && (
              <circle
                r={radius}
                cx="50%"
                cy="50%"
                strokeWidth="3"
                stroke={colors.darkGray}
                fill="none"
                strokeDasharray={baseDashArray(
                  upgrade,
                  dashSize,
                  divider,
                  perimeter
                )}
                strokeDashoffset={`${
                  perimeter / 4 - divider / 2 - baseSize - divider
                }`}
              />
            )}
            {/* Next segment highlight */}
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
          </>
        )}
      </svg>
      {children && (
        <Flex w="100%" h="100%" position="absolute">
          {children}
        </Flex>
      )}
    </Flex>
  );
};

export default UpgradableCircle;
