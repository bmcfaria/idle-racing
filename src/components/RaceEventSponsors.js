import React from 'react';
import { useSelector } from 'react-redux';
import { raceSponsorsSelector } from '../state/selectors';
import {
  usePassiveIncomeEvent,
  useEventTracksStatsState,
} from '../helpers/hooks';
import { colors } from '../helpers/theme';
import CollapsiblePanel from './CollapsiblePanel';
import RaceEventSponsorRewardIcon from './RaceEventSponsorRewardIcon';
import RaceEventSponsorReward from './RaceEventSponsorReward';
import { Flex, Text } from '@chakra-ui/core';

const TracksStatsLegend = ({ tracksStatsState, ...props }) => {
  const statsColors = [
    tracksStatsState.raced ? colors.orange : colors.lightGray,
    tracksStatsState.won ? colors.green : colors.lightGray,
    tracksStatsState.won10 ? colors.lightBlue : colors.lightGray,
  ];

  const textBg =
    (!tracksStatsState.raced && colors.orange) ||
    (!tracksStatsState.won && colors.green) ||
    (!tracksStatsState.won10 && colors.lightBlue) ||
    colors.lightGray;

  const text =
    (!tracksStatsState.raced && 'Race all') ||
    (!tracksStatsState.won && 'Win all') ||
    (!tracksStatsState.won10 && 'Win 10 times each');

  return (
    <Flex fontSize="16px" h="32px" {...props}>
      {statsColors.map((color, index) => (
        <Flex
          w="40px"
          h="100%"
          border={`1px solid ${colors.darkGray}`}
          bg={color}
          color={colors.darkGray}
          justifyContent="space-between"
          padding="0 2px"
          lineHeight="32px"
          key={index}
        >
          <Text>2x</Text>
          <Text fontSize="32px">$</Text>
        </Flex>
      ))}
      {text && (
        <Flex
          w="148px"
          h="100%"
          border={`1px solid ${colors.darkGray}`}
          padding="0 2px"
          bg={textBg}
          color="black"
          textAlign="center"
          lineHeight="16px"
          alignItems="center"
          justifyContent="center"
        >
          <Text>{text}</Text>
        </Flex>
      )}
    </Flex>
  );
};

const RaceEventSponsors = ({ event, ...props }) => {
  const sponsors = useSelector(raceSponsorsSelector).filter(
    sponsor => sponsor.event === event
  );
  const tracksStatsState = useEventTracksStatsState(event);

  const bgColor =
    (tracksStatsState.won10 && colors.lightBlue) ||
    (tracksStatsState.won && colors.green) ||
    (tracksStatsState.raced && colors.orange) ||
    (tracksStatsState.everRaced && colors.darkGray) ||
    colors.lightGray;

  const color =
    (tracksStatsState.won10 && colors.darkGray) ||
    (tracksStatsState.won && colors.darkGray) ||
    (tracksStatsState.raced && colors.darkGray) ||
    (tracksStatsState.everRaced && colors.white) ||
    colors.darkGray;

  const eventPassiveIncome = usePassiveIncomeEvent(event);

  return (
    <CollapsiblePanel
      wrap="wrap"
      text={
        'Sponsors' +
        (eventPassiveIncome > 0 ? ` ($${eventPassiveIncome} /s)` : '')
      }
      secondaryLine={sponsors.map(sponsor => (
        <RaceEventSponsorRewardIcon
          sponsor={sponsor}
          color={bgColor}
          activeBg={color}
          nonActiveColor={color}
          nonActiveBorderColor={color}
          key={sponsor.id}
        />
      ))}
      padding="8px 0 4px 0"
      bg={bgColor}
      color={color}
      footer={
        <Flex
          w="100%"
          padding="0 32px"
          marginTop="8px"
          marginBottom="8px"
          justifyContent="center"
        >
          <TracksStatsLegend tracksStatsState={tracksStatsState} />
        </Flex>
      }
      {...props}
    >
      {sponsors.map(sponsor => (
        <RaceEventSponsorReward
          margin="4px 4px"
          sponsor={sponsor}
          key={sponsor.id}
        />
      ))}
    </CollapsiblePanel>
  );
};

export default RaceEventSponsors;
