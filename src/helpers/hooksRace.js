import { useSelector } from 'react-redux';
import {
  dealerCarsSelector,
  pastRacesSelector,
  racesSelector,
} from '../state/selectors';
import { capitalize, carTypeText } from './utils';
import {
  experienceSelector,
  tracksStatsSelector,
  tracksSelector,
  lockedSelector,
} from '../state/selectors';
import { eventSponsorsStats } from './utils';
import { raceEvents, tracks } from './data';

export const useTrack = trackId => tracks.find(item => item.id === trackId);

export const useTrackStats = trackId =>
  useSelector(tracksStatsSelector)[trackId];

export const useRace = raceId =>
  useSelector(racesSelector).find(item => item.id === raceId);

export const usePastRace = pastRaceId =>
  useSelector(pastRacesSelector).find(item => item.id === pastRaceId);

export const useRaceByTrack = trackId =>
  useSelector(racesSelector).find(item => item.track === trackId);

export const usePreviousUnlockedTrackChecker = tracks => {
  const tracksStats = useSelector(tracksStatsSelector);

  const isPreviousUnlocked = index => {
    return (
      raceEvents.find(({ type }) => type === tracks[index]?.category)
        ?.unlockedTracks ||
      index === 0 ||
      tracksStats[tracks[index - 1]?.id]?.raced > 0
    );
  };

  return isPreviousUnlocked;
};

export const useEventTracksStatsState = eventType => {
  const tracks = useSelector(tracksSelector);
  const tracksStats = useSelector(tracksStatsSelector);
  const eventRacesAll = tracks.filter(item => item.category === eventType);

  return eventSponsorsStats(eventRacesAll, tracksStats);
};

export const useTrackStatsState = trackId => {
  const trackStats = useTrackStats(trackId);

  return {
    raced: trackStats?.raced,
    won: trackStats?.won > 0,
    won10: trackStats?.won >= 10,
  };
};

export const useRequirements = () => {
  const dealerCars = useSelector(dealerCarsSelector);

  const attrCompare = {
    lt: '<',
    eq: '=',
    gt: '>',
  };

  const requirementText = ({ type, value }) => {
    switch (type) {
      case 'no_ups':
        return 'No upgrades';
      case 'brand':
        return `${capitalize(value)} cars`;
      case 'type':
        return `${carTypeText[value]} only`;
      case 'attr':
        return `Cars with ${value.attr.toUpperCase()} ${
          attrCompare[value.compare]
        } ${value.value}`;
      case 'car':
        const car = dealerCars.find(item => item.id === value);
        return `"${capitalize(car?.name)}" car`;
      default:
        return '';
    }
  };

  return { requirementText };
};

export const useEventsLockedState = () => {
  const experience = useSelector(experienceSelector);
  const { race: lockedRaceEvents } = useSelector(lockedSelector);

  const isLocked = eventType => lockedRaceEvents[eventType];

  const lockedText = eventType => {
    const { unlockRequirements } =
      raceEvents.find(({ type }) => type === eventType) || {};

    if (
      unlockRequirements?.type === 'race-exp' &&
      !(experience.race.exp >= unlockRequirements.value)
    ) {
      return `Requires ${unlockRequirements.value} race exp or above to unlock`;
    }

    return '';
  };

  return { isLocked, lockedText };
};
