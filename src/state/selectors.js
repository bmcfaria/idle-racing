import {
  cars as dealerCars,
  raceSponsors,
  dealerBrands,
  raceEvents,
  tracks,
} from '../helpers/data';

// Dealer cars are global and they're not in the state/store
export const dealerCarsSelector = () => dealerCars;

export const garageCarsSelector = state => state.garageCars;

// tracks are global and they're not in the state/store
export const tracksSelector = () => tracks;

export const tracksStatsSelector = state => state.tracksStats;

export const moneySelector = state => state.money;
export const totalMoneyEarnedSelector = state => state.totalMoneyEarned;
export const totalMoneySpentSelector = state => state.totalMoneySpent;
export const enoughMoneySelector = price => state => state.money >= price;
export const notificationsSelector = state => state.notifications;

export const racesSelector = state => state.races;

export const totalRacesWonSelector = state => state.totalRacesWon;
export const totalRacesLostSelector = state => state.totalRacesLost;
export const totalRacesCanceledSelector = state => state.totalRacesCanceled;

export const pastRacesSelector = state => state.pastRaces;

export const tutorialWinChanceSelector = state => state.tutorial?.winChance;
export const tutorialUpgradeSelector = state => state.tutorial?.upgrade;

export const pageNotificationsSelector = state => state.pageNotifications;

export const pageNotificationsGarageSelector = state =>
  state.pageNotifications?.garage;
export const pageNotificationsGarageUpgradesSelector = state =>
  state.pageNotifications?.garageUpgrades;

export const experienceSelector = state => state.experience;

export const warningsSelector = state => state.warnings;
export const offlineEarningsSelector = state => state.warnings.offlineEarnings;

export const garageSlotsSelector = state => state.garageSlots;

export const toastsSelector = state => state.toasts;

export const dealerBrandsSelector = () => dealerBrands;

export const raceEventsSelector = () => raceEvents;

export const raceSponsorsSelector = () => raceSponsors;

export const raceSponsorsActiveSelector = state => state.sponsors.active;

export const autoRaceEnabledSelector = state => state.autoRace;

export const boughtCarsSelector = state => state.boughtCars;
export const rewardCarsSelector = state => state.rewardCars;
export const soldCarsSelector = state => state.soldCars;

export const eventMultipliersSelector = state => state.eventMultipliers;
export const brandCompleteSelector = state => state.brandComplete;

export const lockedSelector = state => state.locked;

export const starsSelector = state => state.stars;

export const globalStatsSelector = state => state.globalStats;
