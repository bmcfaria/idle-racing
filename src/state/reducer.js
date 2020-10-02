import {
  BUY_CAR_TYPE,
  CLEAR_NOTIFICATIONS_TYPE,
  DISABLE_TUTORIAL_WINCHANCE_TYPE,
  RESET_TYPE,
  BUY_EXPERIENCE_BUFF_TYPE,
  CLEAR_STORE_RESET_TYPE,
  CLEAR_OFFLINE_EARNINGS_TYPE,
  DISMISS_TOAST_TYPE,
  RESET_DEV_TYPE,
} from './actions';
import { cars as dealerCars, generateGarageCar } from '../helpers/data';
import { discountValue } from '../helpers/utils';
import objectAssignDeep from 'object-assign-deep';
import initialState from './initialState';
import experience, { experienceTypePointsSpent } from '../helpers/experience';

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_TYPE: {
      return initialState;
    }

    case RESET_DEV_TYPE: {
      return objectAssignDeep({}, initialState, payload.state || {});
    }

    case BUY_CAR_TYPE: {
      const car = dealerCars.find(item => item.id === payload.carId);

      const calculatedPrice = ~~discountValue(
        car.price,
        state.experience.business.newCars
      );

      const enoughMoney = state.money >= calculatedPrice;

      const rewardedCarsCount = state.garageCars.reduce(
        (result, { reward }) => result + ~~reward,
        0
      );

      if (
        !car ||
        !enoughMoney ||
        state.garageCars.length - rewardedCarsCount >= state.garageSlots
      ) {
        return state;
      }

      const garageCar = generateGarageCar(car);

      const businessExpInc =
        ~~(calculatedPrice / 1000) < 1 ? 1 : ~~(calculatedPrice / 1000);

      return {
        ...state,
        acquiredCar: true,
        money: state.money - calculatedPrice,
        boughtCars: {
          ...state.boughtCars,
          [car.id]: ~~state.boughtCars[car.id] + 1,
        },
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
      const subTypeObject = experience?.[payload.type][payload.subType];
      if (!subTypeObject) {
        return state;
      }

      const stateSubTypeValue =
        state.experience?.[payload.type][payload.subType];
      if (stateSubTypeValue >= subTypeObject?.max) {
        return state;
      }

      const exp = ~~state.experience?.[payload.type].exp;
      const totalEarnedPoints = `${~~exp}`.length - 1;
      const pointsSpent = experienceTypePointsSpent(
        payload.type,
        state.experience
      );
      const availablePoints = totalEarnedPoints - pointsSpent;

      if (availablePoints < 1) {
        return state;
      }

      return {
        ...state,
        experience: {
          ...state.experience,
          [payload.type]: {
            ...(state.experience[payload.type] || {}),
            [payload.subType]:
              ~~state.experience?.[payload.type][payload.subType] + 1,
          },
        },
      };
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
