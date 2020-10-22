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
