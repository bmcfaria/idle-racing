export const dealerCarsSelector = state => state.dealerCars;
export const garageCarsSelector = state => state.garageCars;
export const tracksSelector = state => state.tracks;
export const moneySelector = state => state.money;
export const notificationsSelector = state => state.notifications;
export const raceSelector = raceId => state =>
  state.races.find(item => item.id === raceId);
