import React from 'react';
import { Flex } from '@chakra-ui/core';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';
import { ReactComponent as TrophyIcon } from '../assets/icons/trophy.svg';
import { ReactComponent as GarageIcon } from '../assets/icons/garage.svg';
import { colors, MAX_WIDTH } from '../helpers/theme';
import { useSelector } from 'react-redux';
import { pageNotificationsSelector } from '../state/selectors';
import NavigationButton from './NavigationButton';
import NavigationHomeButton from './NavigationHomeButton';

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
      pointerEvents="none"
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
        <NavigationHomeButton />
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
