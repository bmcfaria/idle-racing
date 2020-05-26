import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { GiHomeGarage, GiTrophyCup } from 'react-icons/gi';
import { IoMdCar, IoMdSettings } from 'react-icons/io';
import { colors } from '../helpers/theme';
import Button from './Button';

const NavigationButton = ({ icon, to, text }) => {
  const match = useRouteMatch(to);
  return (
    <Button
      as={Link}
      to={to}
      w="176px"
      h="40px"
      borderRadius="20px"
      color={colors.white}
      bg={match ? colors.purple : colors.blue}
    >
      <Flex w="100%" h="100%" alignItems="center">
        <Box w="24px" h="24px" as={icon} />
        <Text flexGrow="1" fontSize="18px" textAlign="center">
          {text}
        </Text>
      </Flex>
    </Button>
  );
};

const Navigation = ({ icon, iconOnly, ...props }) => (
  <Flex
    w="100%"
    h="80px"
    position="fixed"
    bottom="0"
    background={`linear-gradient(180deg, ${colors.white}00 0%, ${colors.white} 100%)`}
    justifyContent="space-evenly"
    alignItems="center"
    {...props}
  >
    <NavigationButton icon={IoMdCar} to="/dealer" text="Dealer" />
    <NavigationButton icon={GiTrophyCup} to="/race" text="Race" />
    <NavigationButton icon={GiHomeGarage} to="/garage" text="Garage" />
    <NavigationButton icon={IoMdSettings} to="/settings" text="Settings" />
  </Flex>
);

export default Navigation;
