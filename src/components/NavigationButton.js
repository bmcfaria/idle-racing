import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { colors } from '../helpers/theme';
import Button from './Button';
import styled from '@emotion/styled';

const BlinkingDot = styled(Box)`
  animation: dot-pulse-blink 1s ease-out infinite;

  @keyframes dot-pulse-blink {
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
      pointerEvents="auto"
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

export default NavigationButton;
