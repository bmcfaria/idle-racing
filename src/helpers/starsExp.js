import {
  genericAllCompare,
  genericNewStarsNumberCompare,
  genericFindStarId,
} from './stars';
import experience, { experienceTypePointsSpent } from '../helpers/experience';

// Exp base stars
const totalMaxUpgradesPerType = Object.entries(experience).reduce(
  (results, [experienceType, experienceValue]) => ({
    ...results,
    [experienceType]: Object.values(experienceValue).reduce(
      (experienceValueResults, { max }) => experienceValueResults + max,
      0
    ),
  }),
  {}
);

const totalMaxUpgrades = Object.values(totalMaxUpgradesPerType).reduce(
  (results, typeTotal) => results + typeTotal,
  0
);

const expUpgradeAllStarId = genericFindStarId('exp', 'upgrades', 'all');

export const newExpStars = (stateExperience, stateStars) => {
  const totalPointsSpent = Object.keys(experience).reduce(
    (results, type) =>
      results + ~~experienceTypePointsSpent(type, stateExperience),
    0
  );
  const newRacedStarsNumberCompare = genericNewStarsNumberCompare(
    'exp',
    'upgrades',
    totalPointsSpent,
    stateStars
  );

  const newExpUpgradesTotalAll = genericAllCompare(
    totalPointsSpent,
    totalMaxUpgrades,
    expUpgradeAllStarId,
    stateStars
  );

  const newExpUpgradesSpecificAll = Object.keys(experience).reduce(
    (newExpSpecificResults, type) => {
      const newExpUpgradesSpecificPartial = genericAllCompare(
        ~~experienceTypePointsSpent(type, stateExperience),
        totalMaxUpgradesPerType[type],
        genericFindStarId('exp', type, 'all'),
        stateStars
      );
      return [
        newExpSpecificResults[0] || newExpUpgradesSpecificPartial[0],
        {
          ...newExpSpecificResults[1],
          ...newExpUpgradesSpecificPartial[1],
        },
      ];
    },
    [false, {}]
  );

  return [
    newRacedStarsNumberCompare[0] ||
      newExpUpgradesTotalAll[0] ||
      newExpUpgradesSpecificAll[0],
    {
      ...newRacedStarsNumberCompare[1],
      ...newExpUpgradesTotalAll[1],
      ...newExpUpgradesSpecificAll[1],
    },
  ];
};
