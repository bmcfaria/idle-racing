import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors } from '../helpers/theme';
import {
  resetAndRecalculateAction,
  resetAndRecalculateDevAction,
} from '../state/actions';
import offroadRaceAll from '../dev/offroad_race_all.json';
import beforeAllRewardCars from '../dev/before_all_reward_cars.json';
import beforeAllMechanics from '../dev/before_all_mechanics.json';
import beforeAllRacesGreen from '../dev/before_all_races_green.json';
import allRacesGreen from '../dev/all_races_green.json';
import Button from './Button';

const inDev = process.env.NODE_ENV === 'development';

const Settings = () => {
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetAndRecalculateAction);
  };

  const resetDev = state => {
    dispatch(resetAndRecalculateDevAction(state));
  };

  return (
    <Box>
      <Flex
        w="240px"
        padding="16px"
        borderRadius="16px"
        direction="column"
        bg={colors.lightGray}
        alignItems="center"
      >
        <Text lineHeight="18px" textAlign="center" fontSize="18px">
          Delete save data
        </Text>
        <Button marginTop="8px" bg={colors.red} onClick={reset}>
          Reset
        </Button>
      </Flex>
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Rich
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev({ money: 9999999999 })}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Enough for car and lvl1 upgrades
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev({ money: 722 })}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Offroad raced all
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(offroadRaceAll)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Before all reward cars
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(beforeAllRewardCars)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Before All Mechanics
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(beforeAllMechanics)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Before All Races Green
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(beforeAllRacesGreen)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            All races green
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(allRacesGreen)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Max Exp
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() =>
              resetDev({
                money: 9999999999,
                experience: {
                  business: {
                    exp: 10 ** (3 * 3),
                  },
                  race: { exp: 10 ** (3 * 3) },
                  mechanic: {
                    exp: 10 ** (3 * 3),
                  },
                },
              })
            }
          >
            Reset
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Settings;
