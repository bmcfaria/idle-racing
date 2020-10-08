import { useSelector } from 'react-redux';
import {
  garageCarsSelector,
  garageSlotsSelector,
  raceSponsorsActiveSelector,
} from '../state/selectors';

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
