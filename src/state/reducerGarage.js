import {
  SELL_CAR_TYPE,
  UPGRADE_ATTRIBUTE_TYPE,
  OPEN_GARAGE_TYPE,
  OPEN_GARAGE_CAR_TYPE,
  DISABLE_TUTORIAL_UPGRADE_TYPE,
  BUY_GARAGE_SLOT_TYPE,
  TUNE_CAR_TYPE,
  CHANGE_CAR_COLOR_TYPE,
} from './actions';
import {
  upgradeAttribute,
  generateCarPrice,
  availableColors,
} from '../helpers/data';
import { ATTRIBUTE_TYPES, buffValue, discountValue } from '../helpers/utils';
import { maxUnlockedUpgrade, requiredUpgrade } from '../helpers/garageUpgrades';
import initialState from './initialState';
import { newSellCarsStars } from '../helpers/starsCars';
import { newGarageSlotsStars } from '../helpers/starsGarage';

const reducerGarage = (state = initialState, { type, payload }) => {
  switch (type) {
    case SELL_CAR_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);

      if (!car || !!car.race || state.garageCars.length === 1) {
        return state;
      }

      const calculatedPrice = ~~buffValue(
        car.price,
        state.experience.business.usedCars
      );

      const businessExpInc =
        ~~(calculatedPrice / 1000) < 1 ? 1 : ~~(calculatedPrice / 1000);

      const newSoldCarsObject = {
        ...state.soldCars,
        [car.dealerCar]: ~~state.soldCars[car.dealerCar] + 1,
      };

      const [newStarsSellCars, completedStarsSellCars] = newSellCarsStars(
        newSoldCarsObject,
        state.stars
      );

      return {
        ...state,
        soldCars: {
          ...state.soldCars,
          [car.dealerCar]: ~~state.soldCars[car.dealerCar] + 1,
        },
        money: state.money + calculatedPrice,
        garageCars: state.garageCars.filter(item => item.id !== car.id),
        experience: {
          ...state.experience,
          business: {
            ...state.experience.business,
            exp: state.experience.business.exp + businessExpInc,
          },
        },
        stars: {
          ...state.stars,
          ...completedStarsSellCars,
        },
        ...(newStarsSellCars && {
          pageNotifications: {
            ...state.pageNotifications,
            stars: true,
          },
        }),
      };
    }

    case UPGRADE_ATTRIBUTE_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);

      if (!car || !!car.race) {
        return state;
      }

      const calculatedPrice = ~~discountValue(
        car[payload.type].price,
        state.experience.mechanic.attrs
      );

      const attribute = car[payload.type];
      const mechanics = Object.values(state.sponsors.active).filter(
        sponsor => sponsor.reward === 'mechanic'
      ).length;
      const requiredUpgradeObject = requiredUpgrade(
        'upgrade_center',
        attribute.value
      );
      const canUpgrade =
        !!requiredUpgradeObject && requiredUpgradeObject.mechanics <= mechanics;

      if (!calculatedPrice || state.money < calculatedPrice || !canUpgrade) {
        return state;
      }

      let newCar = Object.assign({}, car);
      newCar[payload.type] = upgradeAttribute(attribute);
      newCar.price = generateCarPrice(newCar);

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      return {
        ...state,
        money: state.money - calculatedPrice,
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

    case TUNE_CAR_TYPE: {
      const { carId, tuneAttrs } = payload;

      const car = state.garageCars.find(item => item.id === carId);

      const mechanics = Object.values(state.sponsors.active).filter(
        sponsor => sponsor.reward === 'mechanic'
      ).length;

      const maxUnlockedUpgradeObject = maxUnlockedUpgrade(
        'tuning_center',
        mechanics
      );

      // Fallback in case no upgrade available
      const maxDifference = (~~maxUnlockedUpgradeObject?.interval[1] || 1) - 1;

      const tunningTotal =
        ~~tuneAttrs?.[ATTRIBUTE_TYPES.ACCELERATION] +
        ~~tuneAttrs?.[ATTRIBUTE_TYPES.SPEED] +
        ~~tuneAttrs?.[ATTRIBUTE_TYPES.HANDLING];

      const allowedTuning =
        Math.abs(~~tuneAttrs?.[ATTRIBUTE_TYPES.ACCELERATION]) <=
          maxDifference &&
        Math.abs(~~tuneAttrs?.[ATTRIBUTE_TYPES.SPEED]) <= maxDifference &&
        Math.abs(~~tuneAttrs?.[ATTRIBUTE_TYPES.HANDLING]) <= maxDifference;

      const expTuningSlotUnlocked = ~~state.experience?.mechanic?.tuning > 0;

      if (
        !car ||
        tunningTotal > 0 ||
        !allowedTuning ||
        !expTuningSlotUnlocked
      ) {
        return state;
      }

      const newTuning = {
        ...car.tuning,
        ...tuneAttrs,
      };
      let newCar = Object.assign({}, car);
      newCar.tuning = newTuning;

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      return {
        ...state,
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: newCar,
        }),
      };
    }

    case CHANGE_CAR_COLOR_TYPE: {
      const { carId, color } = payload;

      const car = state.garageCars.find(item => item.id === carId);

      const expCutomizationUnlocked =
        ~~state.experience?.mechanic?.customization > 0;

      if (
        !car ||
        !!car.race ||
        !expCutomizationUnlocked ||
        !color ||
        !availableColors.includes(color)
      ) {
        return state;
      }

      let newCar = Object.assign({}, car);
      newCar.color = color;

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      return {
        ...state,
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: newCar,
        }),
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

    case BUY_GARAGE_SLOT_TYPE: {
      const slotPrice = 250 * 2 ** state.garageSlots;

      const mechanics = Object.values(state.sponsors.active).filter(
        sponsor => sponsor.reward === 'mechanic'
      ).length;

      const unlockedUpgrade = maxUnlockedUpgrade('garage_expanse', mechanics);

      if (state.money < slotPrice || !unlockedUpgrade) {
        return state;
      }

      const [
        newStarsGarageSlots,
        completedStarsGarageSlots,
      ] = newGarageSlotsStars(state.garageSlots, state.stars);

      return {
        ...state,
        money: state.money - slotPrice,
        garageSlots: state.garageSlots + 1,
        experience: {
          ...state.experience,
          mechanic: {
            ...state.experience.mechanic,
            exp: state.experience.mechanic.exp + state.garageSlots,
          },
        },
        stars: {
          ...state.stars,
          ...completedStarsGarageSlots,
        },
        ...(newStarsGarageSlots && {
          pageNotifications: {
            ...state.pageNotifications,
            stars: true,
          },
        }),
      };
    }

    default: {
      return state;
    }
  }
};

export default reducerGarage;
