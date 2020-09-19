import { put, takeLatest, select } from 'redux-saga/effects';
import {
  SYNC_PASSIVE_INCOME_TYPE,
  PASSIVE_INCOME_TYPE,
  RECALCULATE_EVENT_MULTIPLIERS_TYPE,
  RECALCULATE_BRAND_COMPLETE_TYPE,
  SYNC_RACES_TYPE,
  checkEndRaceAction,
} from './actions';

function* syncPassiveIncome() {
  try {
    const { finishRace, acquiredCar } = yield select();

    if (finishRace) {
      yield put({ type: RECALCULATE_EVENT_MULTIPLIERS_TYPE });
    }

    if (acquiredCar) {
      yield put({ type: RECALCULATE_BRAND_COMPLETE_TYPE });
    }

    yield put({ type: PASSIVE_INCOME_TYPE });
  } catch (e) {}
}

function* syncRaces() {
  try {
    const { races } = yield select();

    for (let race of races) {
      yield put(checkEndRaceAction(race.id));
    }
  } catch (e) {}
}

function* mySaga() {
  yield takeLatest(SYNC_PASSIVE_INCOME_TYPE, syncPassiveIncome);
  yield takeLatest(SYNC_RACES_TYPE, syncRaces);
}

//   function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", syncPassiveIncome);
//   }

export default mySaga;
