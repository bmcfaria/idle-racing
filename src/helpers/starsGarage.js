import { genericNewStarsNumberCompare } from './stars';

// Garage base stars

export const newGarageSlotsStars = (garageSlots, stateStars) =>
  genericNewStarsNumberCompare(
    'garage_slot',
    'upgrades',
    garageSlots,
    stateStars
  );

export const newAttrUpgradesStars = (totalCarUpgrades, stateStars) =>
  genericNewStarsNumberCompare(
    'attr_upgrades',
    'total',
    totalCarUpgrades,
    stateStars
  );

export const newChangeColorStars = (totalCarChangeColor, stateStars) =>
  genericNewStarsNumberCompare(
    'customizations',
    'total',
    totalCarChangeColor,
    stateStars
  );

export const newCarTuningStars = (totalCarTunings, stateStars) =>
  genericNewStarsNumberCompare('tuning', 'total', totalCarTunings, stateStars);
