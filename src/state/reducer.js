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
  OPEN_PAGE_TYPE,
} from './actions';
import { cars as dealerCars, generateGarageCar } from '../helpers/data';
import { discountValue, expLevel } from '../helpers/utils';
import objectAssignDeep from 'object-assign-deep';
import initialState from './initialState';
import experience, { experienceTypePointsSpent } from '../helpers/experience';
import { newExpStars } from '../helpers/starsExp';
import { newBuyCarsStars, newGetAllCars } from '../helpers/starsCars';
import { newUseOfUIPageStars } from '../helpers/stars';

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

      const garageCar = generateGarageCar(
        car,
        payload.carColor || car.defaultColors?.[0]
      );

      const businessExpInc =
        ~~(calculatedPrice / 1000) < 1 ? 1 : ~~(calculatedPrice / 1000);

      const newBoughtCarsObject = {
        ...state.boughtCars,
        [car.id]: ~~state.boughtCars[car.id] + 1,
      };

      const currentTime = new Date().getTime();

      const [newStarsBuyCars, completedStarsBuyCars] = newBuyCarsStars(
        newBoughtCarsObject,
        state.stars
      );

      const [newStarsGetAllCars, completedStarsGetAllCars] = newGetAllCars(
        newBoughtCarsObject,
        state.rewardCars,
        state.stars
      );

      const newStars = newStarsBuyCars || newStarsGetAllCars;

      return {
        ...state,
        acquiredCar: true,
        money: state.money - calculatedPrice,
        boughtCars: newBoughtCarsObject,
        garageCars: [...state.garageCars, garageCar],
        pageNotifications: {
          ...state.pageNotifications,
          garagePage: true,
          starsPage:
            state.pageNotifications.starsPage || (newStars && currentTime),
          garage: [...state.pageNotifications.garage, garageCar.id],
        },
        experience: {
          ...state.experience,
          business: {
            ...state.experience.business,
            exp: state.experience.business.exp + businessExpInc,
          },
        },

        // yay, new player
        ...(!state.globalStats.firstBuy && {
          globalStats: {
            ...state.globalStats,
            firstBuy: garageCar.timestamp,
          },
        }),
        ...(newStars && {
          stars: {
            ...state.stars,
            ...completedStarsBuyCars,
            ...completedStarsGetAllCars,
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

      const { exp, max } = state.experience?.[payload.type];
      const totalEarnedPoints = expLevel(exp, max);

      const pointsSpent = experienceTypePointsSpent(
        payload.type,
        state.experience
      );
      const availablePoints = totalEarnedPoints - pointsSpent;

      if (availablePoints < 1) {
        return state;
      }

      const newExperienceObject = {
        ...state.experience,
        [payload.type]: {
          ...(state.experience[payload.type] || {}),
          [payload.subType]:
            ~~state.experience?.[payload.type][payload.subType] + 1,
        },
      };

      const currentTime = new Date().getTime();

      const [newStarsExp, completedStarsExp] = newExpStars(
        newExperienceObject,
        state.stars
      );

      return {
        ...state,
        experience: newExperienceObject,
        ...(newStarsExp && {
          stars: {
            ...state.stars,
            ...completedStarsExp,
          },
          pageNotifications: {
            ...state.pageNotifications,
            starsPage: state.pageNotifications.starsPage || currentTime,
          },
        }),
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

    case OPEN_PAGE_TYPE: {
      const { pathname } = payload;
      const normalizePathname = pathname
        .toLowerCase()
        .substring(1)
        .split('/')[0];

      if (
        !(normalizePathname in state.pageStats) &&
        state.pageNotifications[`${normalizePathname}Page`] !== true
      ) {
        return state;
      }

      const currentTime = new Date().getTime();

      let newStarsUseOfUIPage = false;
      let completedStarsUseOfUIPage = {};
      if (normalizePathname in state.pageStats) {
        [newStarsUseOfUIPage, completedStarsUseOfUIPage] = newUseOfUIPageStars(
          normalizePathname,
          state.pageStats[normalizePathname] + 1,
          state.stars
        );
      }

      return {
        ...state,
        ...(normalizePathname in state.pageStats && {
          pageStats: {
            ...state.pageStats,
            [normalizePathname]: state.pageStats[normalizePathname] + 1,
          },
        }),
        ...(newStarsUseOfUIPage && {
          stars: {
            ...state.stars,
            ...completedStarsUseOfUIPage,
          },
          pageNotifications: {
            ...state.pageNotifications,
            starsPage: state.pageNotifications.starsPage || currentTime,
          },
        }),
        ...((state.pageNotifications[`${normalizePathname}Page`] === true ||
          `${normalizePathname}Page` === 'starsPage') && {
          pageNotifications: {
            ...state.pageNotifications,
            [`${normalizePathname}Page`]: false,
          },
        }),
      };
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
