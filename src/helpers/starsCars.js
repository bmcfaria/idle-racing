import { cars } from './data';
import {
  genericAllCompare,
  genericNewStarsNumberCompare,
  genericFindStarId,
} from './stars';

// Car buy/sell base stars
const rewardCarsIdList = cars.reduce(
  (results, car) => (car.reward ? [...results, car.id] : results),
  []
);
export const newBuyCarsStars = (boughtCars, stateStars) => {
  const newStarsBuyCarsNumberCompare = genericNewStarsNumberCompare(
    'buy_cars',
    'total',
    Object.keys(boughtCars).length,
    stateStars
  );

  const rewardCardBought = rewardCarsIdList.filter(rewardCarId =>
    Object.keys(boughtCars).includes(rewardCarId)
  );

  const newStarsBuyRewardCarNumberCompare = genericNewStarsNumberCompare(
    'buy_cars',
    'reward_car',
    rewardCardBought.length,
    stateStars
  );

  return [
    newStarsBuyCarsNumberCompare[0] || newStarsBuyRewardCarNumberCompare[0],
    {
      ...newStarsBuyCarsNumberCompare[1],
      ...newStarsBuyRewardCarNumberCompare[1],
    },
  ];
};

export const newSellCarsStars = (soldCars, stateStars) =>
  genericNewStarsNumberCompare(
    'sell_cars',
    'total',
    Object.keys(soldCars).length,
    stateStars
  );

const getAllCarsStarId = genericFindStarId('cars', 'all', 'all');
export const newGetAllCars = (boughtCars, rewardCars, stateStars) =>
  genericAllCompare(
    Object.keys({ ...boughtCars, ...rewardCars }).length,
    cars.length,
    getAllCarsStarId,
    stateStars
  );
