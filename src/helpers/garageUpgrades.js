export const upgradeCenter = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 8,
  6: 12,
};

export default {
  0: { next: 1, modules: [] },
  1: { next: 2, modules: ['Upgrade Center lvl 1'] },
  2: { next: 3, modules: ['Upgrade Center lvl 2', 'Garage Expanse'] },
  3: { next: 5, modules: ['Upgrade Center lvl 3'] },
  5: { next: 8, modules: ['Upgrade Center lvl 4', 'Car Tuning'] },
  8: { next: 12, modules: ['Upgrade Center lvl 5'] },
  12: { modules: ['Upgrade Center lvl 6'] },
};
