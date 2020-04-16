import {
  BUY_CAR_TYPE,
  SELL_CAR_TYPE,
  UPGRADE_ATTRIBUTE_TYPE,
  START_RACE_TYPE,
  END_RACE_TYPE,
} from './actions';
import {
  cars,
  tracks,
  money,
  generateGarageCar,
  upgradeAttribute,
  generateCarPrice,
  generateRace,
  generateNotification,
} from '../helpers/mockData';
import { raceResults } from '../helpers/utils';

const initialState = {
  dealerCars: cars,
  garageCars: [generateGarageCar(cars[0]), generateGarageCar(cars[1])],
  tracks,
  money,
  notifications: [],
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
          },
        }),
        notifications: [
          generateNotification(car, track, position, earnings),
          ...state.notifications,
        ],
      };
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
