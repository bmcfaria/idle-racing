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
} from './actions';
import {
  cars,
  tracks,
  money,
  generateGarageCar,
  upgradeAttribute,
  generateCarPrice,
  generateRace,
  generatePastRace,
} from '../helpers/mockData';
import { raceResults } from '../helpers/utils';

const initialState = {
  dealerCars: cars,
  garageCars: [],
  tracks,
  money,
  notifications: [],
  races: [],
  pastRaces: [],
  tutorial: {
    winChance: true,
  },
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_TYPE: {
      return initialState;
    }

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

      if (!car || !!car.race || state.garageCars.length === 1) {
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

    default: {
      return state;
    }
  }
};

export default rootReducer;
