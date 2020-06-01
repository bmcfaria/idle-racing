import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';
import { ReactComponent as TrophyIcon } from '../assets/icons/trophy.svg';
import { ReactComponent as GarageIcon } from '../assets/icons/garage.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import { colors } from '../helpers/theme';
import Button from './Button';

const NavigationButton = ({ icon, to, text }) => {
  const match = useRouteMatch(to);
  return (
    <Button
      as={Link}
      to={to}
      w="176px"
      h={['64px', '40px']}
      borderRadius={['4px', '20px']}
      color={colors.white}
      bg={match ? colors.purple : colors.blue}
      marginRight={['2px', 0]}
    >
      <Flex w="100%" h="100%" alignItems="center">
        <Box
          w={['36px', '24px']}
          h={['36px', '24px']}
          as={icon}
          margin="0 auto"
        />
        <Text
          display={['none', 'block']}
          flexGrow="1"
          fontSize="18px"
          textAlign="center"
        >
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
    paddingLeft={['2px', 0]}
    {...props}
  >
    <NavigationButton icon={CarIcon} to="/dealer" text="Dealer" />
    <NavigationButton icon={TrophyIcon} to="/race" text="Race" />
    <NavigationButton icon={GarageIcon} to="/garage" text="Garage" />
    <NavigationButton icon={SettingsIcon} to="/settings" text="Settings" />
  </Flex>
);

export default Navigation;
