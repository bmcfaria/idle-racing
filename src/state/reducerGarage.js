import {
  SELL_CAR_TYPE,
  UPGRADE_ATTRIBUTE_TYPE,
  OPEN_GARAGE_TYPE,
  OPEN_GARAGE_CAR_TYPE,
  DISABLE_TUTORIAL_UPGRADE_TYPE,
  BUY_GARAGE_SLOT_TYPE,
} from './actions';
import { upgradeAttribute, generateCarPrice } from '../helpers/mockData';
import { buffValue, discountValue, totalMechanics } from '../helpers/utils';
import { upgradeCenter } from '../helpers/garageUpgrades';

const reducerGarage = (state = {}, { type, payload }) => {
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

      return {
        ...state,
        money: state.money + calculatedPrice,
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

      const calculatedPrice = ~~discountValue(
        car[payload.type].price,
        state.experience.mechanic[payload.type]
      );

      const attribute = car[payload.type];
      const mechanics = totalMechanics(state.tracks);
      const upgradeCenterValue = upgradeCenter[mechanics] ?? 100;

      if (
        !calculatedPrice ||
        state.money < calculatedPrice ||
        attribute.upgrade + attribute.base > upgradeCenterValue
      ) {
        return state;
      }

      const newCar = Object.assign({}, car);
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

      const mechanics = totalMechanics(state.tracks);

      if (state.money < slotPrice || mechanics < 2) {
        return state;
      }

      return {
        ...state,
        money: state.money - slotPrice,
        garageSlots: state.garageSlots + 1,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducerGarage;
