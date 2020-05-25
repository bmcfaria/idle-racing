import React from 'react';
import { Box, PseudoBox } from '@chakra-ui/core';
import { Flex } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import { useSelector } from 'react-redux';
import { moneySelector } from '../state/selectors';
import { zIndex, colors } from '../helpers/theme';
import { useCurrentPageName } from '../helpers/hooks';

const RoundTriange = props => (
  <svg
    as="svg"
    width="25"
    height="23"
    viewBox="0 0 25 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.72217 2.48096C10.8769 0.480955 13.7636 0.480957 14.9183 2.48096L23.8728 17.9906C25.0275 19.9906 23.5842 22.4906 21.2748 22.4906H3.36573C1.05633 22.4906 -0.387041 19.9906 0.767659 17.9906L9.72217 2.48096Z"
      fill="currentColor"
    />
  </svg>
);

const TriangleArrowButton = props => (
  <PseudoBox
    as="button"
    w="32px"
    h="32px"
    display="flex"
    color={colors.white}
    transform="rotate(-90deg)"
    _hover={{
      color: colors.pink,
    }}
    {...props}
  >
    <RoundTriange style={{ margin: 'auto' }} />
  </PseudoBox>
);

const Navigation = () => {
  const currentPage = useCurrentPageName();

  if (!currentPage) {
    return <Box />;
  }

  return (
    <Flex h="100%" padding="0 8px" alignItems="center">
      <TriangleArrowButton as={Link} to="/" />
      <Text marginLeft="8px" fontSize="24px" color={colors.white}>
        {currentPage}
      </Text>
    </Flex>
  );
};

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
      <Text fontSize="24px" color={colors.yellow}>
        $
      </Text>
      <Text fontSize="24px" color={colors.white}>
        {~~money}
      </Text>
    </Flex>
  );
};

const HeaderBar = () => {
  return (
    <header>
      {/* spacer */}
      <Box w="100%" h="48px" />

      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="48px"
        zIndex={zIndex.headerBar}
        bg={colors.blue}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <Flex h="100%" justifyContent="space-between">
          <Money />
          <Navigation />
          <Notifications />
        </Flex>
      </Box>
    </header>
  );
};

export default HeaderBar;
