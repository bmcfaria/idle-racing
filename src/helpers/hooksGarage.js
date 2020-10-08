import { useSelector } from 'react-redux';
import {
  garageCarsSelector,
  garageSlotsSelector,
  raceSponsorsActiveSelector,
} from '../state/selectors';

export const useGarageCar = carId => {
  const garageCars = useSelector(garageCarsSelector);
  return garageCars.find(item => item.id === carId);
};

export const useGarageSlotPrice = () => {
  const garageSlots = useSelector(garageSlotsSelector);
  return 250 * 2 ** garageSlots;
};

export const useMechanicsCount = () => {
  const sponsors = useSelector(raceSponsorsActiveSelector);

  return Object.values(sponsors).filter(
    sponsor => sponsor.reward === 'mechanic'
  ).length;
};

export const useEmptyGarageSlots = () => {
  const garageCars = useSelector(garageCarsSelector);
  const garageSlots = useSelector(garageSlotsSelector);

  const rewardedCarsCount = garageCars.reduce(
    (result, { reward }) => result + ~~reward,
    0
  );

  return rewardedCarsCount - (garageCars.length - garageSlots);
};
