import {
  START_RACE_TYPE,
  CHECK_END_RACE_TYPE,
  CLOSE_RESULTS_TYPE,
  STOP_RACE_TYPE,
  PASSIVE_INCOME_TYPE,
  RECALCULATE_EVENT_MULTIPLIERS_TYPE,
  RECALCULATE_BRAND_COMPLETE_TYPE,
} from './actions';
import {
  generateRace,
  generatePastRace,
  generateToast,
  raceSponsors,
  cars,
  generateGarageCar,
  tracks,
  raceEvents,
} from '../helpers/data';
import {
  raceResults,
  buffValue,
  discountValue,
  TOAST_TYPES,
  sponsorEntryText,
  moneySponsorsCount,
  eventSponsorsStats,
  passiveMoneySponsors,
  passiveMoneyBrands,
} from '../helpers/utils';
import { brandSponsors } from '../helpers/sponsors';
import { evaluateSponsors } from '../helpers/sponsors';

const reducerRace = (state = {}, { type, payload }) => {
  switch (type) {
    case START_RACE_TYPE: {
      const car = state.garageCars.find(item => item.id === payload.carId);
      const track = tracks.find(item => item.id === payload.trackId);

      const calculatedPrice = ~~discountValue(
        track.price,
        state.experience.race.price
      );

      // TODO: return state if not allowed to auto in case of auto

      if (
        !car ||
        !track ||
        car.race ||
        state.tracksStats[track.id]?.race ||
        state.money < calculatedPrice
      ) {
        return state;
      }

      const race = generateRace(car, track, payload.auto);

      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
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
        tracksStats: Object.assign({}, state.tracksStats, {
          [track.id]: {
            ...(state.tracksStats[track.id] || {}),
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
      const track = tracks.find(item => item.id === race.track);
      const carIndex = state.garageCars.findIndex(item => item.id === car.id);

      const results = raceResults(car, track);
      const position = results.findIndex(item => item.id === car.id) + 1;

      const calculatedPrizes = track.prizes.map(prize =>
        buffValue(prize, state.experience.race.prizes)
      );

      const earnedCar =
        isNaN(track.prizes[position - 1]) &&
        cars.find(({ id }) => id === track.prizes[position - 1]);

      const garageCar = earnedCar && generateGarageCar(earnedCar, true);

      let earnings = ~~calculatedPrizes[position - 1];

      const trackStats = {
        ...(state.tracksStats[track.id] || {}),
        raced: ~~state.tracksStats[track.id]?.raced + 1,
        won: ~~state.tracksStats[track.id]?.won + ~~(position === 1),
      };

      const sponsors = evaluateSponsors(
        track,
        car,
        position,
        state.pastRaces,
        state.sponsors.active
      );

      const sponsorToasts = Object.keys(sponsors).map(key => {
        const sponsor = raceSponsors.find(item => item.id === key);
        return generateToast(
          track.name,
          sponsorEntryText(sponsor),
          sponsor.reward === 'mechanic'
            ? TOAST_TYPES.MECHANIC
            : TOAST_TYPES.SPONSOR
        );
      });

      // Append won race toast if race won
      const toasts = [
        ...sponsorToasts,
        generateToast(
          track.name,
          car.name,
          position <= 3
            ? position === 1
              ? TOAST_TYPES.RACE_WON
              : TOAST_TYPES.RACE_TOP_3
            : TOAST_TYPES.RACE_LOST,
          { position }
        ),
      ];

      let stateUpdate = {};
      let expEarned = 0;

      const pastRace = generatePastRace(
        race,
        car,
        track,
        earnings,
        position,
        results
      );

      const garageCars = Object.assign([], state.garageCars, {
        [carIndex]: {
          ...car,
          race: undefined,
        },
      });

      stateUpdate = {
        races: state.races.filter(item => item.id !== race.id),
        garageCars: garageCar ? [...garageCars, garageCar] : garageCars,
        tracksStats: Object.assign({}, state.tracksStats, {
          [track.id]: {
            ...trackStats,
            race: undefined,
            lastRace: pastRace.id,
          },
        }),
        notifications: [pastRace, ...state.notifications],
        pastRaces: [pastRace, ...state.pastRaces],
      };

      expEarned = 1;

      // Initialize active sponsors timestamp if necessary
      const activeMoneySponsors = moneySponsorsCount(sponsors);
      const sponsorsTimestamp =
        !state.sponsors.timestamp && activeMoneySponsors > 0
          ? new Date().getTime()
          : state.sponsors.timestamp;

      return {
        ...state,
        // Flag to notify to recalculate event multipliers of new track stats
        finishRace: true,
        acquiredCar: !!garageCar,
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
            timestamp: sponsorsTimestamp,
          },
        }),
        ...(garageCar && {
          rewardCars: {
            ...state.rewardCars,
            [garageCar.dealerCar]: ~~state.rewardCars[garageCar.dealerCar] + 1,
          },
          pageNotifications: {
            ...state.pageNotifications,
            garagePage: true,
            garage: [...state.pageNotifications.garage, garageCar.id],
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
      const track = tracks.find(item => item.id === race.track);
      const carIndex = state.garageCars.findIndex(item => item.id === car.id);

      return {
        ...state,
        races: state.races.filter(item => item.id !== race.id),
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: {
            ...car,
            race: undefined,
          },
        }),
        tracksStats: Object.assign({}, state.tracksStats, {
          [track.id]: {
            ...(state.tracksStats[track.id] || {}),
            race: undefined,
          },
        }),
        // TODO: cancel race history?
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
      const track = tracks.find(item => item.id === pastRace.track);

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
        tracksStats: Object.assign({}, state.tracksStats, {
          [track.id]: {
            ...(state.tracksStats[track.id] || {}),
            lastRace: undefined,
          },
        }),
      };
    }

    case RECALCULATE_EVENT_MULTIPLIERS_TYPE: {
      const eventMultipliers = raceEvents.reduce((result, { type }) => {
        const eventTracks = tracks.filter(item => item.category === type);
        const eventStats = eventSponsorsStats(eventTracks, state.tracksStats);
        return {
          ...result,
          [type]:
            2 ** (~~eventStats.raced + ~~eventStats.won + ~~eventStats.won10),
        };
      }, {});

      return {
        ...state,
        //Disable flag
        finishRace: false,
        eventMultipliers,
      };
    }

    case RECALCULATE_BRAND_COMPLETE_TYPE: {
      const brandComplete = cars.reduce(
        (result, { id, brand }) => ({
          ...result,
          [brand]:
            !!result[brand] && !!(state.boughtCars[id] || state.rewardCars[id]),
        }),
        brandSponsors
      );

      return {
        ...state,
        //Disable flag
        acquiredCar: false,
        brandComplete,
      };
    }

    case PASSIVE_INCOME_TYPE: {
      const activeMoneySponsors = moneySponsorsCount(state.sponsors.active);
      const currentTime = new Date().getTime();

      if (
        activeMoneySponsors === 0 ||
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

      const passiveMoneyBrandSponsors = passiveMoneyBrands(state.brandComplete);

      const passiveMoneyRaceSponsors = passiveMoneySponsors(
        state.sponsors.active,
        state.eventMultipliers
      );

      const moneyEarned =
        (passiveMoneyRaceSponsors + passiveMoneyBrandSponsors) * cycles;

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
            offlineEarnings: {
              ...state.warnings.offlineEarnings,
              totalValue: moneyEarned,
              sponsorsValue: passiveMoneyRaceSponsors * cycles,
              brandsValue: passiveMoneyBrandSponsors * cycles,
              timelapse,
            },
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
