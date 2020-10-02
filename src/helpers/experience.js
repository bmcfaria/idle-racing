const experience = {
  business: {
    newCars: {
      max: 3,
      title: 'New cars price',
      textArray: ['0%', '-10%', '-20%', '-30%'],
    },
    usedCars: {
      max: 3,
      title: 'Old cars price',
      textArray: ['0%', '+10%', '+20%', '+30%'],
    },
    rewardCars: {
      max: 1,
      title: 'Buy reward cars',
      textArray: ['OFF', 'ON'],
      lockedText: currentExp =>
        currentExp < 50
          ? `Missing ${50 - currentExp} exp to unlock`
          : undefined,
    },
  },

  race: {
    price: {
      max: 3,
      title: 'Race price',
      textArray: ['0%', '-10%', '-20%', '-30%'],
    },
    prizes: {
      max: 3,
      title: 'Race prizes',
      textArray: ['0%', '+10%', '+20%', '+30%'],
    },
  },

  mechanic: {
    acc: {
      max: 3,
      title: 'ACC price',
      textArray: ['0%', '-10%', '-20%', '-30%'],
    },
    spd: {
      max: 3,
      title: 'SPD price',
      textArray: ['0%', '-10%', '-20%', '-30%'],
    },
    hnd: {
      max: 3,
      title: 'HND price',
      textArray: ['0%', '-10%', '-20%', '-30%'],
    },
  },
};

export const experienceTypePointsSpent = (type, stateExperience) =>
  Object.keys(experience[type]).reduce(
    (result, subType) => result + ~~stateExperience?.[type][subType],
    0
  );

export default experience;
