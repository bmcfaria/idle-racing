import {
  START_RACE_TYPE,
  CHECK_END_RACE_TYPE,
  CLOSE_RESULTS_TYPE,
  STOP_RACE_TYPE,
  PASSIVE_INCOME_TYPE,
  RECALCULATE_EVENT_MULTIPLIERS_TYPE,
  RECALCULATE_BRAND_COMPLETE_TYPE,
  END_RACE_TOAST_TYPE,
  END_RACE_REWARDS_TYPE,
  END_RACE_UPDATE_STATS_TYPE,
  END_RACE_EXPERIENCE_TYPE,
  END_RACE_SPONSORS_TYPE,
  RACE_LOCKED_REFRESH_TYPE,
  END_RACE_STARS_TYPE,
  GENERATE_TRACK_COMPETITORS_TYPE,
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
  buffValue,
  discountValue,
  TOAST_TYPES,
  sponsorEntryText,
  moneySponsorsCount,
  eventSponsorsStats,
  passiveMoneySponsors,
  passiveMoneyBrands,
  capitalize,
  raceEventToastSubtitle,
} from '../helpers/utils';
import { brandSponsors } from '../helpers/sponsors';
import { evaluateSponsors } from '../helpers/sponsors';
import initialState from './initialState';
import experience from '../helpers/experience';
import { newMechanicsStars, newSponsorsStars } from '../helpers/starsSponsors';
import { newRewardCarsStars } from '../helpers/starsRewards';
import { newRacedStars, newRaceWinStars } from '../helpers/starsRaces';
import { newGetAllCars } from '../helpers/starsCars';
import { generateTrackStatsCompetitors, raceResults } from '../helpers/race';

const reducerRace = (state = initialState, { type, payload }) => {
  switch (type) {
    case GENERATE_TRACK_COMPETITORS_TYPE: {
      const track = tracks.find(item => item.id === payload.trackId);
      const trackStats = state.tracksStats[track?.id];

      if (!track || trackStats?.competitors) {
        return state;
      }

      const competitors = generateTrackStatsCompetitors(track);

      return {
        ...state,
        tracksStats: Object.assign({}, state.tracksStats, {
          [track.id]: {
            ...(state.tracksStats[track.id] || {}),
            competitors,
          },
        }),
      };
    }

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

      const calculatedDuration = discountValue(
        race.duration,
        ~~state.experience.race.duration,
        experience.race.duration.value
      );

      const timeLeft = calculatedDuration - (new Date().getTime() - race.start);
      if (!race || timeLeft > 0) {
        return state;
      }

      const car = state.garageCars.find(item => item.id === race.car);
      const track = tracks.find(item => item.id === race.track);

      const results = raceResults(car, track);
      const position = results.findIndex(item => item.id === car.id) + 1;

      const calculatedPrizes = track.prizes.map(prize =>
        buffValue(prize, state.experience.race.prizes)
      );

      let earnings = calculatedPrizes[position - 1];

      const pastRace = generatePastRace(
        race,
        car,
        track,
        isNaN(earnings) ? track.prizes[position - 1] : earnings,
        position,
        results,
        calculatedPrizes
      );

      return {
        ...state,
        // Flag to notify to recalculate event multipliers of new track stats
        finishRace: true,

        races: state.races.filter(item => item.id !== race.id),
        // notifications: [pastRace, ...state.notifications],
        pastRaces: [pastRace, ...state.pastRaces],
      };
    }

    case END_RACE_UPDATE_STATS_TYPE: {
      const { pastRace } = payload;

      if (!pastRace) {
        return state;
      }

      const car = state.garageCars.find(item => item.id === pastRace.car);
      const carIndex = state.garageCars.findIndex(item => item.id === car.id);
      const track = tracks.find(item => item.id === pastRace.track);
      const { position } = pastRace;

      const trackStats = {
        ...(state.tracksStats[track.id] || {}),
        raced: ~~state.tracksStats[track.id]?.raced + 1,
        won: ~~state.tracksStats[track.id]?.won + ~~(position === 1),
      };

      return {
        ...state,
        totalRaced: state.totalRaced + 1,
        totalRacesWon: state.totalRacesWon + ~~(position === 1),
        totalRacesLost: state.totalRacesLost + ~~(position !== 1),
        tracksStats: Object.assign({}, state.tracksStats, {
          [track.id]: {
            ...trackStats,
            race: undefined,
            lastRace: pastRace.id,
          },
        }),
        garageCars: Object.assign([], state.garageCars, {
          [carIndex]: {
            ...car,
            race: undefined,
            previousRace: pastRace.id,
          },
        }),
      };
    }

    case END_RACE_EXPERIENCE_TYPE: {
      const { pastRace } = payload;

      if (!pastRace) {
        return state;
      }

      const track = tracks.find(item => item.id === pastRace.track);
      const trackExp =
        raceEvents.find(({ type }) => type === track.category)?.exp || 1;

      const expEarned = pastRace.position === 1 ? 2 * trackExp : trackExp;

      return {
        ...state,
        experience: {
          ...state.experience,
          race: {
            ...state.experience.race,
            exp: state.experience.race.exp + expEarned,
          },
        },
      };
    }

    case END_RACE_REWARDS_TYPE: {
      const { reward } = payload;

      if (!reward) {
        return state;
      }

      const earnedCar = isNaN(reward) && cars.find(({ id }) => id === reward);

      const garageCar =
        earnedCar &&
        generateGarageCar(earnedCar, earnedCar.defaultColors?.[0], true);

      return {
        ...state,
        // Flag to recalculate brand complete
        acquiredCar: !!garageCar,
        money: state.money + ~~reward,
        ...(garageCar && {
          garageCars: [...state.garageCars, garageCar],
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

    case END_RACE_SPONSORS_TYPE: {
      const { pastRace } = payload;

      if (!pastRace) {
        return state;
      }

      const car = state.garageCars.find(item => item.id === pastRace.car);
      const track = tracks.find(item => item.id === pastRace.track);

      const sponsors = evaluateSponsors(
        track,
        car,
        pastRace.position,
        state.pastRaces.slice(1), // To remove the last race
        state.sponsors.active
      );

      // Initialize active sponsors timestamp if necessary
      const activeMoneySponsors = moneySponsorsCount(sponsors);
      const sponsorsTimestamp =
        !state.sponsors.timestamp && activeMoneySponsors > 0
          ? new Date().getTime()
          : state.sponsors.timestamp;

      return {
        ...state,
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
      };
    }

    case END_RACE_TOAST_TYPE: {
      const { pastRace, sponsors, raceEvents } = payload;

      if (!pastRace) {
        return state;
      }

      const car = state.garageCars.find(item => item.id === pastRace.car);
      const track = tracks.find(item => item.id === pastRace.track);
      const { position } = pastRace;

      // Append won race toast if race won
      const raceToast = generateToast(
        track.name,
        car.name,
        position <= 3
          ? position === 1
            ? TOAST_TYPES.RACE_WON
            : TOAST_TYPES.RACE_TOP_3
          : TOAST_TYPES.RACE_LOST,
        { position }
      );

      const sponsorToasts = Object.keys(sponsors || {}).map(key => {
        const sponsor = raceSponsors.find(item => item.id === key);
        return generateToast(
          track.name,
          sponsorEntryText(sponsor),
          sponsor.reward === 'mechanic'
            ? TOAST_TYPES.MECHANIC
            : TOAST_TYPES.SPONSOR
        );
      });

      const raceEventsToasts = Object.values(raceEvents).map(raceEvent =>
        generateToast(
          capitalize(raceEvent),
          raceEventToastSubtitle,
          TOAST_TYPES.RACE_EVENT
        )
      );

      const allNewToasts = [...raceEventsToasts, ...sponsorToasts, raceToast];

      return {
        ...state,
        toasts: [...allNewToasts, ...state.toasts],
        notifications: [...allNewToasts, ...state.notifications],
      };
    }

    case END_RACE_STARS_TYPE: {
      const { pastRace } = payload;

      if (!pastRace) {
        return state;
      }

      const { reward } = pastRace;
      const earnedCar = isNaN(reward) && cars.find(({ id }) => id === reward);

      const currentTime = new Date().getTime();

      let newStarsRewardCars = false;
      let completedStarsRewardCars = {};
      if (!!earnedCar) {
        [newStarsRewardCars, completedStarsRewardCars] = newRewardCarsStars(
          earnedCar,
          state.rewardCars,
          state.stars
        );
      }

      const [newStarsMechanics, completedStarsMechanics] = newMechanicsStars(
        state.sponsors,
        state.stars
      );

      const [newStarsSponsors, completedStarsSponsors] = newSponsorsStars(
        state.sponsors,
        state.stars
      );

      const [newStarsRaced, completedStarsRaced] = newRacedStars(
        state.totalRaced,
        state.tracksStats,
        state.stars
      );

      let newStarsRaceWin = false;
      let completedStarsRaceWin = {};
      if (pastRace.position === 1) {
        [newStarsRaceWin, completedStarsRaceWin] = newRaceWinStars(
          state.totalRaced,
          state.tracksStats,
          state.stars
        );
      }

      let newStarsGetAllCars = false;
      let completedStarsGetAllCars = {};
      if (!!earnedCar) {
        [newStarsGetAllCars, completedStarsGetAllCars] = newGetAllCars(
          state.boughtCars,
          state.rewardCars,
          state.stars
        );
      }

      const newStars =
        newStarsRewardCars ||
        newStarsMechanics ||
        newStarsSponsors ||
        newStarsRaced ||
        newStarsRaceWin ||
        newStarsGetAllCars;

      return {
        ...state,
        ...(newStars && {
          stars: {
            ...state.stars,
            ...completedStarsRewardCars,
            ...completedStarsMechanics,
            ...completedStarsSponsors,
            ...completedStarsRaced,
            ...completedStarsRaceWin,
            ...completedStarsGetAllCars,
          },
          pageNotifications: {
            ...state.pageNotifications,
            starsPage: state.pageNotifications.starsPage || currentTime,
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
        totalRacesCanceled: state.totalRacesCanceled + 1,
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

    case RACE_LOCKED_REFRESH_TYPE: {
      const newLockedRaces = raceEvents.reduce((result, raceEvent) => {
        const { unlockRequirements, type: eventType } = raceEvent;

        if (unlockRequirements?.type === 'none') {
          return { ...result, [eventType]: false };
        }

        if (unlockRequirements?.type === 'race-exp') {
          return {
            ...result,
            [eventType]: !(
              state.experience.race.exp >= unlockRequirements.value
            ),
          };
        }

        return result;
      }, {});

      return {
        ...state,
        locked: {
          ...state.locked,
          race: newLockedRaces,
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

      const toasts = Object.keys(brandComplete).reduce(
        (result, brandKey) =>
          !!brandComplete[brandKey] !== !!state.brandComplete[brandKey]
            ? [
                ...result,
                generateToast(
                  `${capitalize(brandKey)} cars`,
                  'brand sponsor',
                  TOAST_TYPES.BRAND,
                  { value: brandSponsors[brandKey] }
                ),
              ]
            : result,
        []
      );

      return {
        ...state,
        //Disable flag
        acquiredCar: false,
        brandComplete,
        toasts: toasts.length > 0 ? [...state.toasts, ...toasts] : state.toasts,
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
