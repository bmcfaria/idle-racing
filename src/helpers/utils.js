import { cars } from './mockData';

export const displayResponsivePanel = condition => [
  condition ? 'none' : 'flex',
  condition ? 'none' : 'flex',
  'flex',
];

export const ATTRIBUTE_TYPES = {
  ACCELERATION: 'acc',
  TOP_SPEED: 'tsp',
  HANDLING: 'hnd',
};

const calculateScore = (car, track, withRandom = false) =>
  track[ATTRIBUTE_TYPES.ACCELERATION] *
    (car[ATTRIBUTE_TYPES.ACCELERATION].value ||
      car[ATTRIBUTE_TYPES.ACCELERATION]) +
  track[ATTRIBUTE_TYPES.TOP_SPEED] *
    (car[ATTRIBUTE_TYPES.TOP_SPEED].value || car[ATTRIBUTE_TYPES.TOP_SPEED]) +
  track[ATTRIBUTE_TYPES.HANDLING] *
    (car[ATTRIBUTE_TYPES.HANDLING].value || car[ATTRIBUTE_TYPES.HANDLING]) +
  (withRandom ? Math.random() * 0.000001 : 0);

const cloneCar = car => ({
  ...car,
  acc: { ...car.acc },
  tsp: { ...car.tsp },
  hnd: { ...car.hnd },
});

const attrUpgradeValue = (attr, car, max) => {
  const compAttrs = {
    acc: ['tsp', 'hnd'],
    tsp: ['acc', 'hnd'],
    hnd: ['acc', 'tsp'],
  };

  let result = 0;
  if (
    car[attr].value +
      car[compAttrs[attr][0]].value +
      car[compAttrs[attr][1]].value <
    max
  ) {
    result =
      car[attr].base +
        car[attr].max +
        car[compAttrs[attr][0]].value +
        car[compAttrs[attr][1]].value >
      max
        ? ~~(
            Math.random() *
            (1 +
              max -
              (car[attr].base +
                car[attr].max +
                car[compAttrs[attr][0]].value +
                car[compAttrs[attr][1]].value))
          )
        : ~~(Math.random() * (1 + car[attr].max - car[attr].base));
  }

  return result;
};

const calculateCompetitors = track => {
  const requirements = track.requirements;

  const compatibleCars = cars.reduce(
    (result, car) =>
      doMeetRequirements(car, requirements) && car.total <= track.max
        ? [...result, cloneCar(car)]
        : result,
    []
  );

  const competitors = [...Array(8)].map(() =>
    cloneCar(compatibleCars[~~(Math.random() * compatibleCars.length)])
  );

  if (requirements.find(req => req.type === 'no_ups')) {
    return competitors;
  }

  const competitorsProcessed = competitors.map(car => {
    car.acc.value += attrUpgradeValue('acc', car, track.max);
    car.tsp.value += attrUpgradeValue('tsp', car, track.max);
    car.hnd.value += attrUpgradeValue('hnd', car, track.max);

    return car;
  });

  return competitorsProcessed;
};

const getCompetitors = track =>
  // competitors.filter(item => item['track id'] === track.id);
  calculateCompetitors(track);

export const winProbability = (car, track) => {
  const carScoreObject = {
    id: car.id,
    score: calculateScore(car, track),
  };

  const results = getCompetitors(track).reduce(
    (result, competitor) => {
      const tmpScore = calculateScore(competitor, track);
      return {
        better:
          tmpScore > carScoreObject.score ? result.better + 1 : result.better,
        equal:
          tmpScore === carScoreObject.score ? result.equal + 1 : result.equal,
        worse:
          tmpScore < carScoreObject.score ? result.worse + 1 : result.worse,
      };
    },
    { better: 0, equal: 0, worse: 0 }
  );

  if (results.better + results.equal === 0) {
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
    name: car.name,
    score: calculateScore(car, track, true),
  };

  const results = getCompetitors(track).reduce(
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

export const capitalize = str =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

export const doMeetRequirements = (car, requirements) => {
  if (!requirements || requirements.length === 0) {
    return true;
  }

  const specificAllowedCars = requirements.reduce((result, requirement) => {
    if (requirement.type === 'car') {
      return [...result, requirement.value];
    }

    // default
    return result;
  }, []);

  if (
    specificAllowedCars.length > 0 &&
    !specificAllowedCars.includes(car.dealerCar || car.id)
  ) {
    return false;
  }

  return requirements.reduce((result, requirement) => {
    if (requirement.type === 'no_ups') {
      const noUpgrades =
        car.acc.upgrade === 0 && car.tsp.upgrade === 0 && car.hnd.upgrade === 0;
      return result && !!noUpgrades;
    }

    if (requirement.type === 'brand') {
      return result && car.brand === requirement.value;
    }

    // default
    return result;
  }, true);
};
