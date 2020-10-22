import React from 'react';
import { Box } from '@chakra-ui/core';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import styled from '@emotion/styled';
import NavigationButton from './NavigationButton';
import { useSelector } from 'react-redux';
import { pageNotificationsSelector } from '../state/selectors';

const StarNotification = styled(Box)`
  ${({ starAnimation }) =>
    starAnimation && 'animation: star-icon-nav-button-animation 1s ease-out'};

  @keyframes star-icon-nav-button-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const DynamicIcon = props => {
  const { stars: starsNotification } = useSelector(pageNotificationsSelector);

  return (
    <Box position="relative" {...props}>
      {!starsNotification && (
        <Box as={HomeIcon} position="absolute" top="0" left="0" {...props} />
      )}
      {starsNotification && (
        <StarNotification
          as={StarIcon}
          position="absolute"
          top="0"
          left="0"
          starAnimation
          {...props}
        />
      )}
    </Box>
  );
};

const NavigationHomeButton = props => (
  <NavigationButton icon={DynamicIcon} to="/" text="Home" exact {...props} />
);

export default NavigationHomeButton;
