import {
  BUY_CAR_TYPE,
  SELL_CAR_TYPE,
  UPGRADE_ATTRIBUTE_TYPE,
  START_RACE_TYPE,
} from './actions';
import {
  cars,
  tracks,
  money,
  notifications,
  generateGarageCar,
  upgradeAttribute,
  generateCarPrice,
  generateRace,
} from '../helpers/mockData';

const initialState = {
  dealerCars: cars,
  garageCars: [generateGarageCar(cars[0])],
  tracks,
  money,
  notifications,
  races: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BUY_CAR_TYPE: {
      const car = state.dealerCars.find(item => item.id === payload.carId);
      const enoughMoney = state.money >= car?.price;

      if (!car || !enoughMoney) {
        return state;
      }

      return {
        ...state,
        money: state.money - car.price,
        garageCars: [...state.garageCars, generateGarageCar(car)],
      };
    }

    case SELL_CAR_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);

      if (!car) {
        return state;
      }

      return {
        ...state,
        money: state.money + car.price,
        garageCars: state.garageCars.filter(item => item.id !== car.id),
      };
    }

    case UPGRADE_ATTRIBUTE_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);

      if (!car) {
        return state;
      }

      const attribute = car[payload.type];

      if (!attribute.price || state.money - attribute.price < 0) {
        return state;
      }

      const newCar = Object.assign({}, car);
      newCar[payload.type] = upgradeAttribute(attribute);
      newCar.price = generateCarPrice(newCar);

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      return {
        ...state,
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: newCar,
        }),
      };
    }

    case START_RACE_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);
      const track = state.tracks.find(item => item.id === payload.trackId);

      if (!car || !track || car.race || track.race) {
        return state;
      }

      const race = generateRace(car, track);

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      const trackIndex = state.tracks.findIndex(item => item.id === track.id);
      return {
        ...state,
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

    default: {
      return state;
    }
  }
};

export default rootReducer;
