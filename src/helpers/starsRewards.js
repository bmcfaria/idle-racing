import { cars } from './data';
import {
  genericNewStarsNumberCompare,
  generateStoreStar,
  genericFindStarId,
} from './stars';

// Reward money base stars
export const newRewardMoneyStars = (totalMoneyEarned, stateStars) =>
  genericNewStarsNumberCompare(
    'rewards',
    'money',
    totalMoneyEarned,
    stateStars
  );

// Reward cars base stars
const rewardCarsIdList = cars.reduce(
  (results, car) => (car.reward ? [...results, car.id] : results),
  []
);
const rewardCarsAllStarId = genericFindStarId('rewards', 'reward_car', 'all');
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
