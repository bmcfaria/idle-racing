import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import garageUpgrades from '../helpers/garageUpgrades';
import { useMechanicsCount } from '../helpers/hooksGarage';
import hexAlpha from 'hex-alpha';

const MechanicTech = ({ module, totalMechanics }) => (
  <Flex minW="128px" direction="column" alignItems="center">
    <Flex
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
    >
      <Text>{module.text}</Text>
      {module.subText && <Text fontSize="14px">{module.subText}</Text>}
    </Flex>
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
  const totalMechanics = useMechanicsCount();

  return (
    <Flex
      minWidth="320px"
      direction="column"
      margin="0 auto"
      bg={colors.lightBlue}
      borderRadius="8px"
      padding="0 1px 1px"
      {...props}
    >
      <Text h="32px" lineHeight="32px" textAlign="center">
        {`Garage Upgrades (Mechanics: ${totalMechanics})`}
      </Text>
      <Flex
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
