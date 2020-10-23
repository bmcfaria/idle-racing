import { tracks } from './data';
import { genericNewStarsNumberCompare, starsByTypeObject } from './stars';

// Raced base stars
export const genericNewRacesStars = (
  reqType,
  totalToCompare,
  trackStatKey,
  startId,
  tracksStats,
  stateStars
) => {
  const newRacedStarsNumberCompare = genericNewStarsNumberCompare(
    'races',
    reqType,
    totalToCompare,
    stateStars
  );

  const newRacesStarsAll = {
    [startId]:
      stateStars[startId] ||
      tracks.every(track => tracksStats[track.id]?.[trackStatKey] > 0),
  };
  const newRacesStarsAllNotify =
    !stateStars[startId] && !!newRacesStarsAll[startId];

  return [
    newRacedStarsNumberCompare[0] || newRacesStarsAllNotify,
    { ...newRacedStarsNumberCompare[1], ...newRacesStarsAll },
  ];
};

const racedAllStarId = starsByTypeObject['races'].find(
  ({ requirement }) =>
    requirement.type === 'race' && requirement.value === 'all'
)?.id;
const winAllStarId = starsByTypeObject['races'].find(
  ({ requirement }) => requirement.type === 'win' && requirement.value === 'all'
)?.id;

export const newRacedStars = (totalRaced, tracksStats, stateStars) =>
  genericNewRacesStars(
    'race',
    totalRaced,
    'raced',
    racedAllStarId,
    tracksStats,
    stateStars
  );

export const newRaceWinStars = (totalWon, tracksStats, stateStars) =>
  genericNewRacesStars(
    'win',
    totalWon,
    'won',
    winAllStarId,
    tracksStats,
    stateStars
  );
