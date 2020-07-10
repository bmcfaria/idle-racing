import React, { useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import { useToast } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { useSelector } from 'react-redux';
import { toastsSelector } from '../state/selectors';

const Toast = ({ name, reward, description, color }) => (
  <Box
    w="160px"
    h="40px"
    borderRadius="4px"
    margin="8px"
    border={`2px solid ${colors.darkGray}`}
    bg={color}
    fontSize="12px"
  >
    <Text textAlign="center">{name}</Text>
    <Flex justifyContent="space-between" padding="0 4px">
      <Text>{reward}</Text>
      <Text>({description})</Text>
    </Flex>
  </Box>
);

const Toasts = props => {
  const toast = useToast();
  const toasts = useSelector(toastsSelector);

  useEffect(() => {
    toasts.forEach(({ name, reward, description }) => {
      toast({
        // title: 'Account created.',
        // description: "We've created your account for you.",
        // status: 'success',
        duration: 9000,
        position: 'top-right',
        isClosable: true,
        render: () => (
          <Toast
            name={name}
            reward={reward}
            description={description}
            color={colors.green}
          />
        ),
      });
    });
  }, [toast, toasts]);

  return null;
};

export default Toasts;
