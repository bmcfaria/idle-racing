import {
  BUY_CAR_TYPE,
  SELL_CAR_TYPE,
  UPGRADE_ATTRIBUTE_TYPE,
  START_RACE_TYPE,
  END_RACE_TYPE,
  CLOSE_RESULTS_TYPE,
  CLEAR_NOTIFICATIONS_TYPE,
  DISABLE_TUTORIAL_WINCHANCE_TYPE,
  RESET_TYPE,
  OPEN_GARAGE_TYPE,
  OPEN_GARAGE_CAR_TYPE,
  DISABLE_TUTORIAL_UPGRADE_TYPE,
  BUY_EXPERIENCE_BUFF_TYPE,
} from './actions';
import {
  cars as dealerCars,
  tracks,
  generateGarageCar,
  upgradeAttribute,
  generateCarPrice,
  generateRace,
  generatePastRace,
} from '../helpers/mockData';
import { raceResults } from '../helpers/utils';

export const initialState = {
  garageCars: [],
  tracks,
  money: 650,
  notifications: [],
  pageNotifications: {
    garagePage: false,
    garage: [],
  },
  races: [],
  pastRaces: [],
  tutorial: {
    winChance: true,
    upgrade: true,
  },
  locked: {
    race: {
      free: false,
      city: true,
      offroad: true,
      track: true,
    },
  },
  experience: {
    business: {
      exp: 0,
      newCars: 0,
      usedCars: 0,
    },
    race: {
      exp: 0,
      price: 0,
      prizes: 0,
    },
    mechanic: {
      exp: 0,
      acc: 0,
      spd: 0,
      hnd: 0,
    },
  },
  version: 0.4,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_TYPE: {
      return initialState;
    }

    case BUY_CAR_TYPE: {
      const car = dealerCars.find(item => item.id === payload.carId);
      const enoughMoney = state.money >= car?.price;

      if (!car || !enoughMoney) {
        return state;
      }

      const garageCar = generateGarageCar(car);
      const businessExpInc =
        ~~(car.price / 1000) < 1 ? 1 : ~~(car.price / 1000);

      return {
        ...state,
        money: state.money - car.price,
        garageCars: [...state.garageCars, garageCar],
        pageNotifications: {
          ...state.pageNotifications,
          garagePage: true,
          garage: [...state.pageNotifications.garage, garageCar.id],
        },
        experience: {
          ...state.experience,
          business: {
            ...state.experience.business,
            exp: state.experience.business.exp + businessExpInc,
          },
        },
      };
    }

    case SELL_CAR_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);

      if (!car || !!car.race || state.garageCars.length === 1) {
        return state;
      }

      const businessExpInc =
        ~~(car.price / 1000) < 1 ? 1 : ~~(car.price / 1000);

      return {
        ...state,
        money: state.money + car.price,
        garageCars: state.garageCars.filter(item => item.id !== car.id),
        experience: {
          ...state.experience,
          business: {
            ...state.experience.business,
            exp: state.experience.business.exp + businessExpInc,
          },
        },
      };
    }

    case UPGRADE_ATTRIBUTE_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);

      if (!car || !!car.race) {
        return state;
      }

      const attribute = car[payload.type];

      if (!attribute.price || state.money < attribute.price) {
        return state;
      }

      const newCar = Object.assign({}, car);
      newCar[payload.type] = upgradeAttribute(attribute);
      newCar.price = generateCarPrice(newCar);

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      return {
        ...state,
        money: state.money - attribute.price,
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: newCar,
        }),
        experience: {
          ...state.experience,
          mechanic: {
            ...state.experience.mechanic,
            exp: state.experience.mechanic.exp + 1,
          },
        },
      };
    }

    case START_RACE_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);
      const track = state.tracks.find(item => item.id === payload.trackId);

      if (
        !car ||
        !track ||
        car.race ||
        track.race ||
        state.money < track.price
      ) {
        return state;
      }

      const race = generateRace(car, track);

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      const trackIndex = state.tracks.findIndex(item => item.id === track.id);
      return {
        ...state,
        money: state.money - track.price,
        races: [...state.races, race],
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: {
            ...car,
            race: race.id,
          },
        }),
        tracks: Object.assign([], state.tracks, {
          [trackIndex]: {
            ...track,
            race: race.id,
          },
        }),
      };
    }

    case END_RACE_TYPE: {
      const race = state.races.find(item => item.id === payload.raceId);

      if (!race) {
        return state;
      }

      const car = state.garageCars.find(item => item.id === race.car);
      const track = state.tracks.find(item => item.id === race.track);
      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      const trackIndex = state.tracks.findIndex(item => item.id === track.id);

      const results = raceResults(car, track);
      const position = results.findIndex(item => item.id === car.id) + 1;

      const earnings = ~~track.prizes[position - 1];

      const pastRace = generatePastRace(
        race,
        car,
        track,
        earnings,
        position,
        results
      );

      // TODO: add history
      return {
        ...state,
        money: state.money + earnings,
        races: state.races.filter(item => item.id !== race.id),
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: {
            ...car,
            race: undefined,
          },
        }),
        tracks: Object.assign([], state.tracks, {
          [trackIndex]: {
            ...track,
            race: undefined,
            lastRace: pastRace.id,
          },
        }),
        notifications: [pastRace, ...state.notifications],
        pastRaces: [pastRace, ...state.pastRaces],
        locked: {
          ...state.locked,
          race: {
            ...state.locked.race,
            ...(track.category === 'free' && position === 1 && { city: false }),
            ...(track.category === 'city' &&
              position === 1 && { offroad: false }),
            ...(track.category === 'offroad' &&
              position === 1 && { track: false }),
          },
        },
        experience: {
          ...state.experience,
          race: {
            ...state.experience.race,
            exp: state.experience.race.exp + 1,
          },
        },
      };
    }

    case CLOSE_RESULTS_TYPE: {
      const pastRace = state.pastRaces.find(
        item => item.id === payload.pastRaceId
      );

      if (!pastRace) {
        return state;
      }
      const track = state.tracks.find(item => item.id === pastRace.track);
      const trackIndex = state.tracks.findIndex(item => item.id === track.id);

      const pastRaceIndex = state.pastRaces.findIndex(
        item => item.id === payload.pastRaceId
      );

      return {
        ...state,
        pastRaces: Object.assign([], state.pastRaces, {
          [pastRaceIndex]: {
            ...pastRace,
            checked: true,
          },
        }),
        tracks: Object.assign([], state.tracks, {
          [trackIndex]: {
            ...track,
            lastRace: undefined,
          },
        }),
      };
    }

    case CLEAR_NOTIFICATIONS_TYPE: {
      return {
        ...state,
        notifications: [],
      };
    }

    case DISABLE_TUTORIAL_WINCHANCE_TYPE: {
      return {
        ...state,
        tutorial: {
          ...state.tutorial,
          winChance: false,
        },
      };
    }

    case DISABLE_TUTORIAL_UPGRADE_TYPE: {
      return {
        ...state,
        tutorial: {
          ...state.tutorial,
          upgrade: false,
        },
      };
    }

    case OPEN_GARAGE_TYPE: {
      return {
        ...state,
        pageNotifications: {
          ...state.pageNotifications,
          garagePage: false,
        },
      };
    }

    case OPEN_GARAGE_CAR_TYPE: {
      return {
        ...state,
        pageNotifications: {
          ...state.pageNotifications,
          garage: state.pageNotifications.garage.filter(
            item => item !== payload.carId
          ),
        },
      };
    }

    case BUY_EXPERIENCE_BUFF_TYPE: {
      if (
        payload.type === 'business' &&
        (payload.subType === 'newCars' || payload.subType === 'usedCars')
      ) {
        const { exp, newCars, usedCars } = state.experience.business;
        const availablePoints = `${exp}`.length - 1 - newCars - usedCars;

        const increment =
          availablePoints > 0 && state.experience.business[payload.subType] < 3
            ? 1
            : 0;

        return {
          ...state,
          experience: {
            ...state.experience,
            business: {
              ...state.experience.business,
              [payload.subType]:
                state.experience.business[payload.subType] + increment,
            },
          },
        };
      }

      if (
        payload.type === 'race' &&
        (payload.subType === 'price' || payload.subType === 'prizes')
      ) {
        const { exp, price, prizes } = state.experience.race;
        const availablePoints = `${exp}`.length - 1 - price - prizes;

        const increment =
          availablePoints > 0 && state.experience.race[payload.subType] < 3
            ? 1
            : 0;

        return {
          ...state,
          experience: {
            ...state.experience,
            race: {
              ...state.experience.race,
              [payload.subType]:
                state.experience.race[payload.subType] + increment,
            },
          },
        };
      }

      if (
        payload.type === 'mechanic' &&
        (payload.subType === 'acc' ||
          payload.subType === 'spd' ||
          payload.subType === 'hnd')
      ) {
        const { exp, acc, spd, hnd } = state.experience.mechanic;
        const availablePoints = `${exp}`.length - 1 - acc - spd - hnd;

        const increment =
          availablePoints > 0 && state.experience.mechanic[payload.subType] < 3
            ? 1
            : 0;

        return {
          ...state,
          experience: {
            ...state.experience,
            mechanic: {
              ...state.experience.mechanic,
              [payload.subType]:
                state.experience.mechanic[payload.subType] + increment,
            },
          },
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
