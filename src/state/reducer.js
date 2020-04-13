import { BUY_CAR_TYPE } from './actions'
import { cars, races, money, notifications, GarageCar } from "../helpers/mockData";

const initialState = {
    dealerCars: cars,
    garageCars: [],
    races,
    money,
    notifications
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case BUY_CAR_TYPE:
            const car = state.dealerCars.find(item => item.id === payload.carId)
            const enoughMoney = state.money >= car?.price

            if (!car || !enoughMoney) {
                return state
            }

            return {
                ...state,
                money: state.money - car.price,
                garageCars: [
                    ...state.garageCars,
                    new GarageCar(car)
                ]
            }
        default:
            return state;
    }
}

export default rootReducer