const upgrades = [
  {
    mechanics: 1,
    type: 'upgrade_center_lvl_1',
    text: 'Upgrade Center lvl 1',
    interval: [1, 2],
    subText: '(1 -> 2)',
  },
  {
    mechanics: 2,
    type: 'upgrade_center_lvl_2',
    text: 'Upgrade Center lvl 2',
    interval: [2, 4],
    subText: '(2 -> 4)',
  },
  {
    mechanics: 3,
    type: 'garage_expanse',
    text: 'Garage Expanse',
  },
  {
    mechanics: 8,
    type: 'upgrade_center_lvl_3',
    text: 'Upgrade Center lvl 3',
    interval: [4, 8],
    subText: '(4 -> 8)',
  },
  {
    mechanics: 12,
    type: 'tuning_center_lvl_1',
    text: 'Tuning Center lvl 1',
    interval: [1, 2],
  },
  {
    mechanics: 16,
    type: 'upgrade_center_lvl_4',
    text: 'Upgrade Center lvl 4',
    interval: [8, 16],
    subText: '(8 -> 16)',
  },
  {
    mechanics: 18,
    type: 'tuning_center_lvl_2',
    text: 'Tuning Center lvl 2',
    interval: [2, 3],
  },
  {
    mechanics: 24,
    type: 'upgrade_center_lvl_5',
    text: 'Upgrade Center lvl 5',
    interval: [16, 1000],
    subText: '(16 -> MAX)',
  },
  {
    mechanics: 28,
    type: 'tuning_center_lvl_3',
    text: 'Tuning Center lvl 3',
    interval: [3, 4],
  },
];

export const requiredUpgrade = (type, upgradeFromValue) => {
  for (let upgrade of upgrades) {
    if (!upgrade.type.startsWith(type)) {
      continue;
    }

    // Check if within interval
    if (
      upgradeFromValue >= upgrade.interval[0] &&
      upgradeFromValue < upgrade.interval[1]
    ) {
      return upgrade;
    }
  }
};

export const maxUnlockedUpgrade = (type, mechanics) => {
  let maxUpgrade;
  for (let upgrade of upgrades) {
    if (!upgrade.type.startsWith(type)) {
      continue;
    }

    // Check if enough mechanics
    if (mechanics >= upgrade.mechanics) {
      maxUpgrade = upgrade;
    }
  }

  return maxUpgrade;
};

export default upgrades;
