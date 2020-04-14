export const BUY_CAR_TYPE = 'BUY_CAR'
export const buyCarAction = carId => ({ type: BUY_CAR_TYPE, payload: { carId } })
export const SELL_CAR_TYPE = 'SELL_CAR'
export const sellCarAction = carId => ({ type: SELL_CAR_TYPE, payload: { carId } })