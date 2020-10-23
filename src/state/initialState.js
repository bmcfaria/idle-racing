const initialMoney = 650;

const initialState = {
  finishRace: false,
  acquiredCar: false,
  autoRace: false,
  garageCars: [],
  garageSlots: 1,
  tracksStats: {},

  money: initialMoney,
  // This will be used to take track of overall spending
  lastMoneyValue: initialMoney,
  // For statistics
  totalMoneyEarned: 0,
  totalMoneySpent: 0,

  notifications: [],
  pageNotifications: {
    garagePage: false,
    garage: [],
    stars: false,
  },

  races: [],
  pastRaces: [],
  totalRaced: 0,
  totalRacesWon: 0,
  totalRacesLost: 0,
  totalRacesCanceled: 0,

  tutorial: {
    winChance: true,
    upgrade: true,
  },
  locked: {
    race: {},
  },
  experience: {
    business: {
      exp: 0,
      max: 10 ** (2 * 3 + 1),
    },
    race: {
      exp: 0,
      max: 10 ** (3 * 3),
    },
    mechanic: {
      exp: 0,
      max: 10 ** (3 + 1 + 1),
    },
  },
  sponsors: {
    active: {},
    timestamp: null,
  },
  boughtCars: {},
  rewardCars: {},
  soldCars: {},

  brandComplete: {},
  version: 0.713,
  toasts: [],
  eventMultipliers: {},
  warnings: {
    storeReset: false,
    offlineEarnings: {
      totalValue: 0,
      sponsorsValue: 0,
      brandsValue: 0,
      timelapse: 0,
      maxTime: 2 * 60 * 60 * 1000,
    },
  },

  stars: {},

  globalStats: {
    firstBuy: undefined,
  },
};

export default initialState;
