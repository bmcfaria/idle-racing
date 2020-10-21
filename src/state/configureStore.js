import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import raceReducer from './reducerRace';
import garageReducer from './reducerGarage';
import mySaga from './sagas';
import throttle from 'lodash/throttle';
import objectAssignDeep from 'object-assign-deep';
import initialState from './initialState';

const inDev = process.env.NODE_ENV === 'development';

const minimunStoreVersion = 0.713;

const moneyTrackerReducer = state => {
  const moneyEarned = ~~(
    state.money - state.lastMoneyValue > 0 && state.money - state.lastMoneyValue
  );
  const moneySpent = ~~(
    state.lastMoneyValue - state.money > 0 && state.lastMoneyValue - state.money
  );

  return {
    ...state,
    totalMoneyEarned: state.totalMoneyEarned + moneyEarned,
    totalMoneySpent: state.totalMoneySpent + moneySpent,
    lastMoneyValue: state.money,
  };
};

const timestampReducer = state => {
  const timelapse = new Date().getTime() - state.timestamp;

  return {
    ...state,
    timestamp: new Date().getTime(),
    timelapse,
  };
};

const reduceReducers = (reducers = [], state, action) =>
  reducers.reduce(
    (cumulativeState, reducer) => reducer(cumulativeState, action),
    state
  );

// The reducers are splitted to reduce the file size but they use the same state object,
// therefore they're reduced instead of combined
const combinedReducer = (state, action) =>
  reduceReducers(
    [
      rootReducer,
      raceReducer,
      garageReducer,
      moneyTrackerReducer,
      timestampReducer,
    ],
    state,
    action
  );

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);

    if (state.version < minimunStoreVersion) {
      return {
        ...initialState,
        warnings: {
          ...initialState.warnings,
          storeReset: true,
        },
      };
    }
    // Pre-fill with initial state to prevent errors on old dated states
    return objectAssignDeep({}, initialState, state);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const sagaMiddleware = createSagaMiddleware();

const composeDevtoolsWithMiddleware = midleware =>
  inDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(midleware)
    : midleware;

export default function configureStore() {
  const store = createStore(
    combinedReducer,
    loadState(),
    composeDevtoolsWithMiddleware(applyMiddleware(sagaMiddleware))
  );

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  sagaMiddleware.run(mySaga);

  return store;
}
