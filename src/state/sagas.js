import { put, takeLatest, select } from 'redux-saga/effects';
import {
  SYNC_PASSIVE_INCOME_TYPE,
  CHECK_SPONSORS_TYPE,
  RECALCULATE_EVENT_MULTIPLIERS_TYPE,
  RECALCULATE_BRAND_COMPLETE_TYPE,
} from './actions';

function* syncPassiveIncome(action) {
  try {
    const { finishRace, acquiredCar } = yield select();

    if (finishRace) {
      yield put({ type: RECALCULATE_EVENT_MULTIPLIERS_TYPE });
    }

    if (acquiredCar) {
      yield put({ type: RECALCULATE_BRAND_COMPLETE_TYPE });
    }

    yield put({ type: CHECK_SPONSORS_TYPE });
  } catch (e) {}
}

function* mySaga() {
  yield takeLatest(SYNC_PASSIVE_INCOME_TYPE, syncPassiveIncome);
}

//   function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", syncPassiveIncome);
//   }

export default mySaga;
