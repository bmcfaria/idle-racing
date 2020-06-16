import React from 'react';
import { Box, PseudoBox } from '@chakra-ui/core';
import { Flex } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import { useSelector } from 'react-redux';
import { moneySelector, experienceSelector } from '../state/selectors';
import { zIndex, colors } from '../helpers/theme';
import { useCurrentPageName } from '../helpers/hooks';
import abbreviate from 'number-abbreviate';
import Button from './Button';

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
      justifyContent={['flex-end', 'center']}
      paddingRight={['52px', 0]}
      position="absolute"
      {...props}
    >
      <Text fontSize="24px" color={colors.yellow}>
        $
      </Text>
      <Text fontSize="24px" color={colors.white}>
        {abbreviate(money, 1)}
      </Text>
    </Flex>
  );
};

const ExperienceButton = ({ text, value = 0, color = colors.orande }) => {
  const maxValue = 10 ** `${value}`.length;

  return (
    <Button h="100%" bg={colors.white} boxShadow="none">
      <Box marginBottom="2px">
        <Text w="100%" h="16px" fontSize="14px" textAlign="center">
          {text}
        </Text>
        <Box w="100px" h="14px" position="relative" border="1px solid black">
          <Box w={`${(value * 100) / maxValue}%`} h="100%" bg={color} />
          <Text
            w="100%"
            h="12px"
            top="0"
            lineHeight="12px"
            fontSize="12px"
            textAlign="center"
            position="absolute"
          >
            {`${value} / ${maxValue}`}
          </Text>
        </Box>
      </Box>
    </Button>
  );
};

const HeaderBar = () => {
  const experience = useSelector(experienceSelector);

  return (
    <header>
      {/* spacer */}
      <Box w="100%" h="88px" />

      <Box position="fixed" top="0" left="0" w="100%" zIndex={zIndex.headerBar}>
        <Flex
          w="100%"
          h="48px"
          bg={colors.blue}
          position="relative"
          justifyContent="space-between"
        >
          <Money />
          <Navigation />
          <Notifications />
        </Flex>

        <Flex
          w="100%"
          h="40px"
          bg={colors.white}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          justifyContent="space-around"
        >
          <ExperienceButton
            text="Business exp"
            value={experience.business}
            color={colors.orange}
          />
          <ExperienceButton
            text="Race exp"
            value={experience.race}
            color={colors.green}
          />
          <ExperienceButton
            text="Mechanic exp"
            value={experience.mechanic}
            color={colors.lightBlue}
          />
        </Flex>
      </Box>
    </header>
  );
};

export default HeaderBar;
