import { useSelector } from 'react-redux';
import { cars as dealerCars } from '../helpers/data';
import { boughtCarsSelector, rewardCarsSelector } from '../state/selectors';

export const useDealerCar = carId => dealerCars.find(item => item.id === carId);

export const useCarsAcquired = cars => {
  const boughtCars = useSelector(boughtCarsSelector);
  const rewardCars = useSelector(rewardCarsSelector);

  const uniqueCars = cars.reduce(
    (result, { id }) =>
      boughtCars[id] || rewardCars[id] ? { ...result, [id]: true } : result,
    {}
  );

  return Object.keys(uniqueCars).length;
};
