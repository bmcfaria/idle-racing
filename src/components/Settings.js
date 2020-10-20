import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors } from '../helpers/theme';
import {
  resetAndRecalculateAction,
  resetAndRecalculateDevAction,
} from '../state/actions';
import offroadRaceAll from '../dev/offroad_race_all.json';
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
                    exp: 1000000,
                  },
                  race: { exp: 1000000 },
                  mechanic: {
                    exp: 1000000000,
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
