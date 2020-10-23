import starsFile from '../assets/lists/stars.json';
import { cars, raceSponsors } from './data';
import upgrades from './garageUpgrades';

// Stars === Achievements

const generateStar = star => ({
  id: star.id,
  name: star.name,
  type: star.type,
  requirement: {
    type: star['req_type'],
    value: star['req_value'],
  },
});

export const stars = starsFile.reduce(
  (results, star) =>
    star?.type.length > 0 ? [...results, generateStar(star)] : results,
  []
);
window.stars = stars;

const starsByTypeObject = stars.reduce(
  (results, star) => ({
    ...results,
    [star.type]: [...(results[star.type] || []), star],
  }),
  {}
);
window.starsByType = starsByTypeObject;

export const starsByType = (type, reqType) =>
  starsByTypeObject[type]?.filter(
    ({ requirement }) => requirement.type === reqType
  );

const generateStoreStar = () => new Date().getTime();

const genericNewStarsNumberCompare = (
  type,
  subType,
  numberToCompare,
  stateStars
) =>
  starsByType(type, subType).reduce(
    (results, star) => {
      const compareResult =
        Number.isInteger(star.requirement.value) &&
        numberToCompare >= star.requirement.value;
      return [
        results[0] || (!stateStars[star.id] && compareResult),
        {
          ...results[1],
          ...(compareResult && {
            [star.id]: stateStars[star.id] || generateStoreStar(),
          }),
        },
      ];
    },
    [false, {}]
  );

export const newRewardMoneyStars = (totalMoneyEarned, stateStars) =>
  genericNewStarsNumberCompare(
    'rewards',
    'money',
    totalMoneyEarned,
    stateStars
  );

const rewardCarsIdList = cars.reduce(
  (results, car) => (car.reward ? [...results, car.id] : results),
  []
);
const rewardCarsAllStarId = starsByTypeObject['rewards'].find(
  ({ requirement }) =>
    requirement.type === 'reward_car' && requirement.value === 'all'
)?.id;
const newRewardAllCarsStars = (newRewardCar, stateRewardCars, stateStars) => {
  if (!newRewardCar || !!stateStars[rewardCarsAllStarId]) {
    return [false, { [rewardCarsAllStarId]: stateStars[rewardCarsAllStarId] }];
  }

  const obtainedRewardIds = Object.keys(stateRewardCars);

  const areAllRewardCarsObtained = rewardCarsIdList.every(carId =>
    obtainedRewardIds.includes(carId)
  );

  return [
    !stateStars[rewardCarsAllStarId] && areAllRewardCarsObtained,
    {
      [rewardCarsAllStarId]:
        stateStars[rewardCarsAllStarId] ||
        (areAllRewardCarsObtained && generateStoreStar()),
    },
  ];
};

export const newRewardCarsStars = (
  newRewardCar,
  stateRewardCars,
  stateStars
) => {
  const totalRewardedCars = Object.values(stateRewardCars).reduce(
    (results, numberOfCars) => results + numberOfCars,
    0
  );

  const newStarsNumberCompare = genericNewStarsNumberCompare(
    'rewards',
    'reward_car',
    totalRewardedCars,
    stateStars
  );
  const newRewardAllCarsStarsCompare = newRewardAllCarsStars(
    newRewardCar,
    stateRewardCars,
    stateStars
  );

  return [
    newStarsNumberCompare[0] || newRewardAllCarsStarsCompare[0],
    { ...newStarsNumberCompare[1], ...newRewardAllCarsStarsCompare[1] },
  ];
};

const mechanicsAllStarId = starsByTypeObject['mechanics'].find(
  ({ requirement }) =>
    requirement.type === 'total' && requirement.value === 'all'
)?.id;
const mechanicsUpgradesAllStarId = starsByTypeObject['mechanics'].find(
  ({ requirement }) =>
    requirement.type === 'upgrades' && requirement.value === 'all'
)?.id;
const totalMechanicSponsorsCount = raceSponsors.filter(
  ({ reward }) => reward === 'mechanic'
).length;
export const newMechanicsStars = (stateSponsors, stateStars) => {
  const obtainedMechanicsCount = Object.values(stateSponsors.active).filter(
    sponsor => sponsor.reward === 'mechanic'
  ).length;

  const newMechanicsTotalAll = {
    [mechanicsAllStarId]:
      stateStars[mechanicsAllStarId] ||
      (totalMechanicSponsorsCount === obtainedMechanicsCount &&
        generateStoreStar()),
  };
  const newMechanicsTotalAllNotify =
    !stateStars[mechanicsAllStarId] &&
    !!newMechanicsTotalAll[mechanicsAllStarId];

  const obtainedGarageUpgradesCount = upgrades.filter(
    ({ mechanics }) => mechanics <= obtainedMechanicsCount
  ).length;
  const newStarsGarageUpgradesNumberCompare = genericNewStarsNumberCompare(
    'mechanics',
    'upgrades',
    obtainedGarageUpgradesCount,
    stateStars
  );

  const newMechanicsUpgradesTotalAll = {
    [mechanicsUpgradesAllStarId]:
      stateStars[mechanicsUpgradesAllStarId] ||
      (obtainedGarageUpgradesCount === upgrades.length && generateStoreStar()),
  };
  const newMechanicsUpgradesTotalAllNotify =
    !stateStars[mechanicsUpgradesAllStarId] &&
    !!newMechanicsUpgradesTotalAll[mechanicsUpgradesAllStarId];

  return [
    newMechanicsTotalAllNotify ||
      newStarsGarageUpgradesNumberCompare[0] ||
      newMechanicsUpgradesTotalAllNotify,
    {
      ...newMechanicsTotalAll,
      ...newStarsGarageUpgradesNumberCompare[1],
      ...newMechanicsUpgradesTotalAll,
    },
  ];
};
