import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/core';
import { BottomSpacer } from './BottomSpacer';

const LibraryItem = ({ name, link, npmLink, ...props }) => (
  <Flex w="100%" {...props}>
    <Text textAlign="left" fontSize="16px" whiteSpace="nowrap">
      {name} -
    </Text>
    <Link
      marginLeft="4px"
      href={link}
      isExternal
      fontSize="16px"
      color="teal.500"
    >
      {npmLink ? '(npm link)' : link}
    </Link>
  </Flex>
);

const About = () => {
  return (
    <Flex
      w="100%"
      direction="column"
      bg="white"
      borderRadius="16px"
      minH="50vh"
      alignItems="center"
    >
      <Text marginTop="16px" textAlign="center" fontSize="24px">
        Libraries
      </Text>

      <Box maxW="400px" marginTop="16px">
        <LibraryItem name="React" link="https://reactjs.org/" />
        <LibraryItem name="React Router" link="https://reactrouter.com/" />
        <LibraryItem name="Redux" link="https://redux.js.org/" />
        <LibraryItem name="redux-saga" link="https://redux-saga.js.org/" />
        <LibraryItem name="Chakra UI" link="https://chakra-ui.com/" />
        <LibraryItem name="numbro" link="https://numbrojs.com/" />
        <LibraryItem
          name="seedrandom"
          link="https://www.npmjs.com/package/seedrandom"
          npmLink
        />
        <LibraryItem
          name="uuid-random"
          link="https://www.npmjs.com/package/uuid-random"
          npmLink
        />
        <LibraryItem
          name="object-assign-deep"
          link="https://www.npmjs.com/package/object-assign-deep"
          npmLink
        />
        <LibraryItem
          name="lodash.throttle"
          link="https://www.npmjs.com/package/lodash.throttle"
          npmLink
        />
        <LibraryItem
          name="hex-alpha"
          link="https://www.npmjs.com/package/hex-alpha"
          npmLink
        />
      </Box>

      <Text marginTop="24px" textAlign="center" fontSize="24px">
        About Me
      </Text>
      <Text textAlign="left" fontSize="16px" marginTop="16px">
        bmcfaria :)
      </Text>

      <BottomSpacer />
    </Flex>
  );
};

export default About;
