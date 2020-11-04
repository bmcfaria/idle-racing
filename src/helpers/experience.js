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
    duration: {
      max: 3,
      title: 'Race duration',
      textArray: ['0%', '-25%', '-50%', '-75%'],
      value: 0.25,
      lockedText: currentExp =>
        currentExp < 50
          ? `Missing ${50 - currentExp} exp to unlock`
          : undefined,
    },
  },

  mechanic: {
    attrs: {
      max: 3,
      title: 'Attributes price',
      textArray: ['0%', '-10%', '-20%', '-30%'],
    },
    customization: {
      max: 1,
      title: 'Customize car',
      textArray: ['OFF', 'ON'],
      lockedText: currentExp =>
        currentExp < 15
          ? `Missing ${15 - currentExp} exp to unlock`
          : undefined,
    },
    tuning: {
      max: 1,
      title: 'Tuning car',
      textArray: ['OFF', 'ON'],
      lockedText: currentExp =>
        currentExp < 20
          ? `Missing ${20 - currentExp} exp to unlock`
          : undefined,
    },
  },
};

export const brandExpBonus = 100;
export const experienceTip = {
  business: {
    message: 'Earn exp by buying and selling cars',
    submessage: `Brand sponsors give a ${brandExpBonus} exp bonus once unlocked`,
  },
  race: { message: 'Earn exp by racing' },
  mechanic: { message: 'Earn exp by upgrading cars and expanding the garage' },
};

// Max 9 levels
export const expLevelPoints = [10, 100, 250, 500, 1000, 1500, 2000, 2500, 3000];

export const experienceTypePointsSpent = (type, stateExperience) =>
  Object.keys(experience[type]).reduce(
    (result, subType) => result + ~~stateExperience?.[type][subType],
    0
  );

export default experience;
