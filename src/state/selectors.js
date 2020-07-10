import { cars as dealerCars } from '../helpers/mockData';
import { expLevel, expNextLevel } from '../helpers/utils';

// Dealer cars are global and they're not in the state/store
export const dealerCarsSelector = () => dealerCars;
export const dealerCarSelector = carId => () =>
  dealerCars.find(item => item.id === carId);

export const garageCarsSelector = state => state.garageCars;
export const garageCarSelector = carId => state =>
  state.garageCars.find(item => item.id === carId);

export const tracksSelector = state => state.tracks;
export const trackSelector = trackId => state =>
  state.tracks.find(item => item.id === trackId);

export const moneySelector = state => state.money;
export const notificationsSelector = state => state.notifications;

export const racesSelector = state => state.races;
export const raceSelector = raceId => state =>
  state.races.find(item => item.id === raceId);

export const pastRacesSelector = state => state.pastRaces;
export const pastRaceSelector = pastRaceId => state =>
  state.pastRaces.find(item => item.id === pastRaceId);

export const tutorialWinChanceSelector = state => state.tutorial?.winChance;
export const tutorialUpgradeSelector = state => state.tutorial?.upgrade;
export const lockedSelector = state => state.locked;

export const pageNotificationsSelector = state => state.pageNotifications;

export const pageNotificationsGarageSelector = state =>
  state.pageNotifications?.garage;

export const experienceSelector = state => state.experience;
export const experienceBusinessSelector = state => {
  const { exp, max, newCars, usedCars } = state.experience.business;
  const level = expLevel(exp, max);
  const availablePoints = level - 1 - newCars - usedCars;

  return {
    ...state.experience.business,
    nextLevel: expNextLevel(exp),
    availablePoints,
  };
};
export const experienceRaceSelector = state => {
  const { exp, max, price, prizes } = state.experience.race;
  const level = expLevel(exp, max);
  const availablePoints = level - 1 - price - prizes;

  return {
    ...state.experience.race,
    nextLevel: expNextLevel(exp),
    availablePoints,
  };
};
export const experienceMechanicSelector = state => {
  const { exp, max, acc, spd, hnd } = state.experience.mechanic;
  const level = expLevel(exp, max);
  const availablePoints = level - 1 - acc - spd - hnd;

  return {
    ...state.experience.mechanic,
    nextLevel: expNextLevel(exp),
    availablePoints,
  };
};

export const warningsSelector = state => state.warnings;
export const offlineEarningsSelector = state => state.warnings.offlineEarnings;

export const garageSlotsSelector = state => state.garageSlots;
export const garageSlotsEmptySelector = state =>
  state.garageSlots - state.garageCars.length;
export const garageSlotPriceSelector = state => 250 * 2 ** state.garageSlots;

export const garageCycleTimestampSelector = state =>
  state.garage?.cycleTimestamp;
export const garageCycleDurationSelector = state => state.garage?.cycleDuration;
export const garagePointsSelector = state => ~~state.garage?.points;
export const mechanicsSelector = state =>
  state.tracks.reduce(
    (sum, track) => sum + ~~track.stats?.raced + ~~track.stats?.won,
    0
  );

export const garageUpgradesSelector = state => state.garage.upgrades;
