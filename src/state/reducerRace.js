import { START_RACE_TYPE, END_RACE_TYPE, CLOSE_RESULTS_TYPE } from './actions';
import { generateRace, generatePastRace } from '../helpers/mockData';
import { raceResults, buffValue, discountValue } from '../helpers/utils';

const reducerRace = (state = {}, { type, payload }) => {
  switch (type) {
    case START_RACE_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);
      const track = state.tracks.find(item => item.id === payload.trackId);

      const calculatedPrice = ~~discountValue(
        track.price,
        state.experience.race.price
      );

      if (
        !car ||
        !track ||
        car.race ||
        track.race ||
        state.money < calculatedPrice
      ) {
        return state;
      }

      const race = generateRace(car, track);

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      const trackIndex = state.tracks.findIndex(item => item.id === track.id);
      return {
        ...state,
        money: state.money - calculatedPrice,
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

      const calculatedPrizes = track.prizes.map(prize =>
        buffValue(prize, state.experience.race.prizes)
      );

      const earnings = ~~calculatedPrizes[position - 1];

      const pastRace = generatePastRace(
        race,
        car,
        track,
        earnings,
        position,
        results
      );

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

    default: {
      return state;
    }
  }
};

export default reducerRace;
