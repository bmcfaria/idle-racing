import {
  START_RACE_TYPE,
  CHECK_END_RACE_TYPE,
  CLOSE_RESULTS_TYPE,
  STOP_RACE_TYPE,
  CHECK_SPONSORS_TYPE,
} from './actions';
import {
  generateRace,
  generatePastRace,
  resetRace,
  generateRaceMechanicToast,
} from '../helpers/mockData';
import {
  raceResults,
  buffValue,
  discountValue,
  TOAST_TYPES,
} from '../helpers/utils';
import { evaluateSponsors } from '../helpers/sponsors';

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

    case CHECK_END_RACE_TYPE: {
      const race = state.races.find(item => item.id === payload.raceId);

      const timeLeft = race.duration - (new Date().getTime() - race.start);
      if (!race || timeLeft > 0) {
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

      const trackStats = {
        ...(track.stats || {}),
        raced: true,
        won: track.stats?.won + ~~(position === 1),
      };

      let toasts = [];
      if (!track.stats.raced) {
        toasts.push(
          generateRaceMechanicToast(track.name, TOAST_TYPES.MECHANIC_RACE)
        );
      }
      if (track.stats.won === 0 && trackStats.won > 0) {
        toasts.push(
          generateRaceMechanicToast(track.name, TOAST_TYPES.MECHANIC_WON)
        );
      }
      if (
        track.stats.won > 0 &&
        track.stats.won < 100 &&
        trackStats.won >= 100
      ) {
        toasts.push(
          generateRaceMechanicToast(track.name, TOAST_TYPES.MECHANIC_100_WIN)
        );
      }

      // TODO: should show toast when unlocking a new sponsor
      const sponsors = evaluateSponsors(
        track,
        car,
        position,
        state.tracks,
        state.pastRaces,
        state.sponsors.active
      );

      let stateUpdate = {};
      let expEarned = 0;

      if (race.auto) {
        const raceIndex = state.races.findIndex(item => item.id === race.id);
        const timelapse = new Date().getTime() - race.startOriginal;
        const differenceInRaceResets =
          ~~(timelapse / track.duration) - (race.resets + 1);

        // TODO: apply maxTime for auto offline earnings

        // If differenceInRaceResets > 0 then offline earnings
        const offlineEarnings = differenceInRaceResets * earnings;
        earnings += offlineEarnings;

        const resettedRace = resetRace(
          race,
          race.resets + 1 + differenceInRaceResets
        );

        stateUpdate = {
          races: Object.assign([], state.races, {
            [raceIndex]: resettedRace,
          }),
          ...(offlineEarnings > 0 &&
            state.timelapse > 10000 && {
              warnings: {
                ...state.warnings,
                offlineEarnings: {
                  ...state.warnings.offlineEarnings,
                  value: offlineEarnings,
                  timelapse: state.timelapse,
                },
              },
            }),
          tracks: Object.assign([], state.tracks, {
            [trackIndex]: {
              ...track,
              stats: trackStats,
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
              stats: trackStats,
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
        ...(toasts.length > 0 && { toasts: [...state.toasts, ...toasts] }),
        ...(Object.keys(sponsors).length > 0 && {
          sponsors: {
            ...state.sponsors,
            active: {
              ...state.sponsors.active,
              ...sponsors,
            },
            ...(!state.sponsors.timestamp && {
              timestamp: new Date().getTime(),
            }),
          },
        }),
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

    case CHECK_SPONSORS_TYPE: {
      const activeSponsors = Object.keys(state.sponsors.active).length;
      const currentTime = new Date().getTime();

      if (
        activeSponsors === 0 ||
        currentTime - state.sponsors.timestamp < 1000
      ) {
        return state;
      }

      const timelapse = currentTime - state.sponsors.timestamp;

      const cycles = ~~(
        (timelapse < state.warnings.offlineEarnings.maxTime
          ? timelapse
          : state.warnings.offlineEarnings.maxTime) / 1000
      );

      const moneyEarned = activeSponsors * cycles;

      return {
        ...state,
        money: state.money + moneyEarned,
        sponsors: {
          ...state.sponsors,
          timestamp: currentTime,
        },
        ...(cycles > 10 && {
          warnings: {
            ...state.warnings,
            ...(state.timelapse > 10000 && {
              offlineEarnings: {
                ...state.warnings.offlineEarnings,
                value: moneyEarned,
                timelapse: state.timelapse,
              },
            }),
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
