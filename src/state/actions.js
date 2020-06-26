export const RESET_TYPE = 'RESET';
export const resetAction = {
  type: RESET_TYPE,
};

export const BUY_CAR_TYPE = 'BUY_CAR';
export const buyCarAction = carId => ({
  type: BUY_CAR_TYPE,
  payload: { carId },
});
export const SELL_CAR_TYPE = 'SELL_CAR';
export const sellCarAction = carId => ({
  type: SELL_CAR_TYPE,
  payload: { carId },
});
export const UPGRADE_ATTRIBUTE_TYPE = 'UPGRADE_ATTRIBUTE';
export const upgradeAttributeAction = (type, carId) => ({
  type: UPGRADE_ATTRIBUTE_TYPE,
  payload: { type, carId },
});
export const START_RACE_TYPE = 'START_RACE';
export const startRaceAction = (carId, trackId, auto) => ({
  type: START_RACE_TYPE,
  payload: { carId, trackId, auto },
});
export const END_RACE_TYPE = 'END_RACE';
export const endRaceAction = raceId => ({
  type: END_RACE_TYPE,
  payload: { raceId },
});
export const CLOSE_RESULTS_TYPE = 'CLOSE_RESULTS';
export const closeResultsAction = pastRaceId => ({
  type: CLOSE_RESULTS_TYPE,
  payload: { pastRaceId },
});
export const CLEAR_NOTIFICATIONS_TYPE = 'CLEAR_NOTIFICATIONS';
export const clearNotificationsAction = {
  type: CLEAR_NOTIFICATIONS_TYPE,
};

export const DISABLE_TUTORIAL_WINCHANCE_TYPE = 'DISABLE_TUTORIAL_WINCHANCE';
export const disableTutorialWinChanceAction = {
  type: DISABLE_TUTORIAL_WINCHANCE_TYPE,
};
export const DISABLE_TUTORIAL_UPGRADE_TYPE = 'DISABLE_TUTORIAL_UPGRADE';
export const disableTutorialUpgradeAction = {
  type: DISABLE_TUTORIAL_UPGRADE_TYPE,
};

export const OPEN_GARAGE_TYPE = 'OPEN_GARAGE';
export const openGarageAction = {
  type: OPEN_GARAGE_TYPE,
};

export const OPEN_GARAGE_CAR_TYPE = 'OPEN_GARAGE_CAR';
export const openGarageCarAction = carId => ({
  type: OPEN_GARAGE_CAR_TYPE,
  payload: { carId },
});

export const BUY_EXPERIENCE_BUFF_TYPE = 'BUY_EXPERIENCE_BUFF';
export const buyExperienceBuffAction = (type, subType) => ({
  type: BUY_EXPERIENCE_BUFF_TYPE,
  payload: { type, subType },
});

export const CLEAR_STORE_RESET_TYPE = 'CLEAR_STORE_RESET';
export const clearStoreResetAction = {
  type: CLEAR_STORE_RESET_TYPE,
};

export const BUY_GARAGE_SLOT_TYPE = 'BUY_GARAGE_SLOT';
export const buyGarageSlotAction = {
  type: BUY_GARAGE_SLOT_TYPE,
};

export const STOP_RACE_TYPE = 'STOP_RACE_SLOT';
export const stopRaceAction = raceId => ({
  type: STOP_RACE_TYPE,
  payload: { raceId },
});

export const CLEAR_OFFLINE_EARNINGS_TYPE = 'CLEAR_OFFLINE_EARNINGS';
export const clearOfflineEarningsAction = {
  type: CLEAR_OFFLINE_EARNINGS_TYPE,
};
