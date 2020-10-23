import starsFile from '../assets/lists/stars.json';
import { cars } from './data';

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
            [star.id]: stateStars[star.id] || new Date().getTime(),
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
  if (!newRewardCar) {
    return [false, { [rewardCarsAllStarId]: stateStars[rewardCarsAllStarId] }];
  }

  const obtainedRewardIds = Object.keys(stateRewardCars);

  // Was added by the END_RACE_REWARDS_TYPE
  const couldBeNewStar = stateRewardCars[newRewardCar.id] === 1;

  const areAllRewardCarsObtained = rewardCarsIdList.every(carId =>
    obtainedRewardIds.includes(carId)
  );

  return [
    couldBeNewStar && areAllRewardCarsObtained,
    {
      [rewardCarsAllStarId]:
        stateStars[rewardCarsAllStarId] ||
        (areAllRewardCarsObtained && new Date().getTime()),
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
