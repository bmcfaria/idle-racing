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

const calculateScore = (car, track, withRandom = false) =>
  track[ATTRIBUTE_TYPES.ACCELERATION] *
    car[ATTRIBUTE_TYPES.ACCELERATION].value +
  track[ATTRIBUTE_TYPES.TOP_SPEED] * car[ATTRIBUTE_TYPES.TOP_SPEED].value +
  track[ATTRIBUTE_TYPES.HANDLING] * car[ATTRIBUTE_TYPES.HANDLING].value +
  (withRandom ? Math.random() * 0.000001 : 0);

export const winProbability = (car, track) => {
  const carScoreObject = {
    id: car.id,
    score: calculateScore(car, track),
  };

  // TODO: calculate probability or some kind of better indicator

  return carScoreObject.score;
};

export const raceResults = (car, track) => {
  const carScoreObject = {
    id: car.id,
    name: `(YOU) ${car.name}`,
    score: calculateScore(car, track, true),
  };

  const results = track?.competitors?.reduce(
    (result, competitor) => [
      ...result,
      {
        id: competitor.id,
        name: competitor.name,
        score: calculateScore(competitor, track, true),
      },
    ],
    [carScoreObject]
  );

  // sort descending
  results.sort((a, b) => b.score - a.score);

  return results;
};
