import { put, takeLatest, select, call } from 'redux-saga/effects';
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
} from './actions';

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

  yield put({ type: END_RACE_EXPERIENCE_TYPE });

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
    payload: { pastRace, sponsors: newSponsorForToasts },
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

function* mySaga() {
  yield takeLatest(SYNC_TYPE, sync);
}

export default mySaga;
