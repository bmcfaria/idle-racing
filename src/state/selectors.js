import { cars as dealerCars, raceSponsors } from '../helpers/mockData';
import { expLevel, expNextLevel, totalMechanics } from '../helpers/utils';
import { capitalize } from 'lodash';

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

export const mechanicsSelector = state => totalMechanics(state.tracks);

export const toastsSelector = state => state.toasts;

export const dealerBrandsSelector = () => [
  { type: 'basic', name: 'basic' },
  { type: 'city', name: 'city' },
  { type: 'offroad', name: 'offroad' },
  { type: 'supercar', name: 'supercar' },
  { type: 'nascar', name: 'nascar' },
  { type: 'f1', name: 'f1' },
  { type: 'racer', name: 'racer' },
  { type: 'heavy', name: 'heavy' },
];

export const raceEventsSelector = () => [
  { type: 'free', name: 'free' },
  { type: 'city', name: 'city' },
  { type: 'offroad', name: 'offroad' },
  { type: 'track', name: 'track' },
];

export const raceSponsorsSelector = event => state =>
  raceSponsors
    .filter(sponsor => sponsor.event === event)
    .map(sponsor => {
      const track = state.tracks.find(item => item.id === sponsor.track);
      const car = dealerCars.find(item => item.id === sponsor.car);

      const timeText = sponsor.times > 1 ? 'times' : 'time';
      const raceText = sponsor.times > 1 ? 'races' : 'race';

      const text = `
      ${capitalize(sponsor.type)} ${sponsor.times} ${
        sponsor.type === 'race' ? timeText : raceText
      }
      `;

      return {
        active: !!state.sponsors.active[sponsor.id],
        text,
        track,
        car,
      };
    });

export const raceSponsorsActiveSelector = state => state.sponsors.active;

export const raceSponsorsActiveCountSelector = event => state =>
  Object.values(state.sponsors.active).filter(
    sponsor => sponsor.event === event
  ).length;

export const autoRaceEnabledSelector = state => state.autoRace;

export const passiveIncomeSelector = state =>
  Object.keys(state.sponsors.active).length;
