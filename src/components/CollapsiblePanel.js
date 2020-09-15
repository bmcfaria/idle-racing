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
  secondaryLine,
  isDisabled,
  bg = colors.darkGray,
  color = colors.white,
  padding = '8px 0 8px 0',
  open: defaultOpen,
  footer,
  ...props
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Flex
      borderRadius="16px"
      bg={colors.white}
      border={`1px solid ${colors.darkGray}`}
      minH={secondaryLine ? '64px' : '32px'}
      margin="0 auto"
      position="relative"
      direction="column"
      minWidth="320px"
      {...props}
    >
      <Button
        w="calc(100% + 2px)"
        wrap="wrap"
        borderRadius="16px"
        padding="0 16px"
        color={color}
        margin="-1px"
        bg={bg}
        minH={secondaryLine ? '64px' : '32px'}
        alignItems="center"
        justifyContent="space-between"
        isDisabled={isDisabled}
        border={`1px solid ${colors.darkGray}`}
        onClick={toggle}
      >
        <Box
          w={secondaryLine ? '24px' : '16px'}
          h={secondaryLine ? '24px' : '16px'}
          {...(!open && { transform: 'rotate(180deg)' })}
          as={Triange}
        />
        <Box>
          <Text minH="32px" lineHeight="32px">
            {open && textWhenOpen ? textWhenOpen : text}
          </Text>
          {secondaryLine && <Flex minH="32px">{secondaryLine}</Flex>}
        </Box>
        <Box
          w={secondaryLine ? '24px' : '16px'}
          h={secondaryLine ? '24px' : '16px'}
          {...(!open && { transform: 'rotate(180deg)' })}
          as={Triange}
        />
      </Button>
      {open && (
        <>
          <Box
            padding={padding}
            borderRadius="16px"
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))"
          >
            {children}
          </Box>
          {footer}
        </>
      )}
    </Flex>
  );
};

export default CollapsiblePanel;
