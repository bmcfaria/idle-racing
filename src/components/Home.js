import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import { BottomSpacer } from './BottomSpacer';
import { colors } from '../helpers/theme';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import Button from './Button';
import HomeCardMoney from './HomeCardMoney';
import HomeCardRaces from './HomeCardRaces';
import HomeCardCars from './HomeCardCars';

const Home = () => {
  const cars = useSelector(garageCarsSelector);

  return (
    <Box w="100%">
      <Flex
        w="100%"
        direction="column"
        bg="white"
        borderRadius="16px"
        minH="50vh"
        alignItems="center"
      >
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
        {cars.length > 0 && (
          <Flex
            maxW={`${2 * 160 + 8}px`}
            marginTop="24px"
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))"
            gridGap="8px"
          >
            <HomeCardRaces />
            <HomeCardCars />
            <HomeCardMoney />

            <Button
              w="160px"
              h="76px"
              padding="8px 16px"
              borderRadius="16px"
              textAlign="center"
              bg={colors.darkGray}
              color={colors.white}
              justifyContent="space-around"
              alignItems="center"
              as={Link}
              to="/settings"
            >
              <Box w="40px" h="40px" as={SettingsIcon} />
              <Text w="100%" fontSize="20px" lineHeight="20px">
                Settings
              </Text>
            </Button>
          </Flex>
        )}
        <BottomSpacer />
      </Flex>
    </Box>
  );
};

export default Home;
