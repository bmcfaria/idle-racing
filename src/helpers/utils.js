export const displayResponsivePanel = condition => [
  condition ? 'none' : 'flex',
  condition ? 'none' : 'flex',
  'flex',
];

export const ATTRIBUTE_TYPES = {
  ACCELERATION: 'acceleration',
  TOP_SPEED: 'topSpeed',
  HANDLING: 'handling',
};

const calculateScore = (car, track) =>
  track[ATTRIBUTE_TYPES.ACCELERATION] *
    car[ATTRIBUTE_TYPES.ACCELERATION].value +
  track[ATTRIBUTE_TYPES.TOP_SPEED] * car[ATTRIBUTE_TYPES.TOP_SPEED].value +
  track[ATTRIBUTE_TYPES.HANDLING] * car[ATTRIBUTE_TYPES.HANDLING].value;

export const winProbability = (car, track) => {
  const carScoreObject = {
    id: car.id,
    score: calculateScore(car, track),
  };

  const results = track?.competitors?.reduce(
    (result, competitor) => [
      ...result,
      {
        id: competitor.id,
        score: calculateScore(competitor, track),
      },
    ],
    [carScoreObject]
  );

  // sort descending
  results.sort((a, b) => b.score - a.score);

  // TODO: how to deal with multiple entries with equal scores?
  // TODO: calculate probability

  console.log(results);

  return carScoreObject.score;
};
