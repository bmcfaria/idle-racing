import React, { useState } from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { ReactComponent as Triange } from '../assets/icons/triangle.svg';
import Button from './Button';

const CollapsiblePanel = ({
  text,
  textWhenOpen,
  wrap,
  children,
  isDisabled,
  bg = colors.darkGray,
  color = colors.white,
  padding = '32px 8px 8px 0',
  open: defaultOpen,
  ...props
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Flex
      borderRadius="16px"
      bg={bg}
      minH="32px"
      margin="0 auto"
      position="relative"
      direction="column"
      minWidth="320px"
      {...props}
    >
      <Button
        w="100%"
        wrap="wrap"
        borderRadius="16px"
        padding="0 16px"
        color={color}
        top="0"
        left="0"
        position="absolute"
        bg={bg}
        minH="32px"
        alignItems="center"
        justifyContent="space-between"
        isDisabled={isDisabled}
        onClick={toggle}
      >
        <Box
          w="16px"
          h="16px"
          {...(!open && { transform: 'rotate(180deg)' })}
          as={Triange}
        />
        <Text>{open && textWhenOpen ? textWhenOpen : text}</Text>
        <Box
          w="16px"
          h="16px"
          {...(!open && { transform: 'rotate(180deg)' })}
          as={Triange}
        />
      </Button>
      {open && (
        <Box
          w="calc(100% - 2px)"
          margin="0 auto 1px "
          padding={padding}
          borderRadius="16px"
          bg={colors.white}
          display="grid"
          gridTemplateColumns="repeat( auto-fit, minmax(160px, 1fr) )"
        >
          {children}
        </Box>
      )}
    </Flex>
  );
};

export default CollapsiblePanel;
