import { createStore } from 'redux';
import rootReducer, { initialState } from './reducer';
import raceReducer from './reducerRace';
import garageReducer from './reducerGarage';
import throttle from 'lodash/throttle';
import objectAssignDeep from 'object-assign-deep';

const inDev = process.env.NODE_ENV === 'development';

const minimunStoreVersion = 0.706;

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
    [rootReducer, raceReducer, garageReducer, timestampReducer],
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

export default function configureStore() {
  const store = createStore(
    combinedReducer,
    loadState(),
    inDev
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
  );

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  return store;
}
