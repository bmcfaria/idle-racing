import React, { useEffect, useRef } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import garageUpgrades from '../helpers/garageUpgrades';
import { useMechanicsCount } from '../helpers/hooksGarage';
import hexAlpha from 'hex-alpha';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { pageNotificationsGarageUpgradesSelector } from '../state/selectors';
import { useState } from 'react';
import { clearGarageUpgradesNotificationsAction } from '../state/actions';

const AnimatedBorderMechanicTech = styled(Flex)`
  ${({ starAnimation }) =>
    starAnimation &&
    'animation: mechanic-tech-animation 1s ease-out alternate-reverse infinite'};

  @keyframes mechanic-tech-animation {
    100% {
      background-color: ${colors.purple};
    }
  }
`;

const MechanicTech = ({ module, starAnimation, totalMechanics }) => (
  <Flex minW="128px" direction="column" alignItems="center">
    <AnimatedBorderMechanicTech
      w="100px"
      h="64px"
      bg={
        totalMechanics >= module.mechanics ? colors.lightBlue : colors.lightGray
      }
      borderRadius="4px"
      border={`2px solid ${colors.darkGray}`}
      textAlign="center"
      alignItems="center"
      direction="column"
      justifyContent="center"
      lineHeight="20px"
      starAnimation={starAnimation}
    >
      <Text>{module.text}</Text>
      {module.subText && <Text fontSize="14px">{module.subText}</Text>}
    </AnimatedBorderMechanicTech>
    <Box
      w="100%"
      borderRight="2px solid black"
      marginTop="8px"
      paddingBottom="4px"
    >
      <Text
        h="20px"
        fontSize="14px"
        lineHeight="20px"
        textAlign="center"
        borderBottom="2px solid black"
      >
        {module.mechanics} {`Mechanic${module.mechanics > 1 ? 's' : ''}`}
      </Text>
    </Box>
  </Flex>
);

const GarageUpgrades = props => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const totalMechanics = useMechanicsCount();
  const newGarageUpgrades = useSelector(
    pageNotificationsGarageUpgradesSelector
  );
  const [
    garageUpgradesNotifications,
    setGarageUpgradesNotifications,
  ] = useState([]);

  const nextUpgradeIndex = garageUpgrades.findIndex(
    upgrade => totalMechanics < upgrade.mechanics
  );

  // To auto scroll to the next unlockable upgrades
  useEffect(() => {
    if (containerRef.current) {
      const leftUpgradesWidth =
        nextUpgradeIndex >= 0
          ? 128 * (garageUpgrades.length - 1 - nextUpgradeIndex) - 16
          : 0;

      containerRef.current.scrollLeft =
        containerRef.current?.scrollWidth -
        containerRef.current?.clientWidth -
        leftUpgradesWidth;
    }
  }, [nextUpgradeIndex]);

  useEffect(() => {
    if (newGarageUpgrades.length > 0) {
      setGarageUpgradesNotifications(...newGarageUpgrades);

      dispatch(clearGarageUpgradesNotificationsAction);
    }
  }, [dispatch, newGarageUpgrades]);

  return (
    <Flex
      minWidth="320px"
      direction="column"
      margin="0 auto"
      borderRadius="8px"
      border={`2px solid ${colors.darkGray}`}
      {...props}
    >
      <Text
        h="32px"
        lineHeight="32px"
        textAlign="center"
        borderRadius="6px 6px 0 0"
        bg={colors.lightBlue}
      >
        {`Garage Upgrades (Mechanics: ${totalMechanics})`}
      </Text>
      <Flex
        ref={containerRef}
        bg={colors.white}
        borderRadius="0 0 8px 8px"
        padding="16px"
        overflowX={totalMechanics > 0 ? 'auto' : 'hidden'}
        overflowY="hidden"
        position="relative"
      >
        {garageUpgrades.map(module => (
          <MechanicTech
            module={module}
            totalMechanics={totalMechanics}
            starAnimation={garageUpgradesNotifications.includes(module.type)}
            key={module.type}
          />
        ))}
        {totalMechanics <= 0 && (
          <Flex
            w="100%"
            h="100%"
            top="0"
            left="0"
            position="absolute"
            borderRadius="inherit"
            bg={hexAlpha(colors.white, 0.98)}
          >
            <Text fontSize="24px" textAlign="center" margin="auto">
              Missing mechanics
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default GarageUpgrades;
