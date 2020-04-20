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

  const results = track?.competitors?.reduce((result, competitor) => {
    const tmpScore = calculateScore(competitor, track);
    return {
      better:
        tmpScore > carScoreObject.score ? ~~result.better + 1 : ~~result.better,
      equal:
        tmpScore === carScoreObject.score ? ~~result.equal + 1 : ~~result.equal,
      worse:
        tmpScore < carScoreObject.score ? ~~result.worse + 1 : ~~result.worse,
    };
  }, {});

  if (results.better === 0) {
    // Best result possible
    // GREEN
    return 3;
  } else if (results.better < 3) {
    // Runner up for 2nd or 3rd
    // YELLOW
    if (results.better + results.equal < 3) {
      // Will win something
      return 2;
    } else {
      // May or may not win anything
      // ORANGE
      return 1;
    }
  } else {
    // (results.better >= 3
    // Can't win
    // RED
    return 0;
  }
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
