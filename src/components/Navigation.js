import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';
import { ReactComponent as TrophyIcon } from '../assets/icons/trophy.svg';
import { ReactComponent as GarageIcon } from '../assets/icons/garage.svg';
import { colors, MAX_WIDTH } from '../helpers/theme';
import Button from './Button';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { pageNotificationsSelector } from '../state/selectors';

const BlinkingDot = styled(Box)`
  animation: pulseBlink 1s ease-out infinite;

  @keyframes pulseBlink {
    0% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

const NavigationButton = ({ icon, to, exact, text, notification }) => {
  const match = useRouteMatch({ path: to, exact });
  return (
    <Button
      as={Link}
      to={to}
      w="176px"
      h={['64px', '40px']}
      borderRadius={['0', '20px']}
      color={colors.white}
      bg={match ? colors.purple : colors.blue}
      boxShadow={['none', '0px 4px 4px rgba(0, 0, 0, 0.25)']}
      transition="color 0.2s ease-out"
      _focus={{
        color: colors.darkGray,
      }}
      paddingLeft="0"
      paddingRight="0"
    >
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        position="relative"
        paddingLeft="1rem"
        paddingRight="1rem"
      >
        <Box
          w={['36px', '24px']}
          h={['36px', '24px']}
          as={icon}
          margin="0 auto"
        />

        {notification && (
          <Flex w="12px" h="12px" right={['4px', '4px']} position="absolute">
            <BlinkingDot
              w="8px"
              h="8px"
              margin="auto"
              borderRadius="50%"
              bg={colors.white}
            />
          </Flex>
        )}

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

const Navigation = ({ icon, iconOnly, ...props }) => {
  const pageNotifications = useSelector(pageNotificationsSelector);

  return (
    <Flex
      w="100%"
      h={['calc(64px + env(safe-area-inset-bottom))', '80px']}
      position="fixed"
      bottom="0"
      zIndex="1"
      justifyContent="center"
      {...props}
    >
      <Flex
        w="100%"
        h="100%"
        maxW={MAX_WIDTH}
        paddingBottom="env(safe-area-inset-bottom)"
        background={`linear-gradient(180deg, ${colors.white}00 0%, ${colors.white} 100%)`}
        justifyContent="space-evenly"
        alignItems="center"
        boxShadow={['0px -4px 4px rgba(0, 0, 0, 0.25)', 'none']}
      >
        <NavigationButton icon={HomeIcon} to="/" text="Home" exact />
        <NavigationButton icon={CarIcon} to="/dealer" text="Dealer" />
        <NavigationButton icon={TrophyIcon} to="/race" text="Race" />
        <NavigationButton
          icon={GarageIcon}
          to="/garage"
          text="Garage"
          notification={pageNotifications?.garagePage}
        />
      </Flex>
    </Flex>
  );
};

export default Navigation;
