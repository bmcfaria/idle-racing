import { cars } from './data';
import seedrandom from 'seedrandom';
import { ATTRIBUTE_TYPES, calculateCarAttributeValues } from './utils';

const NUMBER_OF_COMPETITORS = 8;

const calculateScore = (car, track, withRandom = false) => {
  const carAttrs = calculateCarAttributeValues(car);
  return (
    track[ATTRIBUTE_TYPES.ACCELERATION] *
      carAttrs[ATTRIBUTE_TYPES.ACCELERATION] +
    track[ATTRIBUTE_TYPES.SPEED] * carAttrs[ATTRIBUTE_TYPES.SPEED] +
    track[ATTRIBUTE_TYPES.HANDLING] * carAttrs[ATTRIBUTE_TYPES.HANDLING] +
    (withRandom ? Math.random() * 0.000001 - 0.0000005 : 0)
  );
};

const cloneCar = car => ({
  ...car,
  acc: { ...car.acc },
  spd: { ...car.spd },
  hnd: { ...car.hnd },
});

const attrUpgradeValue = (attr, car, max, rng) => {
  const compAttrs = {
    acc: ['spd', 'hnd'],
    spd: ['acc', 'hnd'],
    hnd: ['acc', 'spd'],
  };

  const totalCarAttrs =
    car[attr].value +
    car[compAttrs[attr][0]].value +
    car[compAttrs[attr][1]].value;

  if (totalCarAttrs < max) {
    const attrUpgradeMargin =
      max - (car[compAttrs[attr][0]].value + car[compAttrs[attr][1]].value);

    return ~~(rng() * (1 + Math.min(car[attr].max, attrUpgradeMargin)));
  }

  return 0;
};

const calculateCompetitors = (track, withRandom = false) => {
  const requirements = track.requirements;

  const compatibleCars = cars.reduce(
    (result, car) =>
      doMeetRequirements(car, requirements, true) && car.total <= track.max
        ? [...result, cloneCar(car)]
        : result,
    []
  );

  const rngSeed = withRandom ? undefined : track.id;
  const rng = seedrandom(rngSeed);
  const competitors = [...Array(NUMBER_OF_COMPETITORS)].map(() =>
    cloneCar(compatibleCars[~~(rng() * compatibleCars.length)])
  );

  if (requirements.find(req => req.type === 'no_ups')) {
    return competitors;
  }

  const trackAttrs = [
    {
      attr: ATTRIBUTE_TYPES.ACCELERATION,
      value: track[ATTRIBUTE_TYPES.ACCELERATION],
    },
    { attr: ATTRIBUTE_TYPES.SPEED, value: track[ATTRIBUTE_TYPES.SPEED] },
    { attr: ATTRIBUTE_TYPES.HANDLING, value: track[ATTRIBUTE_TYPES.HANDLING] },
  ];
  const trackAttrsSorted = trackAttrs.sort((a, b) => b.value - a.value);
  const trackAttrsSortedKeys = trackAttrsSorted.map(({ attr }) => attr);

  const competitorsProcessed = competitors.map(car => {
    car[trackAttrsSortedKeys[0]].value += attrUpgradeValue(
      trackAttrsSortedKeys[0],
      car,
      track.max,
      rng
    );
    car[trackAttrsSortedKeys[1]].value += attrUpgradeValue(
      trackAttrsSortedKeys[1],
      car,
      track.max,
      rng
    );
    car[trackAttrsSortedKeys[2]].value += attrUpgradeValue(
      trackAttrsSortedKeys[2],
      car,
      track.max,
      rng
    );

    return car;
  });

  return competitorsProcessed;
};

const getCompetitors = (track, withRandom = false) =>
  // competitors.filter(item => item['track id'] === track.id);
  calculateCompetitors(track, withRandom);

export const generateTrackStatsCompetitors = track => {
  const numberOfSamples = 10;

  // TODO: use random seed
  const multipleScoresArrays = [...Array(numberOfSamples)].map(() =>
    getCompetitors(track, true)
      .map(competitor => calculateScore(competitor, track))
      .sort((a, b) => b - a)
  );

  const normalizedScores = [...Array(NUMBER_OF_COMPETITORS)].map(
    (_, index) =>
      multipleScoresArrays.reduce(
        (results, score) => results + score[index],
        0
      ) / numberOfSamples
  );

  // sort descending
  normalizedScores.sort((a, b) => b - a);

  return normalizedScores;
};

export const winProbability = (car, track, trackStats) => {
  const carScoreObject = {
    id: car.id,
    score: calculateScore(car, track),
  };

  const results = trackStats.competitors.reduce(
    (result, score) => {
      return {
        better:
          score > carScoreObject.score ? result.better + 1 : result.better,
        equal: score === carScoreObject.score ? result.equal + 1 : result.equal,
        worse: score < carScoreObject.score ? result.worse + 1 : result.worse,
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

  const results = getCompetitors(track, true).reduce(
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

export const validateAttrRequirements = (car, requirements, upgradable) => {
  const carAttrs = calculateCarAttributeValues(car);
  // TODO: handle upgradable tuned cars
  return requirements.reduce((result, requirement) => {
    if (requirement.type === 'attr') {
      const sum =
        carAttrs[requirement.value.attr] +
        (upgradable
          ? car[requirement.value.attr].max -
            car[requirement.value.attr].upgrade
          : 0) -
        requirement.value.value;
      if (requirement.value.compare === 'lt') {
        return result && sum < 0;
      }
      if (requirement.value.compare === 'eq') {
        return result && sum === 0;
      }
      if (requirement.value.compare === 'gt') {
        return result && sum > 0;
      }

      return result;
    }

    // default
    return result;
  }, true);
};

export const doMeetRequirements = (car, requirements, upgradable) => {
  if (!requirements || requirements.length === 0) {
    return true;
  }

  // Requirements could allow multiple cars / categories / types
  const { allowedCars, allowedCategories, allowedTypes } = requirements.reduce(
    (result, requirement) => {
      let allowedCars = [];
      if (requirement.type === 'car') {
        allowedCars = [...result.allowedCars, requirement.value];
      }

      let allowedCategories = [];
      if (requirement.type === 'cat') {
        allowedCategories = [...result.allowedCategories, requirement.value];
      }

      let allowedTypes = [];
      if (requirement.type === 'type') {
        allowedTypes = [...result.allowedTypes, requirement.value];
      }

      return {
        allowedCars: [...result.allowedCars, ...allowedCars],
        allowedCategories: [...result.allowedCategories, ...allowedCategories],
        allowedTypes: [...result.allowedTypes, ...allowedTypes],
      };
    },
    { allowedCars: [], allowedCategories: [], allowedTypes: [] }
  );

  // Test car
  if (
    allowedCars.length > 0 &&
    !allowedCars.includes(car.dealerCar || car.id)
  ) {
    return false;
  }

  // Test category
  if (
    allowedCategories.length > 0 &&
    !allowedCategories.every(item => car.categories.includes(item))
  ) {
    return false;
  }

  // Test type
  if (allowedTypes.length > 0 && !allowedTypes.includes(car.type)) {
    return false;
  }

  const noUps = requirements.reduce((result, requirement) => {
    if (requirement.type === 'no_ups') {
      const noUpgrades =
        car.acc.upgrade === 0 && car.spd.upgrade === 0 && car.hnd.upgrade === 0;
      return result && !!noUpgrades;
    }

    // default
    return result;
  }, true);

  if (!noUps) {
    return false;
  }

  const noUpsRequirementExists = requirements.find(
    req => req.type === 'no_ups'
  );

  return validateAttrRequirements(
    car,
    requirements,
    !noUpsRequirementExists && upgradable
  );
};
