import { createStore } from 'redux';
import { cars, races, money, notifications } from "../helpers/mockData";

const initialState = {
    cars,
    races,
    money,
    notifications
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default function configureStore() {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
}