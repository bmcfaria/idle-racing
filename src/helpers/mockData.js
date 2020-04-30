import uuid from 'uuid-random';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import CarPath from '../assets/Cars/riot.png';
import BuggyPath from '../assets/Cars/buggy.png';
import BudSchoolPath from '../assets/Cars/bus_school.png';
import ConvertiblePath from '../assets/Cars/convertible.png';
import CyclePath from '../assets/Cars/cycle.png';
import FormulaPath from '../assets/Cars/formula.png';
import HotdogPath from '../assets/Cars/hotdog.png';
import KartPath from '../assets/Cars/kart.png';
import carsFile from '../assets/lists/cars.json';
import tracksFile from '../assets/lists/tracks.json';

// To help on manual object creation
window.uuid = uuid;

const carImages = [
  CarPath,
  BuggyPath,
  BudSchoolPath,
  ConvertiblePath,
  CyclePath,
  FormulaPath,
  HotdogPath,
  KartPath,
];

const generateAttribute = (base, unit, max, basePrice, upgrade) => {
  const value = base + unit * upgrade;
  const nextValue = base + unit * (upgrade + 1);
  const price = basePrice + Math.pow(basePrice * 0.1, upgrade);

  return {
    base,
    unit,
    max,
    basePrice,
    value,
    upgrade,
    upgradeValue: upgrade < max ? nextValue : value,
    price: upgrade < max ? price : undefined,
    priceRaw: price,
  };
};

const generateRandomAttribute = (base, unit, max, basePrice) => {
  const upgrade = Math.round(Math.random() * max);
  return generateAttribute(base, unit, max, basePrice, upgrade);
};

export const generateCarPrice = attributes =>
  500 +
  (attributes[ATTRIBUTE_TYPES.ACCELERATION].price ||
    attributes[ATTRIBUTE_TYPES.ACCELERATION].priceRaw) +
  (attributes[ATTRIBUTE_TYPES.TOP_SPEED].price ||
    attributes[ATTRIBUTE_TYPES.TOP_SPEED].priceRaw) +
  (attributes[ATTRIBUTE_TYPES.HANDLING].price ||
    attributes[ATTRIBUTE_TYPES.HANDLING].priceRaw);

const generateCar = car => ({
  id: car.id,
  name: car.name,
  type: car.type,
  [ATTRIBUTE_TYPES.ACCELERATION]: generateAttribute(
    car.acc,
    1,
    car['acc upgrades'],
    50,
    0
  ),
  [ATTRIBUTE_TYPES.TOP_SPEED]: generateAttribute(
    car.tsp,
    1,
    car['tsp upgrades'],
    50,
    0
  ),
  [ATTRIBUTE_TYPES.HANDLING]: generateAttribute(
    car.hnd,
    1,
    car['hnd upgrades'],
    50,
    0
  ),
  image: carImages[~~(Math.random() * carImages.length)],
  brand: car.brand,
  price: car.price,
});

export const generateGarageCar = car => ({
  id: uuid(),
  name: car.name,
  type: car.type,
  [ATTRIBUTE_TYPES.ACCELERATION]: car[ATTRIBUTE_TYPES.ACCELERATION],
  [ATTRIBUTE_TYPES.TOP_SPEED]: car[ATTRIBUTE_TYPES.TOP_SPEED],
  [ATTRIBUTE_TYPES.HANDLING]: car[ATTRIBUTE_TYPES.HANDLING],
  price: ~~(car.price * 0.7),
  dealerCar: car.id,
  image: car.image,
  brand: car.brand,
  race: undefined,
});

export const upgradeAttribute = attribute => {
  if (attribute.upgrade >= attribute.max) {
    return attribute;
  }

  return generateAttribute(
    attribute.base,
    attribute.unit,
    attribute.max,
    attribute.basePrice,
    attribute.upgrade + 1
  );
};

const generateTrack = track => ({
  id: track.id,
  name: track.name,
  duration: track.duration * 1000,
  price: track.price,
  prizes: [track['prize 1'], track['prize 2'], track['prize 3']],
  type: track.type,
  [ATTRIBUTE_TYPES.ACCELERATION]: track.acc,
  [ATTRIBUTE_TYPES.TOP_SPEED]: track.tsp,
  [ATTRIBUTE_TYPES.HANDLING]: track.hnd,
  race: undefined,
  lastRace: undefined,
  // TODO: get more realistic adversaries, maybe create a pool of competitors
  competitors: cars.slice(0, 8),
});

export const generateRace = (car, track) => ({
  id: uuid(),
  car: car.id,
  track: track.id,
  start: new Date().getTime(),
  duration: track.duration,
  name: track.name,
});

export const generatePastRace = (
  race,
  car,
  track,
  reward,
  position,
  results
) => ({
  id: uuid(),
  race: race.id,
  car: car.id,
  track: track.id,
  time: new Date().getTime(),
  checked: false,
  reward,
  position,
  results,
});

// export const generateNotification = (car, track, position, earnings) => ({
//   id: uuid(),
//   won: position === 1,
//   position,
//   award: `$${earnings}`,
//   track: { id: track.id, name: track.name },
//   car: { id: car.id, name: car.name },
// });

export const cars = [
  ...carsFile.reduce(
    (results, car) =>
      car?.id.length > 0 ? [...results, generateCar(car)] : results,
    []
  ),
];

export const tracks = [
  ...tracksFile.reduce(
    (results, track) =>
      track?.id.length > 0 && track['prize 1']
        ? [...results, generateTrack(track)]
        : results,
    []
  ),
];

export const money = 9999999999;
