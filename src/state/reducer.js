import {
  BUY_CAR_TYPE,
  CLEAR_NOTIFICATIONS_TYPE,
  DISABLE_TUTORIAL_WINCHANCE_TYPE,
  RESET_TYPE,
  BUY_EXPERIENCE_BUFF_TYPE,
  CLEAR_STORE_RESET_TYPE,
  CLEAR_OFFLINE_EARNINGS_TYPE,
  DISMISS_TOAST_TYPE,
} from './actions';
import {
  cars as dealerCars,
  tracks,
  generateGarageCar,
} from '../helpers/mockData';
import { discountValue } from '../helpers/utils';

export const initialState = {
  garageCars: [],
  garageSlots: 1,
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
      max: 10 ** (2 * 3),
    },
    race: {
      exp: 0,
      price: 0,
      prizes: 0,
      max: 10 ** (2 * 3),
    },
    mechanic: {
      exp: 0,
      acc: 0,
      spd: 0,
      hnd: 0,
      max: 10 ** (3 * 3),
    },
  },
  version: 0.701,
  toasts: [],
  warnings: {
    storeReset: false,
    offlineEarnings: {
      show: true,
      value: 0,
      timelapse: 0,
    },
  },
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_TYPE: {
      return initialState;
    }

    case BUY_CAR_TYPE: {
      const car = dealerCars.find(item => item.id === payload.carId);

      const calculatedPrice = ~~discountValue(
        car.price,
        state.experience.business.newCars
      );

      const enoughMoney = state.money >= calculatedPrice;

      if (
        !car ||
        !enoughMoney ||
        state.garageCars.length >= state.garageSlots
      ) {
        return state;
      }

      const garageCar = generateGarageCar(car);

      const businessExpInc =
        ~~(calculatedPrice / 1000) < 1 ? 1 : ~~(calculatedPrice / 1000);

      return {
        ...state,
        money: state.money - calculatedPrice,
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

    case BUY_EXPERIENCE_BUFF_TYPE: {
      if (
        payload.type === 'business' &&
        (payload.subType === 'newCars' || payload.subType === 'usedCars')
      ) {
        const { exp, newCars, usedCars } = state.experience.business;
        const availablePoints = `${~~exp}`.length - 1 - newCars - usedCars;

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
        const availablePoints = `${~~exp}`.length - 1 - price - prizes;

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
        const availablePoints = `${~~exp}`.length - 1 - acc - spd - hnd;

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

    case CLEAR_STORE_RESET_TYPE: {
      return {
        ...state,
        warnings: {
          ...state.warnings,
          storeReset: false,
        },
      };
    }

    case CLEAR_OFFLINE_EARNINGS_TYPE: {
      return {
        ...state,
        warnings: {
          ...state.warnings,
          offlineEarnings: {
            ...initialState.warnings.offlineEarnings,
          },
        },
      };
    }

    case DISMISS_TOAST_TYPE: {
      return {
        ...state,
        toasts: state.toasts.filter(item => item.id !== payload.toastId),
      };
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
