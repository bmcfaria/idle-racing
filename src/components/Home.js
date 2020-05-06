import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import CarDetails from './CarDetails';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';
import CardCarSmall from './CardCarSmall';
import Modal from './Modal';
import styled from '@emotion/styled';
import {
  cardsContainerWidthPaddingStyles,
  CARD_MARGIN,
} from '../helpers/theme';
import { useLocation, Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';

const CarsContainer = styled(Flex)`
  box-sizing: content-box;
  overflow-y: auto;
  padding-top: 28px;
  flex-wrap: wrap;

  ${cardsContainerWidthPaddingStyles}
`;

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
        <CarsContainer />
      </Flex>
    </Box>
  );
};

export default Home;
