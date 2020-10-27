export const RESET_TYPE = 'RESET';
export const RESET_AND_RECALCULATE_TYPE = 'RESET_AND_RECALCULATE';
export const resetAndRecalculateAction = {
  type: RESET_AND_RECALCULATE_TYPE,
};

export const RESET_DEV_TYPE = 'RESET_DEV';
export const RESET_AND_RECALCULATE_DEV_TYPE = 'RESET_AND_RECALCULATE_DEV';
export const resetAndRecalculateDevAction = state => ({
  type: RESET_AND_RECALCULATE_DEV_TYPE,
  payload: { state },
});

export const BUY_CAR_TYPE = 'BUY_CAR';
export const buyCarAction = (carId, carColor) => ({
  type: BUY_CAR_TYPE,
  payload: { carId, carColor },
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
export const START_RACE_UI_TYPE = 'START_RACE_UI';
export const startRaceAction = (carId, trackId) => ({
  type: START_RACE_UI_TYPE,
  payload: { carId, trackId },
});
export const START_RACE_TYPE = 'START_RACE';
export const CHECK_END_RACE_TYPE = 'CHECK_END_RACE';
export const checkEndRaceAction = raceId => ({
  type: CHECK_END_RACE_TYPE,
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

export const DISMISS_TOAST_TYPE = 'DISMISS_TOAST';
export const dismissToastAction = id => ({
  type: DISMISS_TOAST_TYPE,
  payload: { toastId: id },
});

export const RECALCULATE_EVENT_MULTIPLIERS_TYPE =
  'RECALCULATE_EVENT_MULTIPLIERS';
export const RECALCULATE_BRAND_COMPLETE_TYPE = 'RECALCULATE_BRAND_COMPLETE';

export const END_RACE_UPDATE_STATS_TYPE = 'END_RACE_UPDATE_STATS';
export const END_RACE_EXPERIENCE_TYPE = 'END_RACE_EXPERIENCE';
export const END_RACE_REWARDS_TYPE = 'END_RACE_REWARDS';
export const END_RACE_TOAST_TYPE = 'END_RACE_TOAST';
export const END_RACE_SPONSORS_TYPE = 'END_RACE_SPONSORS';
export const END_RACE_STARS_TYPE = 'END_RACE_STARS';

export const RACE_LOCKED_REFRESH_TYPE = 'RACE_LOCKED_REFRESH';

export const PASSIVE_INCOME_TYPE = 'PASSIVE_INCOME';

export const SYNC_TYPE = 'SYNC';
export const syncAction = {
  type: SYNC_TYPE,
};

export const TUNE_CAR_TYPE = 'TUNE_CAR';
export const tuneCarAction = (carId, tuneAttrs) => ({
  type: TUNE_CAR_TYPE,
  payload: { carId, tuneAttrs },
});

export const CHANGE_CAR_COLOR_TYPE = 'CHANGE_CAR_COLOR';
export const changeCarColorAction = (carId, color) => ({
  type: CHANGE_CAR_COLOR_TYPE,
  payload: { carId, color },
});

export const OPEN_PAGE_TYPE = 'OPEN_PAGE';
export const openPageAction = pathname => ({
  type: OPEN_PAGE_TYPE,
  payload: { pathname },
});
