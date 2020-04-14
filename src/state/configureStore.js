import { createStore } from 'redux';
import rootReducer from './reducer';

const inDev = process.env.NODE_ENV === 'development';

export default function configureStore() {
  return createStore(
    rootReducer,
    inDev
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
  );
}
