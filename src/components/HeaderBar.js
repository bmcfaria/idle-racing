import React from 'react';
import { Box } from '@chakra-ui/core';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/core';
import { Flex } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
import Tabs from './Tabs';
import Notifications from './Notifications';
import { useSelector } from 'react-redux';
import { moneySelector } from '../state/selectors';
import { zIndex, colors } from '../helpers/theme';

const Breadcrumbs = () => {
  const location = useLocation();

  const matchGarage = useRouteMatch('/garage');
  const matchDealer = useRouteMatch('/dealer');
  const matchRace = useRouteMatch('/race');
  const matchSettings = useRouteMatch('/settings');

  let selectedPage;
  selectedPage = matchGarage ? 'Garage' : selectedPage;
  selectedPage = matchDealer ? 'Dealer' : selectedPage;
  selectedPage = matchRace ? 'Race' : selectedPage;
  selectedPage = matchSettings ? 'Settings' : selectedPage;

  let selectedPagePath = '/';
  selectedPagePath = matchGarage ? '/garage' : selectedPagePath;
  selectedPagePath = matchDealer ? '/dealer' : selectedPagePath;
  selectedPagePath = matchRace ? '/race' : selectedPagePath;
  selectedPagePath = matchSettings ? '/settings' : selectedPagePath;

  const selecterCar = !!location?.state?.car;

  return (
    <Breadcrumb addSeparator={false}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      {selectedPage && (
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbLink as={Link} to={selectedPagePath}>
            {selectedPage}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {selecterCar && (
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbLink>Car</BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

const Title = () => (
  <Flex
    h="2.5rem"
    align="center"
    paddingLeft="1rem"
    paddingRight="1rem"
    borderBottom="1px solid black"
  >
    <Text fontSize="xl">Idle Racing</Text>
  </Flex>
);

const TriangleArrow = () => (
  <svg
    width="25"
    height="23"
    viewBox="0 0 25 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.72217 2.48096C10.8769 0.480955 13.7636 0.480957 14.9183 2.48096L23.8728 17.9906C25.0275 19.9906 23.5842 22.4906 21.2748 22.4906H3.36573C1.05633 22.4906 -0.387041 19.9906 0.767659 17.9906L9.72217 2.48096Z"
      fill="#FFFFFC"
    />
  </svg>
);

const Navigation = () => <Box />;

const Money = props => {
  const money = useSelector(moneySelector);

  return (
    <Flex
      w="100%"
      h="100%"
      align="center"
      justifyContent="center"
      position="absolute"
      {...props}
    >
      <Text fontSize="xl" color={colors.yellow}>
        $
      </Text>
      <Text fontSize="xl" color={colors.white}>
        {~~money}
      </Text>
    </Flex>
  );
};

const HeaderBar = () => {
  return (
    <header>
      {/* spacer */}
      <Box w="100%" h="3.5rem" />

      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="48px"
        zIndex={zIndex.headerBar}
        bg={colors.blue}
      >
        <Flex h="100%" justifyContent="space-between">
          <TriangleArrow />
          <Money />
          <Notifications />
        </Flex>
      </Box>
      {/* <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        zIndex={zIndex.headerBar}
        bg="white"
      >
        <Flex align="center">
          <Title />
          <Tabs display={['none', 'none', 'flex']} icon />
          <Box flexGrow="1" h="2.5rem" borderBottom="1px solid black">
            <Flex h="2.5rem" justifyContent="flex-end">
              <Score value={money} />
              <Notifications />
            </Flex>
          </Box>
        </Flex>
        <Breadcrumbs />
      </Box> */}
    </header>
  );
};

export default HeaderBar;
