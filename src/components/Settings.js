import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors } from '../helpers/theme';
import { resetAction } from '../state/actions';

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
      <Button
        h="32px"
        marginTop="4px"
        bg={colors.red}
        fontWeight="inherit"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        onClick={reset}
      >
        Delete
      </Button>
    </Flex>
  );
};

export default Settings;
