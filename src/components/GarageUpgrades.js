import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, CircularProgressLabel } from '@chakra-ui/core';
import CollapsiblePanel from './CollapsiblePanel';
import { colors } from '../helpers/theme';
import Button from './Button';
import { CustomCircularProgress } from './CustomCircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  mechanicsSelector,
  garagePointsSelector,
  garageCycleDurationSelector,
  garageCycleTimestampSelector,
  garageUpgradesSelector,
} from '../state/selectors';
import { buyGarageUpgradeAction } from '../state/actions';
import garageUpgrades from '../helpers/garageUpgrades';

const GarageUpgrades = props => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const points = useSelector(garagePointsSelector);
  const mechanics = useSelector(mechanicsSelector);
  const upgrades = useSelector(garageUpgradesSelector);
  const cycleDuration = useSelector(garageCycleDurationSelector);
  const cycleTimestamp = useSelector(garageCycleTimestampSelector);
  const progress = ((cycleDuration - value) * 100) / cycleDuration;

  useEffect(() => {
    if (mechanics === 0) {
      return;
    }

    const countDown = setInterval(() => {
      const nextValue = cycleDuration - (new Date().getTime() - cycleTimestamp);
      if (nextValue <= 0) {
        clearInterval(countDown);
      }

      setValue(nextValue < 0 ? 0 : nextValue);
    }, 250);

    return () => {
      clearInterval(countDown);
    };
  }, [cycleDuration, cycleTimestamp, mechanics]);

  const buyUpgradeCenter = () => {
    dispatch(buyGarageUpgradeAction('upgradeCenter'));
  };

  const buyExpanse = () => {
    dispatch(buyGarageUpgradeAction('expanse'));
  };

  return (
    <CollapsiblePanel
      wrap="wrap"
      bg={colors.lightBlue}
      color="black"
      border="none"
      text={`Garage Upgrades (${points} points)`}
      textWhenOpen="Garage Upgrades"
      isDisabled={mechanics === 0}
      {...props}
    >
      <Box h="64px" margin="8px 8px 0 16px">
        <Flex>
          <CustomCircularProgress
            maxW="40px"
            value={progress > 100 ? 100 : ~~progress}
            trackColor="transparent"
            size="40px"
            capIsRound
            {...props}
          >
            {
              <CircularProgressLabel color={colors.darkGray} fontSize="14px">
                {Math.round(~~value / 1000)}s
              </CircularProgressLabel>
            }
          </CustomCircularProgress>
          <Flex margin="4px 0 0 8px" alignItems="baseline">
            <Text
              minW={`${points}`.length * 16 + 'px'}
              textAlign="center"
              fontSize="24px"
            >
              {points}
            </Text>
            <Text fontSize="14px" marginLeft="8px">
              Points
            </Text>
          </Flex>
        </Flex>
        <Flex>Mechanics: {mechanics}</Flex>
      </Box>
      {garageUpgrades.upgradeCenter.length > upgrades.upgradeCenter && (
        <Button
          minW="100px"
          h="64px"
          margin="8px 0 0 8px"
          flexDirection="column"
          onClick={buyUpgradeCenter}
        >
          <Text>Upgrade</Text>
          <Text>Center lvl {upgrades.upgradeCenter + 1}</Text>
          <Text>
            ({garageUpgrades.upgradeCenter[upgrades.upgradeCenter]} points)
          </Text>
        </Button>
      )}
      {upgrades.expanse === 0 && (
        <Button
          minW="100px"
          h="64px"
          margin="8px 0 0 8px"
          flexDirection="column"
          onClick={buyExpanse}
        >
          <Text>Garage</Text>
          <Text>Expanse</Text>
          <Text>({garageUpgrades.expanse[upgrades.expanse]} points)</Text>
        </Button>
      )}
    </CollapsiblePanel>
  );
};

export default GarageUpgrades;
