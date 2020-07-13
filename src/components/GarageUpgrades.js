import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import CollapsiblePanel from './CollapsiblePanel';
import { colors } from '../helpers/theme';
import { useSelector } from 'react-redux';
import { mechanicsSelector } from '../state/selectors';
import garageUpgrades from '../helpers/garageUpgrades';

const GarageUpgrades = props => {
  const mechanics = useSelector(mechanicsSelector);

  const next = garageUpgrades[mechanics].next;
  const modules = garageUpgrades[next]?.modules;

  return (
    <CollapsiblePanel
      wrap="wrap"
      bg={colors.lightBlue}
      color="black"
      border="none"
      text={`Garage Upgrades (Mechanics: ${mechanics})`}
      {...props}
    >
      <Box h="64px" margin="8px 8px 0 16px" paddingTop="8px">
        <Flex fontSize="20px">Next level</Flex>
        <Flex>Mechanics: {next}</Flex>
      </Box>
      {modules &&
        modules.map((item, index) => (
          <Flex
            w="100px"
            h="64px"
            margin="8px 0 0 8px"
            border="2px solid black"
            borderRadius="16px"
            textAlign="center"
            alignItems="center"
            key={index}
          >
            <Text>{item}</Text>
          </Flex>
        ))}
    </CollapsiblePanel>
  );
};

export default GarageUpgrades;
