import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import {
  trackSelector,
  dealerCarSelector,
  raceSponsorsActiveSelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';
import { sponsorEntryText } from '../helpers/utils';
import RaceEventSponsorRewardIcon from './RaceEventSponsorRewardIcon';

const RaceEventSponsorReward = ({
  sponsor,
  activeBg = colors.darkGray,
  ...props
}) => {
  const track = useSelector(trackSelector(sponsor.track));
  const car = useSelector(dealerCarSelector(sponsor.car));
  const active = !!useSelector(raceSponsorsActiveSelector)?.[sponsor.id];

  const text = sponsorEntryText(sponsor);

  return (
    <Flex
      borderRadius="16px"
      minW="160px"
      h="48px"
      {...(!active && {
        bg: colors.lightGray,
      })}
      border={`1px solid ${colors.darkGray}`}
      {...props}
    >
      <Flex
        w="40px"
        h="48px"
        {...(active && {
          bg: activeBg,
        })}
        borderRadius="16px 0 0 16px"
        margin="-1px 0 0 -1px"
      >
        <RaceEventSponsorRewardIcon
          sponsor={sponsor}
          margin="auto"
          nonActiveColor={colors.darkGray}
          nonActiveBorderColor={colors.lightGray}
        />
      </Flex>
      <Flex
        maxW="119px"
        flexGrow="1"
        direction="column"
        justifyContent="space-around"
        color={active ? 'black' : colors.darkGray}
      >
        <Text
          textAlign="center"
          fontSize="16px"
          lineHeight="16px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {text}
        </Text>
        {track && (
          <Text
            textAlign="center"
            fontSize="14px"
            lineHeight="14px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            "{track?.name}"
          </Text>
        )}
        {car && (
          <Text
            textAlign="center"
            fontSize="14px"
            lineHeight="14px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            "{car?.name}"
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default RaceEventSponsorReward;
