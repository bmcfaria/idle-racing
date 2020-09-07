import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors } from '../helpers/theme';
import { resetAction, resetDevAction } from '../state/actions';
import Button from './Button';

const inDev = process.env.NODE_ENV === 'development';

const Settings = () => {
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetAction);
  };

  const rich = () => {
    dispatch(
      resetDevAction({
        money: 9999999999999999999,
      })
    );
  };

  return (
    <Box>
      <Flex
        w="240px"
        h="80px"
        borderRadius="16px"
        direction="column"
        bg={colors.lightGray}
        alignItems="center"
      >
        <Text h="30px" lineHeight="30px" textAlign="center" fontSize="18px">
          Delete save data
        </Text>
        <Button marginTop="4px" bg={colors.red} onClick={reset}>
          Reset
        </Button>
      </Flex>
      {inDev && (
        <Flex
          w="240px"
          h="80px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text h="30px" lineHeight="30px" textAlign="center" fontSize="18px">
            Rich
          </Text>
          <Button marginTop="4px" bg={colors.red} onClick={rich}>
            Reset
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Settings;
