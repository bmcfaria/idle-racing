import starsFile from '../assets/lists/stars.json';

// Stars === Achievements

const generateStar = star => ({
  id: star.id,
  name: star.name,
  type: star.type,
  requirement: {
    type: star['req_type'],
    value: star['req_value'],
  },
});

export const stars = starsFile.reduce(
  (results, star) =>
    star?.type.length > 0 ? [...results, generateStar(star)] : results,
  []
);
window.stars = stars;

const starsByTypeObject = stars.reduce(
  (results, star) => ({
    ...results,
    [star.type]: [...(results[star.type] || []), star],
  }),
  {}
);
window.starsByType = starsByTypeObject;

export const starsByType = (type, reqType) =>
  starsByTypeObject[type]?.filter(
    ({ requirement }) => requirement.type === reqType
  );

const genericNewStarsNumberCompare = (
  type,
  subType,
  numberToCompare,
  stateStars
) =>
  starsByType(type, subType).reduce(
    (results, star) => [
      results[0] ||
        (!stateStars[star.id] &&
          Number.isInteger(star.requirement.value) &&
          numberToCompare >= star.requirement.value),
      {
        ...results[1],
        ...(Number.isInteger(star.requirement.value) && {
          [star.id]: numberToCompare >= star.requirement.value,
        }),
      },
    ],
    [false, {}]
  );

export const newRewardMoneyStars = (totalMoneyEarned, stateStars) =>
  genericNewStarsNumberCompare(
    'rewards',
    'money',
    totalMoneyEarned,
    stateStars
  );

export const newRewardCarsStars = (stateRewardCars, stateStars) => {
  const totalRewardedCars = Object.values(stateRewardCars).reduce(
    (results, numberOfCars) => results + numberOfCars,
    0
  );

  return genericNewStarsNumberCompare(
    'rewards',
    'reward_car',
    totalRewardedCars,
    stateStars
  );
};
