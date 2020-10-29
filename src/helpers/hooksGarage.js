import { useSelector } from 'react-redux';
import {
  garageCarsSelector,
  garageSlotsSelector,
  raceSponsorsActiveSelector,
} from '../state/selectors';
import { useExperience } from './hooks';
import experienceObject from '../helpers/experience';

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

export const useCarDetailsCustomTypeVisibility = type => {
  const experienceMechanic = useExperience('mechanic');
  const expCustomizationUnlocked = ~~experienceMechanic?.[type] > 0;
  const customizeLockedText = experienceObject?.mechanic?.[type]?.lockedText?.(
    experienceMechanic.exp
  );

  return {
    availableToBuy: !customizeLockedText,
    unlocked: expCustomizationUnlocked,
  };
};
