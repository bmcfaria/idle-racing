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

export const starsByTypeObject = stars.reduce(
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

export const generateStoreStar = () => new Date().getTime();

export const genericNewStarsNumberCompare = (
  type,
  subType,
  numberToCompare,
  stateStars
) =>
  starsByType(type, subType).reduce(
    (results, star) => {
      const compareResult =
        Number.isInteger(star.requirement.value) &&
        numberToCompare >= star.requirement.value;
      return [
        results[0] || (!stateStars[star.id] && compareResult),
        {
          ...results[1],
          ...(compareResult && {
            [star.id]: stateStars[star.id] || generateStoreStar(),
          }),
        },
      ];
    },
    [false, {}]
  );

export const genericAllCompare = (
  currentTotal,
  maxTotal,
  starId,
  stateStars
) => {
  const newAll = {
    [starId]:
      stateStars[starId] || (currentTotal === maxTotal && generateStoreStar()),
  };

  return [!stateStars[starId] && !!newAll[starId], newAll];
};
