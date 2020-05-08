import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { cardsContainerWidthPaddingStyles } from '../helpers/theme';
import { resetAction } from '../state/actions';

const Container = styled(Flex)`
  ${cardsContainerWidthPaddingStyles}
  margin: 0;
  padding: 0;
`;

const Settings = () => {
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetAction);
  };

  return (
    <Box>
      <Container direction="column" bg="white" borderRadius="16px" minH="50vh">
        <Text marginTop="16px" textAlign="center" fontSize="32px">
          Settings
        </Text>
        <Flex margin="auto" direction="column">
          <Text textAlign="center" fontSize="16px">
            Reset saved game
          </Text>
          <Button margin="16px auto" onClick={reset}>
            Reset
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Settings;
