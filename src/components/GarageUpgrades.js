import React from 'react';
import { Box, Flex, Text, CircularProgressLabel } from '@chakra-ui/core';
import CollapsiblePanel from './CollapsiblePanel';
import { colors } from '../helpers/theme';
import Button from './Button';
import { CustomCircularProgress } from './CustomCircularProgress';

export const GarageUpgrades = props => (
  <CollapsiblePanel
    wrap="wrap"
    bg={colors.lightBlue}
    color="black"
    border="none"
    text="Garage Upgrades (TBD)"
    {...props}
  >
    <Box h="64px" margin="8px 8px 0 16px">
      <Flex>
        <CustomCircularProgress
          maxW="40px"
          value={90}
          trackColor="transparent"
          size="40px"
          capIsRound
          {...props}
        >
          {
            <CircularProgressLabel color={colors.darkGray} fontSize="14px">
              5s
            </CircularProgressLabel>
          }
        </CustomCircularProgress>
        <Flex margin="4px 0 0 8px" alignItems="baseline">
          <Text fontSize="24px">200</Text>
          <Text fontSize="14px" marginLeft="8px">
            Points
          </Text>
        </Flex>
      </Flex>
      <Flex>Mechanics: 1</Flex>
    </Box>
    <Button minW="100px" h="64px" margin="8px 0 0 8px" flexDirection="column">
      <Text>Upgrade</Text>
      <Text>Center lvl 1</Text>
      <Text>(5 points)</Text>
    </Button>
    <Button minW="100px" h="64px" margin="8px 0 0 8px" flexDirection="column">
      <Text>Garage</Text>
      <Text>Expanse</Text>
      <Text>(25 points)</Text>
    </Button>
  </CollapsiblePanel>
);
