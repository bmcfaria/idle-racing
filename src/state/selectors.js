import { cars as dealerCars } from '../helpers/mockData';

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
  const { exp } = state.experience.business;

  return {
    ...state.experience.business,
    nextLevel: 10 ** `${exp}`.length,
  };
};
export const experienceRaceSelector = state => {
  const { exp } = state.experience.race;

  return {
    ...state.experience.race,
    nextLevel: 10 ** `${exp}`.length,
  };
};
export const experienceMechanicSelector = state => {
  const { exp, acc, spd, hnd } = state.experience.mechanic;
  const availablePoints = `${exp}`.length - 1 - acc - spd - hnd;

  return {
    ...state.experience.mechanic,
    nextLevel: 10 ** `${exp}`.length,
    availablePoints,
  };
};
