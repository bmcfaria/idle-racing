import {
  cars as dealerCars,
  raceSponsors,
  dealerBrands,
  raceEvents,
} from '../helpers/data';

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
export const enoughMoneySelector = price => state => state.money >= price;
export const notificationsSelector = state => state.notifications;

export const racesSelector = state => state.races;
export const raceSelector = raceId => state =>
  state.races.find(item => item.id === raceId);

export const raceByTrackSelector = trackId => state =>
  state.races.find(item => item.track === trackId);

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

export const warningsSelector = state => state.warnings;
export const offlineEarningsSelector = state => state.warnings.offlineEarnings;

export const garageSlotsSelector = state => state.garageSlots;
export const garageSlotsEmptySelector = state =>
  state.garageSlots - state.garageCars.length;
export const garageSlotPriceSelector = state => 250 * 2 ** state.garageSlots;

export const mechanicsSelector = state =>
  Object.values(state.sponsors.active).filter(
    sponsor => sponsor.reward === 'mechanic'
  ).length;

export const toastsSelector = state => state.toasts;

export const dealerBrandsSelector = () => dealerBrands;

export const raceEventsSelector = () => raceEvents;

export const raceSponsorsSelector = () => raceSponsors;

export const raceSponsorsActiveSelector = state => state.sponsors.active;

export const raceSponsorsActiveCountSelector = event => state =>
  Object.values(state.sponsors.active).filter(
    sponsor => sponsor.event === event && sponsor.reward === 'money'
  ).length;

export const autoRaceEnabledSelector = state => state.autoRace;

export const passiveIncomeSelector = state =>
  Object.values(state.sponsors.active).filter(
    sponsor => sponsor.reward === 'money'
  ).length;

export const boughtCarsSelector = state => state.boughtCars;
