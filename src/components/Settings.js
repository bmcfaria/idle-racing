import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors } from '../helpers/theme';
import { resetAction } from '../state/actions';
import Button from './Button';

const Settings = () => {
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetAction);
  };

  return (
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
        Delete
      </Button>
    </Flex>
  );
};

export default Settings;
