import React from 'react';
import { useSelector } from 'react-redux';
import { raceSponsorsSelector } from '../state/selectors';
import { usePassiveIncome, useEventTracksStatsState } from '../helpers/hooks';
import { colors } from '../helpers/theme';
import CollapsiblePanel from './CollapsiblePanel';
import RaceEventSponsorRewardIcon from './RaceEventSponsorRewardIcon';
import RaceEventSponsorReward from './RaceEventSponsorReward';

const RaceEventSponsors = ({ event, ...props }) => {
  const sponsors = useSelector(raceSponsorsSelector).filter(
    sponsor => sponsor.event === event
  );
  const tracksStatsState = useEventTracksStatsState(event);

  const bgColor =
    (tracksStatsState.won100 && colors.lightBlue) ||
    (tracksStatsState.won && colors.green) ||
    (tracksStatsState.raced && colors.orange) ||
    (tracksStatsState.everRaced && colors.darkGray) ||
    colors.lightGray;

  const color =
    (tracksStatsState.won100 && colors.darkGray) ||
    (tracksStatsState.won && colors.darkGray) ||
    (tracksStatsState.raced && colors.darkGray) ||
    (tracksStatsState.everRaced && colors.white) ||
    colors.darkGray;

  const eventPassiveIncome = usePassiveIncome(event);

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
