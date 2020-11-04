import React from 'react';
import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/core';
import { shallowEqual, useSelector } from 'react-redux';
import {
  garageCarsSelector,
  pageNotificationsSelector,
  starsSelector,
} from '../state/selectors';
import { Link } from 'react-router-dom';
import { BottomSpacer } from './BottomSpacer';
import { colors } from '../helpers/theme';
import { ReactComponent as StarIconSvg } from '../assets/icons/star.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import { ReactComponent as InfoIcon } from '../assets/icons/info.svg';
import Button from './Button';
import HomeCardMoney from './HomeCardMoney';
import HomeCardRaces from './HomeCardRaces';
import HomeCardCars from './HomeCardCars';
import HomeCardTimeStarted from './HomeCardTimeStarted';
import { stars } from '../helpers/stars';
import styled from '@emotion/styled';
import { useStarsLegend } from '../helpers/hooks';

const StarIconNotification = styled(Box)`
  ${({ starAnimation }) =>
    starAnimation &&
    'animation: star-icon-home-card 1s ease-out alternate-reverse infinite'};

  @keyframes star-icon-home-card {
    0% {
      color: currentColor;
    }
    100% {
      color: ${colors.purple};
    }
  }
`;

const StarIcon = props => {
  const { starsPage: starNotification } = useSelector(
    pageNotificationsSelector
  );

  return (
    <StarIconNotification
      as={StarIconSvg}
      starAnimation={starNotification}
      {...props}
    />
  );
};

const HomeCardButton = ({ icon, iconColor, children, ...props }) => (
  <Button
    w="160px"
    minH="76px"
    h="auto"
    padding="8px 16px"
    borderRadius="16px"
    textAlign="center"
    bg={colors.darkGray}
    color={colors.white}
    justifyContent="space-around"
    alignItems="center"
    fontSize="20px"
    lineHeight="20px"
    as={Link}
    {...props}
  >
    <Box w="40px" h="40px" as={icon} {...(iconColor && { color: iconColor })} />
    {children}
  </Button>
);

const Home = () => {
  const cars = useSelector(garageCarsSelector);
  const completedStars = Object.values(
    useSelector(starsSelector, shallowEqual)
  ).reduce((results, star) => results + ~~!!star, 0);
  const { isLegend } = useStarsLegend();

  return (
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
          <HomeCardButton
            icon={StarIcon}
            to="/stars"
            {...(isLegend && { iconColor: colors.lightBlue })}
          >
            <Box flexGrow="1">
              <Text w="100%">Stars</Text>
              {isLegend && (
                <Text w="100%" color={colors.lightBlue}>
                  Legend
                </Text>
              )}
              <Text w="100%" fontSize="16px">
                {completedStars} / {stars.length}
              </Text>
            </Box>
          </HomeCardButton>
          <HomeCardTimeStarted />

          <HomeCardRaces />
          <HomeCardCars />

          <HomeCardMoney />
          <HomeCardButton icon={SettingsIcon} to="/settings">
            <Text flexGrow="1" w="100%">
              Settings
            </Text>
          </HomeCardButton>

          <HomeCardButton icon={InfoIcon} to="/about">
            <Text flexGrow="1" w="100%">
              About
            </Text>
          </HomeCardButton>
        </Flex>
      )}
      <BottomSpacer />
    </Flex>
  );
};

export default Home;
