import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { raceSponsorsActiveSelector } from '../state/selectors';
import { colors } from '../helpers/theme';
import { ReactComponent as MechanicIcon } from '../assets/icons/mechanic.svg';

const RaceEventSponsorRewardIcon = ({
  sponsor,
  color = colors.darkGray,
  activeBg = colors.white,
  nonActiveColor = colors.white,
  nonActiveBorderColor = colors.white,
  ...props
}) => {
  const active = !!useSelector(raceSponsorsActiveSelector)?.[sponsor.id];
  return (
    <Flex
      w="24px"
      h="24px"
      borderRadius="12px"
      margin="0 2px"
      color={active ? color : nonActiveColor}
      {...(active && { bg: activeBg })}
      {...(!active && { border: `1px solid ${nonActiveBorderColor}` })}
      {...props}
    >
      {sponsor.reward !== 'mechanic' && (
        <Text
          w="100%"
          h="100%"
          textAlign="center"
          lineHeight="22px"
          fontSize="22px"
        >
          $
        </Text>
      )}
      {sponsor.reward === 'mechanic' && (
        <Box maxW="16px" maxH="16px" margin="auto" as={MechanicIcon} />
      )}
    </Flex>
  );
};

export default RaceEventSponsorRewardIcon;
