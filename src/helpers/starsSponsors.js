import { raceSponsors } from './data';
import upgrades from './garageUpgrades';
import {
  genericAllCompare,
  genericNewStarsNumberCompare,
  genericFindStarId,
} from './stars';
import { mechanicSponsorsCount } from './utils';

// Mechanics base stars
const mechanicsAllStarId = genericFindStarId('mechanics', 'total', 'all');
const mechanicsUpgradesAllStarId = genericFindStarId(
  'mechanics',
  'upgrades',
  'all'
);
const totalMechanicSponsorsCount = mechanicSponsorsCount(raceSponsors);
export const newMechanicsStars = (stateSponsors, stateStars) => {
  const obtainedMechanicsCount = mechanicSponsorsCount(stateSponsors.active);

  const newMechanicsTotalAll = genericAllCompare(
    obtainedMechanicsCount,
    totalMechanicSponsorsCount,
    mechanicsAllStarId,
    stateStars
  );

  const obtainedGarageUpgradesCount = upgrades.filter(
    ({ mechanics }) => mechanics <= obtainedMechanicsCount
  ).length;
  const newStarsGarageUpgradesNumberCompare = genericNewStarsNumberCompare(
    'mechanics',
    'upgrades',
    obtainedGarageUpgradesCount,
    stateStars
  );

  const newMechanicsUpgradesTotalAll = genericAllCompare(
    obtainedGarageUpgradesCount,
    upgrades.length,
    mechanicsUpgradesAllStarId,
    stateStars
  );

  return [
    newMechanicsTotalAll[0] ||
      newStarsGarageUpgradesNumberCompare[0] ||
      newMechanicsUpgradesTotalAll[0],
    {
      ...newMechanicsTotalAll[1],
      ...newStarsGarageUpgradesNumberCompare[1],
      ...newMechanicsUpgradesTotalAll[1],
    },
  ];
};

// Sponsor base stars
const moneySponsorsAllStarId = genericFindStarId('sponsors', 'total', 'all');
const totalMoneySponsorsCount = raceSponsors.filter(
  ({ reward }) => reward === 'money'
).length;
const sponsorsIdsByRaceByRaceEvent = raceSponsors.reduce(
  (results, sponsor) => ({
    ...results,
    [sponsor.event]: [...(results[sponsor.event] || []), sponsor.id],
  }),
  {}
);
const sponsorsEventCompeteAllStarId = genericFindStarId(
  'sponsors',
  'event_complete',
  'all'
);
export const newSponsorsStars = (stateSponsors, stateStars) => {
  const obtainedMoneySponsors = Object.values(stateSponsors.active).filter(
    sponsor => sponsor.reward === 'money'
  );

  const newStarsSponsorsNumberCompare = genericNewStarsNumberCompare(
    'sponsors',
    'total',
    obtainedMoneySponsors.length,
    stateStars
  );

  const newMoneySponsorsTotalAll = genericAllCompare(
    obtainedMoneySponsors.length,
    totalMoneySponsorsCount,
    moneySponsorsAllStarId,
    stateStars
  );

  const obtainedCompleteEventSponsorsCount = Object.values(
    sponsorsIdsByRaceByRaceEvent
  ).reduce(
    (results, eventSponsors) =>
      results +
      ~~eventSponsors.every(sponsorId =>
        Object.keys(stateSponsors.active).includes(sponsorId)
      ),
    0
  );

  const newStarsSponsorsEventCompleteCompare = genericNewStarsNumberCompare(
    'sponsors',
    'event_complete',
    obtainedCompleteEventSponsorsCount,
    stateStars
  );

  const newStarsSponsorsEventCompleteAll = genericAllCompare(
    obtainedCompleteEventSponsorsCount,
    Object.values(sponsorsIdsByRaceByRaceEvent).length,
    sponsorsEventCompeteAllStarId,
    stateStars
  );

  return [
    newStarsSponsorsNumberCompare[0] ||
      newMoneySponsorsTotalAll[0] ||
      newStarsSponsorsEventCompleteCompare[0] ||
      newStarsSponsorsEventCompleteAll[0],
    {
      ...newStarsSponsorsNumberCompare[1],
      ...newMoneySponsorsTotalAll[1],
      ...newStarsSponsorsEventCompleteCompare[1],
      ...newStarsSponsorsEventCompleteAll[1],
    },
  ];
};
