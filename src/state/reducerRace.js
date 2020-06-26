import {
  START_RACE_TYPE,
  END_RACE_TYPE,
  CLOSE_RESULTS_TYPE,
  STOP_RACE_TYPE,
} from './actions';
import { generateRace, generatePastRace, resetRace } from '../helpers/mockData';
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

      // TODO: return state if not allowed to auto in case of auto

      if (
        !car ||
        !track ||
        car.race ||
        track.race ||
        state.money < calculatedPrice
      ) {
        return state;
      }

      const race = generateRace(car, track, payload.auto);

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

      let earnings = ~~calculatedPrizes[position - 1];

      let stateUpdate = {};
      let expEarned = 0;
      if (race.auto) {
        const raceIndex = state.races.findIndex(item => item.id === race.id);
        // console.log(resettedRace);
        // console.log(track.duration);
        // console.log(race.startOriginal);
        const timelapse = new Date().getTime() - race.startOriginal;
        const differenceInRaceResets =
          ~~(timelapse / track.duration) - (race.resets + 1);

        // If differenceInRaceResets > 0 then offline earnings
        const offlineEarnings = differenceInRaceResets * earnings;
        earnings += offlineEarnings;

        const resettedRace = resetRace(
          race,
          race.resets + 1 + differenceInRaceResets
        );
        console.log(differenceInRaceResets, earnings, offlineEarnings);

        stateUpdate = {
          races: Object.assign([], state.races, {
            [raceIndex]: resettedRace,
          }),
          ...(offlineEarnings > 0 && {
            warnings: {
              ...state.warnings,
              offlineEarnings: {
                ...state.warnings.offlineEarnings,
                value: offlineEarnings,
                timeAway: timelapse,
              },
            },
          }),
        };

        expEarned = 0.1;
      } else {
        const pastRace = generatePastRace(
          race,
          car,
          track,
          earnings,
          position,
          results
        );

        stateUpdate = {
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

        expEarned = 1;
      }

      return {
        ...state,
        money: state.money + earnings,
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
            exp: state.experience.race.exp + expEarned,
          },
        },
        ...stateUpdate,
      };
    }

    case STOP_RACE_TYPE: {
      const race = state.races.find(item => item.id === payload.raceId);

      if (!race) {
        return state;
      }

      const car = state.garageCars.find(item => item.id === race.car);
      const track = state.tracks.find(item => item.id === race.track);
      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      const trackIndex = state.tracks.findIndex(item => item.id === track.id);

      return {
        ...state,
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
            // lastRace: pastRace.id,
          },
        }),
        // TODO: auto race history
        // notifications: [pastRace, ...state.notifications],
        // pastRaces: [pastRace, ...state.pastRaces],
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
