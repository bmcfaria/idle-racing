import { put, takeLatest, select, call, takeEvery } from 'redux-saga/effects';
import {
  PASSIVE_INCOME_TYPE,
  RECALCULATE_EVENT_MULTIPLIERS_TYPE,
  RECALCULATE_BRAND_COMPLETE_TYPE,
  checkEndRaceAction,
  SYNC_TYPE,
  END_RACE_TOAST_TYPE,
  END_RACE_REWARDS_TYPE,
  END_RACE_UPDATE_STATS_TYPE,
  END_RACE_EXPERIENCE_TYPE,
  END_RACE_SPONSORS_TYPE,
  RACE_LOCKED_REFRESH_TYPE,
  RESET_AND_RECALCULATE_TYPE,
  RESET_AND_RECALCULATE_DEV_TYPE,
  RESET_DEV_TYPE,
  RESET_TYPE,
} from './actions';
import { lockedSelector } from './selectors';

function* syncPassiveIncome() {
  const { finishRace, acquiredCar } = yield select();

  if (finishRace) {
    yield put({ type: RECALCULATE_EVENT_MULTIPLIERS_TYPE });
  }

  if (acquiredCar) {
    yield put({ type: RECALCULATE_BRAND_COMPLETE_TYPE });
  }

  yield put({ type: PASSIVE_INCOME_TYPE });
}

function* syncRace(race) {
  yield put(checkEndRaceAction(race.id));
  const { pastRaces } = yield select();

  // Check if this race was added as a past race (is finished)
  if (pastRaces?.[0]?.race !== race.id) {
    // Not finished yet
    return;
  }
  const pastRace = pastRaces[0];

  yield put({
    type: END_RACE_UPDATE_STATS_TYPE,
    payload: { pastRace },
  });

  yield put({
    type: END_RACE_EXPERIENCE_TYPE,
    payload: { pastRace },
  });

  const { race: preLockedRaceEvents } = yield select(lockedSelector);
  yield put({ type: RACE_LOCKED_REFRESH_TYPE });
  const { race: postLockedRaceEvents } = yield select(lockedSelector);
  const unlockedRaceEvents = Object.entries(preLockedRaceEvents).reduce(
    (result, [key, value]) =>
      value && !postLockedRaceEvents[key] ? [...result, key] : result,
    []
  );

  yield put({
    type: END_RACE_REWARDS_TYPE,
    payload: { reward: pastRace.reward },
  });

  const { sponsors: preSponsorsAction } = yield select();
  const activeSponsorKeys = Object.keys(preSponsorsAction.active);

  yield put({
    type: END_RACE_SPONSORS_TYPE,
    payload: { pastRace },
  });

  const { sponsors: postSponsorsAction } = yield select();
  const newActiveSponsors = postSponsorsAction.active;
  const newSponsorForToasts = Object.keys(newActiveSponsors).reduce(
    (result, key) => ({
      ...result,
      ...(!activeSponsorKeys.includes(key) && {
        [key]: newActiveSponsors[key],
      }),
    }),
    {}
  );

  yield put({
    type: END_RACE_TOAST_TYPE,
    payload: {
      pastRace,
      sponsors: newSponsorForToasts,
      raceEvents: unlockedRaceEvents,
    },
  });
}

function* sync() {
  try {
    const { races } = yield select();

    for (let race of races) {
      yield call(syncRace, race);
    }

    yield call(syncPassiveIncome);
  } catch (e) {
    console.error(e);
  }
}

function* reset({ type, payload }) {
  if (type === RESET_AND_RECALCULATE_DEV_TYPE) {
    yield put({ type: RESET_DEV_TYPE, payload });
  } else {
    yield put({ type: RESET_TYPE });
  }

  // Calculate locked race events if necessary
  yield put({ type: RACE_LOCKED_REFRESH_TYPE });
}

function* mySaga() {
  // Calculate locked race events if necessary
  const { race: lockedRaceEvents } = yield select(lockedSelector);
  if (Object.keys(lockedRaceEvents).length === 0) {
    yield put({ type: RACE_LOCKED_REFRESH_TYPE });
  }

  yield takeLatest(SYNC_TYPE, sync);
  yield takeEvery(RESET_AND_RECALCULATE_TYPE, reset);
  yield takeEvery(RESET_AND_RECALCULATE_DEV_TYPE, reset);
}

export default mySaga;
