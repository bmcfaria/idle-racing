import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import Button from './Button';

const ExperienceBuff = ({
  text,
  valueText = '-10%',
  status,
  onClick,
  colorBought,
  ...props
}) => (
  <Box w="40px" h="40px" {...props}>
    <Button
      w="40px"
      h="40px"
      border="1px solid black"
      padding="0"
      bg={
        (status < 0 && colorBought) ||
        (status > 0 && colors.darkGray) ||
        colors.white
      }
      isDisabled={status !== 0}
      onClick={onClick}
    >
      <Box>
        {text && (
          <Text h="20px" lineHeight="20px">
            {text}
          </Text>
        )}
        <Text h="20px" lineHeight="20px">
          {valueText}
        </Text>
      </Box>
    </Button>
  </Box>
);

const ExperienceUpgradesColumnBuffs = ({
  text,
  experience,
  buyBuff,
  colorBought,
  ...props
}) => (
  <Box>
    <ExperienceBuff
      text={text}
      status={0 - experience}
      onClick={buyBuff}
      colorBought={colorBought}
      {...props}
    />
    <ExperienceBuff
      text={text}
      marginTop="12px"
      status={1 - experience}
      onClick={buyBuff}
      colorBought={colorBought}
      {...props}
    />
    <ExperienceBuff
      text={text}
      marginTop="12px"
      status={2 - experience}
      onClick={buyBuff}
      colorBought={colorBought}
      {...props}
    />
  </Box>
);

export default ExperienceUpgradesColumnBuffs;
