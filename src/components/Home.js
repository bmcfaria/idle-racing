import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import { BottomSpacer } from './BottomSpacer';

const Home = () => {
  const cars = useSelector(garageCarsSelector);

  return (
    <Box>
      <Flex direction="column" bg="white" borderRadius="16px" minH="50vh">
        <Text marginTop="16px" textAlign="center" fontSize="32px">
          IdleRacing
        </Text>
        {cars.length === 0 && (
          <Flex margin="auto" direction="column">
            <Text fontSize="24px">Buy your first car</Text>
            <Text fontSize="24px">and start racing!</Text>
            <ChakraLink
              as={Link}
              to="/dealer"
              fontSize="12px"
              color="teal.500"
              margin="8px auto 0"
            >
              go to Dealer
            </ChakraLink>
          </Flex>
        )}
        <BottomSpacer />
      </Flex>
    </Box>
  );
};

export default Home;
