import { createStore } from 'redux';
import rootReducer, { initialState } from './reducer';
import throttle from 'lodash/throttle';

const inDev = process.env.NODE_ENV === 'development';

const minimunStoreVersion = 0.5;

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
    return {
      ...initialState,
      ...state,
      pageNotifications: {
        ...initialState.pageNotifications,
        ...state.pageNotifications,
      },
      tutorial: {
        ...initialState.tutorial,
        ...state.tutorial,
      },
      locked: {
        ...initialState.locked,
        ...state.locked,
      },
      experience: {
        ...initialState.experience,
        ...state.experience,
        business: {
          ...initialState.experience.business,
          ...(state.experience?.business ?? {}),
        },
        race: {
          ...initialState.experience.race,
          ...(state.experience?.race ?? {}),
        },
        mechanic: {
          ...initialState.experience.mechanic,
          ...(state.experience?.mechanic ?? {}),
        },
      },
    };
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
    rootReducer,
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
